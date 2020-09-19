const customExpress = require('./config/customExpress')
const config = require('./banco-de-dados/conexao')
const mssql = require('mssql')

mssql.connect(config, erro => {
    if(erro){
        console.log(erro)
    }else{
        console.log("SUcesso")

        const app = customExpress()

        app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
    }
})

// conexao.connect(erro => {
//     if(erro){
//         console.log(erro)
//     }else{
//         console.log("Conectado")

//         const app = customExpress()

//         app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
//     }
// })