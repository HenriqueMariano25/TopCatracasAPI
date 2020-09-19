const conexao = require('../banco-de-dados/conexao')
const moment = require('moment')
const excel4node = require('excel4node')

class Relatorio{
    gerarExcel(listar, res){

        // const data_inicial = moment(listar.data_inicial, 'DD/MM/YYYY').format('YYYY-MM-DD')
        // const data_final = moment(listar.data_final, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const data_inicial = listar.dataInicial
        const data_final = listar.dataFinal
        const hora_inicial = listar.horaInicial
        const hora_final = listar.horaFinal
        
        const sql = "SELECT * FROM dbo.Bilhetes WHERE datahora BETWEEN '"+data_inicial+" "+hora_inicial+":00.000' AND '"+data_final+" "+hora_final+":00.000'"

        const sql2 = "SELECT func.Nome, func.Matricula, depa.Descricao Funcao, empr.Descricao Empresa, bilh.NumInner, locaAces.Descricao Local, bilh.DataHora FROM Bilhetes AS bilh INNER JOIN Pessoas AS pess ON bilh.COD_PESSOA = pess.COD_PESSOA INNER JOIN Funcionarios AS func ON bilh.COD_PESSOA = func.COD_PESSOA INNER JOIN Departamentos AS depa ON func.COD_DEPARTAMENTO = depa.COD_DEPARTAMENTO INNER JOIN Empresas AS empr ON depa.COD_EMPRESA = empr.COD_EMPRESA INNER JOIN LocaisDeAcesso AS locaAces ON bilh.COD_LOCAL = locaAces.COD_LOCAL WHERE datahora BETWEEN '"+data_inicial+" "+hora_inicial+":00.000' AND '"+data_final+" "+hora_final+":00.000'"

        conexao.query(sql2, (erro, data) => {
            if(erro){
                console.log(erro)
                res.status(400).json(erro)
            }else{           
                const wb = new excel4node.Workbook()
                const ws = wb.addWorksheet('Relatorio')


                const titulo = wb.createStyle({
                        font: {
                        size: 14,
                        bold: true,
                        },
                        numberFormat: '$#,##0.00; ($#,##0.00); -',
                        
                    });
                
                    ws.cell(1, 1).string("Nome").style(titulo)
                    ws.cell(1, 2).string("Matricula").style(titulo)
                    ws.cell(1, 3).string("Função").style(titulo)
                    ws.cell(1, 4).string("Empresa").style(titulo)
                    ws.cell(1, 5).string("N° Inner").style(titulo)
                    ws.cell(1, 6).string("Local").style(titulo)
                    ws.cell(1, 7).string("Hora").style(titulo)
                    ws.cell(1, 8).string("Data").style(titulo)

                for(let x=0; x < data.recordset.length;x++){
                    let linha = x+2
                    let diaMesAno = moment(data.recordsets[0][x].DataHora).utc().format('HH:mm:ss').toString()
                    let hora = moment(data.recordsets[0][x].DataHora).utc().format('DD/MM/YYYY').toString()

                    ws.cell(linha,1).string(data.recordsets[0][x].Nome.toString())
                    ws.cell(linha,2).string(data.recordsets[0][x].Matricula.toString())
                    ws.cell(linha,3).string(data.recordsets[0][x].Funcao.toString())
                    ws.cell(linha,4).string(data.recordsets[0][x].Empresa.toString())
                    ws.cell(linha,5).string(data.recordsets[0][x].NumInner.toString())
                    ws.cell(linha,6).string(data.recordsets[0][x].Local.toString())
                    ws.cell(linha,7).string(diaMesAno)
                    ws.cell(linha,8).string(hora)
                }
                
                wb.write('Excel.xlsx', res)

                console.log("Finalizado")
                // 
                // res.send(data.recordsets[0][0])
            }
        })

        console.log("Gerando Excel")
        
    }
}

module.exports = new Relatorio()