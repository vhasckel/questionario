const usuarioModel = require("../../database/models/usuarios");
const { hash } = require("bcrypt");
const yup = require("yup");

class UsuariosServices {
  async list() {
    const usuarios = await usuarioModel.findAll({
      attributes: [
        "id",
        "nome",
        "sobrenome",
        "email",
        "createdAt",
        "updatedAt",
      ],
    });

    return usuarios;
  }

  async createUser({ email, nome, sobrenome, senha, permissao }) {
    // Define o schema de validação para os dados do usuário
    const createUserSchema = yup.object().shape({
      nome: yup.string().required("Nome é obrigatório"),
      sobrenome: yup.string(),
      email: yup
        .string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      senha: yup
        .string()
        .min(6, "Senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
      permissao: yup
        .string()
        .oneOf(
          ["criador", "estudante"],
          'Permissão deve ser "criador" ou "estudante"'
        )
        .required("Permissão é obrigatória"),
    });

    try {
      // Valida os dados de entrada usando o Yup
      await createUserSchema.validate(
        { email, nome, sobrenome, senha, permissao },
        { abortEarly: false }
      );

      // Verifica se o usuário já existe
      const usuarioExiste = await usuarioModel.findOne({
        where: {
          email,
        },
      });

      if (usuarioExiste) {
        return null; // Retorna null se o usuário já existe
      }

      // Criptografa a senha do usuário
      const senhaCriptografada = await hash(senha, 8);

      // Cria o novo usuário com os dados validados
      const usuario = await usuarioModel.create({
        email,
        nome,
        sobrenome,
        senha: senhaCriptografada,
        permissao,
      });

      return usuario;
    } catch (error) {
      // Captura e trata os erros de validação
      if (error instanceof yup.ValidationError) {
        throw new Error(`Erro de validação: ${error.errors.join(", ")}`);
      }
      throw error; // Repassa outros erros
    }
  }

  update() {}

  async delete(id) {
    const usuarioExiste = await usuarioModel.findByPk(id);

    if (!usuarioExiste) {
      return false;
    }

    await usuarioExiste.destroy();

    return true;
  }
}

module.exports = UsuariosServices;
