const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
    
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000';
        this.response = {
            code: 200,
            message: 'Operação efetuada com sucesso'
        };
    }

    async getUsers() {
        const users = await this.get('/users');
        return users.map(async user => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
            ativo: user.ativo,
            role: await this.get(`/roles/${user.role}`) 
        }))
    }

    async getUserById(id) {
        const user = await this.get(`/users/${id}`);
        user.role = await this.get(`/roles/${user.role}`);
        return user;
    }

    async addUser(user) {
        // O código abaixo que na aula é mostrado é desnecessário, pois o json-server já faz automático.
        //const users = await this.get('/users');
        //user.id = users.length + 1;
        const role = await this.get(`/roles?type=${user.role}`);
        
        await this.post('/users', {...user, role: role[0].id});
        return ({
            code: 201,
            message: 'Usuários adicionado com sucesso!',
            user: {
                ...user,
                role: role[0]
            }
        });
    }

    async updateUser({ id, user }) {
        try {
            const role = await this.get(`/roles?type=${user.role}`);
            await this.put(`/users/${id}`, {...user, role: role[0].id});
            return ({
                ...this.response,
                user: {
                    ...user,
                    id,
                    role: role[0]
                }
            });
        } catch (error) {
            console.log('user =', user);
            const e = error.message.split(':');
            return ({ code: e[0], message: e[1].trim() });           
        }
    }

    async deleteUser(id) {
        try {
            await this.delete(`/users/${id}`);
            return ({ code: 200, message: 'Usuário removido com sucesso!' });
        } catch (error) {
            const e = error.message.split(':');
            return ({ code: e[0], message: e[1].trim() });
        }
    }

}

module.exports = UsersAPI;