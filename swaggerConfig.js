const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuração do Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API questionario",
    version: "1.0.0",
    description: "Documentação da API questionario com Swagger",
  },
  servers: [
    {
      url: "http://localhost:3333", // URL base do servidor
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Caminho para os arquivos das rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
