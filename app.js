const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

app.use(cors());

app.use(express.json());

//Consulta de produtos que são exibidos no site

app.get('/', (req, res, next) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'jaque',
        password: 'somentesenha',
        database: 'projetoeletro'
    });

connection.query("SELECT nome, descricao, imagem, preco, precofinal FROM produtos", (error, result)=>{
    if(error){
        console.log(error)
    }
    res.json(result);
    })  
})

//metodo post - pagina contato (deixar uma mensagem)
app.post('/contatos', (req, res) =>{
    const mysqlContato = require('mysql');
    const conexao = mysqlContato.createConnection({
        host: 'localhost',
        user: 'jaque',
        password: 'somentesenha',
        database: 'projetoeletro'
    });
    
    let post = [];
   
    post.push({
        nome: req.body.nome,
        email: req.body.email,
        mensagem: req.body.mensagem
    });

conexao.query('INSERT INTO contato SET ?', post, ()=>{
    post = [];
    return res.json({message: "Dados enviados com sucesso"})
})

})

//pagina de pedidos - metodo get (mostrar os informações de pedidos)
//usando mongodb 
//models
require('./src/models/Pedido')
const Pedido = mongoose.model('pedidos')

//conexao db
require('./src/db/connect')

app.get('/pedidos', async(req,res) => {
    const pedidosResponse = await Pedido.find()
    const pedidosJson = await pedidosResponse

    return res.json(pedidosJson)
});

app.post('/pedidos', async(req,res) =>{
    const novoPedido = new Pedido({
        nome: req.body.nome,
        cidade: req.body.cidade,
        produto: req.body.produto,
        quantidade: req.body.quantidade
    })
    novoPedido.save()

    res.json({message: "Pedido Concluido com sucesso", pedido: novoPedido})
});

app.put('/pedidos/:id', async(req,res) => {
    const { id } = req.params
    //pesquisa por um unico usuario
    const pedido = await Pedido.findOne({_id: id})

    //alterando os dados existentes
    pedido.nome = req.body.nome
    pedido.cidade = req.body.cidade
    pedido.produto = req.body.produto
    pedido.quantidade = req.body.quantidade


    //salvando alteração
    pedido.save()

    res.json({message: "Pedido Alterado"})
})


app.listen(3333, ()=> {
    console.log("subiu")
})