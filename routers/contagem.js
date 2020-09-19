const Contagem = require('../controllers/contagem')

module.exports = app => {
    app.post('/contagem/refeitorios', (req, res) => {
        const listar = req.body
        console.log(listar)
        Contagem.listaRefeitorios(listar,res)
    })
}