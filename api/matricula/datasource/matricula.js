const { SQLDataSource } = require("datasource-sql");

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
            .where({ turma_id: idTurma })
        
        return matriculas;
    }
}

module.exports = MatriculasAPI;
