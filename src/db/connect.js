const mongoose = require('mongoose')

function connect() {
    mongoose
    .connect('mongodb://localhost/recode',{useNewUrlParser:true,useUnifiedTopology:true})
       .then(() => {
           console.log("conectado com o banco 'recode")
       }).catch((error) => {
           console.log(`Erro ao tentar conexão ${error}`)
       })
}


module.exports = connect()