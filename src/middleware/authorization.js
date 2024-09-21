// src/middleware/authorization.js
function authorize(allowedRoles) {
  return (req, res, next) => {
    // Supondo que a permissão do usuário esteja disponível no request após o login
    const userRole = req.userRole;

    // Verifica se o usuário tem uma das permissões permitidas para a rota
    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Acesso negado. Permissão insuficiente." });
    }

    next();
  };
}

module.exports = authorize;
