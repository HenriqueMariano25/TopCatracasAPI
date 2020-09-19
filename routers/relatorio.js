const Relatorio = require('../controllers/relatorio')

module.exports = app => {
    app.post('/relatorio/excel', (req, res) => {
        console.log(req.body)
        const listar = req.body
        Relatorio.gerarExcel(listar, res)
    })
}
