/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna a lista de usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               sobrenome:
 *                 type: string
 *                 description: Sobrenome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *               permissao:
 *                 type: string
 *                 description: Permissão do usuário (criador ou estudante)
 *                 enum: [criador, estudante]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       400:
 *         description: Não foi possível apagar o usuário
 *       401:
 *         description: Token não fornecido ou inválido
 */

// src/routes/questionarios.js

/**
 * @swagger
 * /questionarios:
 *   get:
 *     summary: Retorna a lista de questionários
 *     tags: [Questionários]
 *     responses:
 *       200:
 *         description: Lista de questionários retornada com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado. Permissão insuficiente.
 */

/**
 * @swagger
 * /questionarios:
 *   post:
 *     summary: Cria um novo questionário
 *     tags: [Questionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do questionário
 *               descricao:
 *                 type: string
 *                 description: Descrição do questionário
 *     responses:
 *       201:
 *         description: Questionário criado com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado. Permissão insuficiente.
 */

/**
 * @swagger
 * /questionarios/{id}:
 *   delete:
 *     summary: Deleta um questionário pelo ID
 *     tags: [Questionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do questionário a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Questionário deletado com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado. Permissão insuficiente.
 */
