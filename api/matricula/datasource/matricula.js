const { SQLDataSource } = require("datasource-sql");
const DataLoader = require('dataloader');

class MatriculasAPI extends SQLDataSource {
    constructor(dbConfig) {
        super(dbConfig);
        this.response = {
            code: 0,
            message: ""
        };
    }

    async matricularEstudante(ids) {
        const novaMatricula = {
            estudante_id: ids.estudante,
            turma_id: ids.turma,
            status: "confirmado"
        }

        await this.db
            .insert(novaMatricula)
            .into('matriculas')

        this.response.code = 201;
        this.response.message = "Matrícula confirmada com sucesso!";
        return this.response;
    }

    async getMatriculasPorTurma(idTurma) {
        const matriculas = await this.db
            .select('*')
            .from('matriculas')
            .where({ turma_id: Number(idTurma) })

        return matriculas;
    }

    getMatriculasPorEstudante = new DataLoader(async idsEstudantes => {
        const matriculas = await this.db
            .select('*')
            .from('matriculas')
            .whereIn('estudante_id', idsEstudantes)

        return idsEstudantes.map(id =>
            matriculas.filter(matricula =>
                matricula.estudante_id === id))
    })

    async excluirMatricula(idMatricula) {
        await this.db('matriculas').where({ id: Number(idMatricula) }).del();
        return { code: 200, message: 'Matrícula excluída com sucesso!' }
    }

    async cancelarMatricula(idMatricula) {
        await this.db
            .update({ status: 'cancelado' })
            .where({ id: Number(idMatricula) })
            .into('matriculas');

        return { code: 200, message: 'Matrícula cancelada com sucesso!' }
    }
}

module.exports = MatriculasAPI;
