const mssql = require('mssql')

const config = {
    user: 'sis_consulta',
    password: '@Gsenha2018%%',
    server: "UTENTAGC-PTO001",
    database: 'TopAcesso',
    port: 52676,
    dialect: "mssql",
    dialectOptions: {
        "instanceName": "SQLEXPRESS"
    },
    options: {
        "enableArithAbort": true,
        "encrypt":false
    },
}

mssql.connect(config, erro => {
    if(erro){
        console.log(erro)
    }else{
        let conexao = new mssql.Request()
        module.exports = conexao
    }
})

