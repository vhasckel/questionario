function authorize(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.userRole;

    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Acesso negado. Permissão insuficiente." });
    }

    next();
  };
}

module.exports = authorize;
