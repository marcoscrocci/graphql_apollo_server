const { SQLDataSource } = require("datasource-sql");

class TurmasAPI extends SQLDataSource {
    constructor(dbConfig) {
        super(dbConfig);
        this.response = {
            code: 0,
            message: ""
        };
    }

    async getTurmas() {
        return await this.db.select("*").from("turmas");
    }

    async getTurma(id) {
        const turma = await this.db
            .select("*")
            .from("turmas")
            .where({ id: Number(id) });
        return turma[0];
    }

    async addTurma(novaTurma) {
        const novaTurmaId = await this.db
            .insert(novaTurma)
            .returning("id")
            .into("turmas");

        const turmaInserida = await this.getTurma(novaTurmaId[0].id);
        return turmaInserida;
    }

    async updateTurma(novosDados) {
        await this.db
            .update({ ...novosDados.turma })
            .where({ id: Number(novosDados.id) })
            .into("turmas");

        const turmaAtualizada = await this.getTurma(novosDados.id);
        return {
            ...turmaAtualizada
        };
    }

    async deleteTurma(id) {
        await this.db("turmas").where({ id: id }).del();

        this.response.message = "Registro excluído!";
        return this.response;
    }
}

module.exports = TurmasAPI;
