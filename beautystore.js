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
mongoose.connect('mongodb://127.0.0.1:27017/BeautyStore',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});


//criando a model/collection do seu projeto - começo da model usuario
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String, required : true}
});


const Usuario = mongoose.model("Usuário", UsuarioSchema);


//configurando os roteamentos da model usuario
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha

    //testando se todos os campos foram preenchidos
    if(email == null || senha == null){
        return res.status(400).json({error : "Preencher todos os campos"});
    } 

    //teste mais importante da ac 
    const emailExiste = await Usuario.findOne({email:email});

    if(emailExiste){
        return res.status(400).json({error : "Esse email já está registrado no sistema."});
    }

    //como fica no postman pra add 
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
const produtobelezaSchema = new mongoose.Schema({
    id_produtobeleza : {type : Number, required : true},
    descricao : {type : String, required : true},
    marca : {type : String, required : true},
    data_fabricacao : {type : Date, required : true},
    quantidade_estoque : {type : Number, required : true}
});


const produtobeleza = mongoose.model("Beauty_produtos", produtobelezaSchema);


//configurando os roteamentos da model usuario
app.post("/produtobeleza", async(req, res)=>{
    id_produtobeleza = req.body.id_produtobeleza;
    descricao = req.body.descricao;
    marca = req.body.marca;
    data_fabricacao = req.body.data_fabricacao;
    quantidade_estoque= req.body.quantidade_estoque;


    //testando se todos os campos foram preenchidos
    if(id_produtobeleza == null || descricao == null || marca == null || data_fabricacao == null || quantidade_estoque== null){
        return res.status(400).json({error : "Preencher todos os campos"});
    } 

    //verificar se já existe o id
    const id_produtobelezaExiste = await produtobeleza.findOne({id_produtobeleza:id_produtobeleza});

    if(id_produtobelezaExiste){
        return res.status(400).json({error : "Esse id já está registrado no sistema."});
    }

    //como fica no postman pra add 
    const produtobeleza = new Usuario({
        id_produtobeleza : id_produtobeleza,
        descricao : descricao,
        marca : marca,
        data_fabricacao : data_fabricacao,
        quantidade_estoque: quantidade_estoque
    })


    try{
        const newprodutobeleza = await produtobeleza.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }

});


//rota raiz - inicio do inw por causa da pág html
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});


//configurando a porta - pra ler que vc ta usando a porta 3000 no mongo e no postman
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});