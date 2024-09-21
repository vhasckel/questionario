require("dotenv").config();
const database = require("./database/config");
const express = require("express");
const UsuariosControllers = require("./dominios/usuarios/usuarios.controllers");
const QuestionariosControllers = require("./dominios/questionarios/questionarios.controllers");
const authorize = require("./middleware/authorization"); // Importa o middleware de autorização

const app = express();

/** Config */
app.use(express.json()); // middleware => interceptador

const usuariosControllers = new UsuariosControllers();
const questionariosControllers = new QuestionariosControllers();

/** ROTAS USUÁRIOS */
app.get("/usuarios", usuariosControllers.index);
app.post("/usuarios", usuariosControllers.create);
app.delete("/usuarios/:id", usuariosControllers.delete);

/** ROTAS DE QUESTIONÁRIOS */
// Apenas 'admin' pode acessar as rotas de questionários
app.get("/questionarios", authorize(["admin"]), questionariosControllers.index);
app.post(
  "/questionarios",
  authorize(["admin"]),
  questionariosControllers.create
);
app.delete(
  "/questionarios/:id",
  authorize(["admin"]),
  questionariosControllers.delete
);

/** ROTAS DE RESPOSTAS */
// Apenas 'user' pode acessar as rotas de respostas
app.get("/respostas", authorize(["user"]), (req, res) => {
  // Código para listar respostas
});
app.post("/respostas", authorize(["user"]), (req, res) => {
  // Código para criar resposta
});
app.delete("/respostas/:id", authorize(["user"]), (req, res) => {
  // Código para deletar resposta
});

/** Função para iniciar o servidor */
async function iniciarServidor() {
  await database.authenticate();
  console.log("Banco de dados foi inicializado com sucesso!");

  app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
  });
}

iniciarServidor();
