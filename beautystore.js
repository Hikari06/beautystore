//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
 
 
//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;
 
 
//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/beautystore',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});
 
 
//criando a model/collection do seu projeto - começo da model usuario
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String}
});
 
 
const Usuario = mongoose.model("Usuário", UsuarioSchema);
 
 
//configurando os roteamentos da model usuario
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha
 
    const usuario = new Usuario({
        email : email,
        senha : senha
    })
 
 
    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }
 
});
// fim da model usuario
 
 
// começo da model especifica - produtobeleza
const ProdutobelezaSchema = new mongoose.Schema({
    id_produtobeleza : {type : String, required : true},
    descricao : {type : String},
    marca : {type : String},
    data_fabricacao : {type : Date},
    quantidade_de_estoque : {type : Number}
});
 
 
const Produtobeleza = mongoose.model("Beleza_produtos", ProdutobelezaSchema);
 
//configurando os roteamentos da model usuario
app.post("/cadastroprodutobeleza", async(req, res)=>{
    const id_produtobeleza = req.body.id_produtobeleza;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const data_fabricacao = req.body.data_fabricacao;
    const quantidade_de_estoque = req.body.quantidade_de_estoque;
 
 
    //como fica no postman pra add
    const produtobeleza = new Produtobeleza({
        id_produtobeleza : id_produtobeleza,
        descricao : descricao,
        marca : marca,
        data_fabricacao : data_fabricacao,
        quantidade_de_estoque : quantidade_de_estoque
    })
 
 
    try{
        const newProdutobeleza = await produtobeleza.save();
        res.json({error : null, msg : "Cadastro ok", id_produtobeleza : newProdutobeleza._id});
    } catch(error){
        res.status(400).json({error});
    }
 
});
 

 
 
//configurando a porta - pra ler que vc ta usando a porta 3000 no mongo e no postman
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});