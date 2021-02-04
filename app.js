const express = require('express');
const app = express();
const cors = require('cors');

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
app.get('/pedidos', (req, res) =>{
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'jaque',
        password: 'somentesenha',
        database: 'projetoeletro'
    });

    connection.query("SELECT * from tb_pedidos INNER JOIN produtos ON tb_pedidos.produto = produtos.idproduto;", (error, result)=>{
        
    if(error){
        console.log(error)
    }
    res.json(result);
    })  
})

app.post('/pedidos', (req, res) =>{
    const mysqlPedido = require('mysql');
    const conexao = mysqlPedido.createConnection({
        host: 'localhost',
        user: 'jaque',
        password: 'somentesenha',
        database: 'projetoeletro'
    });
    
    let post = [];

    //colocando os dados na array
    post.push({
        nome: req.body.nome,
        cidade: req.body.cidade,
        produto: req.body.produto,
        quantidade: req.body.quantidade
    });

// com ? é passagens de parâmetros
conexao.query('INSERT INTO tb_pedidos SET ?', post, ()=>{
    post = [];
    return res.json({message: "Dados enviados com sucesso"})
})

})   


app.listen(3333, ()=> {
    console.log("subiu")
})