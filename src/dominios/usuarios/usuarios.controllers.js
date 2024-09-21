const UsuarioService = require('./usuarios.services')

const usuarioService = new UsuarioService()

class UsuariosControllers {
    /**
     * 
     * @param {import('express').Request} request 
     * @param {import('express').Response} response 
     * @returns 
     */
    async index(request, response) {
        const listaUsuarios = await usuarioService.list()
        
        return response.json(listaUsuarios)
    }
    /**
         * 
         * @param {import('express').Request} request 
         * @param {import('express').Response} response 
         * @returns 
     */
    async create(request, response) {
        const { body } = request

        const usuario = await usuarioService.createUser(body)

        if(!usuario) return response.status(400).json({ message: "Usuário já possui cadastro"}) 

        return response.status(201).json(usuario)
    }
    /**
         * 
         * @param {import('express').Request} request 
         * @param {import('express').Response} response 
         * @returns 
     */
    async delete(request, response) {
        const { id } = request.params
        
        const apagou = await usuarioService.delete(id)
        
        if(!apagou) {
            return response.status(400).json({ message: "Não foi possivel apagar"})
        }

        return response.status(204).end()
    }
}

module.exports = UsuariosControllers