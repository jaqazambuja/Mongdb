const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Pedido = new Schema ({
    nome: {
        type: String,
        require: true
    },
    cidade:{
        type: String,
        require: true
    },
    produto:{
        type: String,
        require: true
    },
    quantidade:{
        type: Number,
        require: true
    }
})

mongoose.model('pedidos', Pedido)