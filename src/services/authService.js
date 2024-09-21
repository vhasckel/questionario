const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usuarioModel = require("../database/models/usuarios"); // modelo de usuário

class AuthService {
  async authenticateUser(email, password) {
    // Busca o usuário pelo email
    const user = await usuarioModel.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Verifica a senha
    const passwordMatches = await bcrypt.compare(password, user.senha);
    if (!passwordMatches) {
      throw new Error("Senha incorreta");
    }

    // Gera o token JWT com a role do usuário incluída no payload
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.permissao, // Inclui a role no payload do token
      },
      process.env.JWT_SECRET, // Segredo do JWT definido no arquivo .env
      { expiresIn: "1h" } // Token válido por 1 hora
    );

    return { token, user };
  }
}

module.exports = AuthService;
