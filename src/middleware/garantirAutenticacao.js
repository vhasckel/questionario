const jwt = require("jsonwebtoken");

function garantirAutenticacao(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const [, token] = authHeader.split(" ");

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona o ID e a role do usuário ao request
    req.userId = decoded.id;
    req.userRole = decoded.role; // A role agora é extraída do token

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
}

module.exports = garantirAutenticacao;
