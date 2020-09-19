const conexao = require('../banco-de-dados/conexao')
const moment = require('moment')

class Contagem {
    async listaRefeitorios(listar, res) {
        
       
        const data = listar.data
        const hora_inicial = listar.horaInicial
        const hora_final = listar.horaFinal
        
        const sql = "SELECT COUNT( * ) FROM dbo.Bilhetes WHERE cod_local = 2 AND datahora BETWEEN '"+data+" "+hora_inicial+":00.000' AND '"+data+" "+hora_final+":00.000'"
        const sql2 = "SELECT COUNT( * ) FROM dbo.Bilhetes WHERE cod_local = 4 AND datahora BETWEEN '"+data+" "+hora_inicial+":00.000' AND '"+data+" "+hora_final+":00.000'"

        let ref1 =  await new Promise((resolve, reject) => {
            conexao.query(sql, (erro, data) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    resolve(data.recordset[0][''])
                }
            })
        })

        let ref2 =  await new Promise((resolve, reject) => {
            conexao.query(sql2, (erro, data) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    resolve(data.recordset[0][''])
                }
            })
        })


        res.status(200).json({
            dia: moment(data).format('DD/MM/YYYY'),
            horaInicial: hora_inicial,
            horaFinal: hora_final,
            refeitorio1: ref1,
            refeitorio2: ref2
        })
                    
    }
}

module.exports = new Contagem()