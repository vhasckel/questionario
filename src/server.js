const express = require("express");
const UsuariosControllers = require("./dominios/usuarios/usuarios.controllers");
const QuestionariosControllers = require("./dominios/questionarios/questionarios.controllers");
const garantirAutenticacao = require("./middlewares/garantirAutenticacao");
const authorize = require("./middlewares/authorization");

const app = express();
app.use(express.json());

const usuariosControllers = new UsuariosControllers();
const questionariosControllers = new QuestionariosControllers();

/** ROTAS USUÁRIOS */
app.get("/usuarios", garantirAutenticacao, usuariosControllers.index);
app.post("/usuarios", usuariosControllers.create);
app.delete("/usuarios/:id", garantirAutenticacao, usuariosControllers.delete);

/** ROTAS DE QUESTIONÁRIOS */
app.get(
  "/questionarios",
  garantirAutenticacao,
  authorize(["criador"]),
  questionariosControllers.index
);
app.post(
  "/questionarios",
  garantirAutenticacao,
  authorize(["criador"]),
  questionariosControllers.create
);
app.delete(
  "/questionarios/:id",
  garantirAutenticacao,
  authorize(["criador"]),
  questionariosControllers.delete
);

/** ROTAS DE RESPOSTAS */
app.get(
  "/respostas",
  garantirAutenticacao,
  authorize(["estudante"]),
  (req, res) => {
    // Código para listar respostas
  }
);
app.post(
  "/respostas",
  garantirAutenticacao,
  authorize(["estudante"]),
  (req, res) => {
    // Código para criar resposta
  }
);
app.delete(
  "/respostas/:id",
  garantirAutenticacao,
  authorize(["estudante"]),
  (req, res) => {
    // Código para deletar resposta
  }
);

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
