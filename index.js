import express from 'express';
//importando session do modulo express-session;
import session from 'express-session';

//importando o modulo cookie-parser para permitir que a nossa aplicação solicite e retorne cookies
import cookieParser from 'cookie-parser';

import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));

//configurar uma sessao a fim de pertmitir que a aolicaçao seja capaz de lembrar com quem ela esta falando.
//Em outras palabvras, ele vai armazenar as informacoes do usuario que estiver logado.
app.use(session({
    secret: 'Minh4Chav3S3cr3t4',
    resave: false, //Não salva a sessão se nao houver mudanças
    saveUninitialized: true,//
    cookie: {
        maxAge: 1000 * 60 * 30// maxAge funciona em milisegundos: 1 segundo tem 1000 milisegundos * 60 desses milisegundos tem 1 minuto * 30 tem 30 minutos
        //Se o usuario fizer logout, a sessão vai ser expirada automaticamente
    }
}))
//ADICIONANDO O MEDIOWARE COOKIE-PARSER
app.use(cookieParser());

app.use(express.static('./public'));

//configurar a pasta public para servir arquivos estáticos
//permitindo que o conteúdo de uma determinada pasta seja visivel para os usuarios
app.use(express.static('.pagnas/public'));

const porta = 3000; 
const host = 'localhost'; //ip refere-se a todas as interfaces locais(placas de rede do seu pc)



var listafuncionario = []; // lista para armazenar funcionarios cadastrados
//implementar a funcionalidade para entregar um formulario html para o cliente
function cadastro(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Prrodutos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>

                <div>
                    <h1>Cadastro de Produto</h1>
                    <form method="POST" action="/cadastrarfuncionario" class="row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="nome" class="form-label">*Nome do Produto</label>
                            <input type="text" class="form-control" id="nome" name="nome">
                        </div>

                        <div class="col-md-4">
                                <label for="nfantasia" class="form-label">Código de barras</label>
                                <input type="text" class="form-control" id="Empresa" name="Empresa">
    
                             </div>

                        <div class="col-md-4">
                            <label for="validationCustomUsername" class="form-label">*Preço de custo</label>
                                <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend">R$</span>
                                <input type="number" class="form-control" id="Email" name="email">
                                </div>
                        </div>

                        <div class="col-md-6">
                                <label for="end" class="form-label">Descrição do produto</label>
                                <input type="textbox" class="form-control" id="endereco" name="endereco">
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Preço de venda</label>
                                <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend">R$</span>
                                <input type="number" class="form-control" id="cidade" name="cidade">
                                </div>
                            </div>

                         <div class="col-md-6">
                                <label for="end" class="form-label">Data de validade</label>
                                <input type="date" class="form-control" id="validade" name="validade">
                            </div>


                        <div class="col-md-3">
                                <label for="cep" class="form-label">Qtd em estoque</label>
                                <input type="number" class="form-control" id="cep" name="cep">
                            </div>

                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                    </form>
                    </div>
            </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function menuView(req,resp) {

    const dataHoraUltimoAcesso = req.cookies.dataHoraUltimoAcesso;

    if(!dataHoraUltimoAcesso){
        dataHoraUltimoAcesso='';}
    resp.send(`
<html><head>
<title>Cadastro de Produtos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <meta charset="utf-8">
    </head>
    <body>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/cadastrarfuncionario">MENU</a>
            <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/cadastrarfuncionario">Cadastrar Produto</a>
                <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Seu Ultimo acesso foi realizado em: ${dataHoraUltimoAcesso}</a>
                </li>
            </div>
            </div>
        </div>
        </nav>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</html>`);
}

function cadastrarfuncionario(req, resp){
    //recupera dados do formulário
    const nome = req.body.nome;
    const Empresa = req.body.Empresa;
    const email = req.body.email;
    const Descrição = req.body.endereco;
    const venda = req.body.cidade;
    const validade = req.body.validade;
    const cep = req.body.cep;
   

    

//Validar a entrada do Usuario
//caso os dados não estiverem validos nos deveremos retornar um feedback

    if(nome&& Empresa&& email&& Descrição&& venda&& validade && cep){
        
        const funcionario = {nome,Empresa,email,Descrição,venda,validade,cep};

        //adiciona funcionarios a cada envio
        listafuncionario.push(funcionario);
        //Mostrar a Lista de funcionarios já cadastrados
        resp.write(`
            <html>
                <head>
                    <title> funcionarios Cadastrados </title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">           
                </head>
                <body>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome do Produto</th>
                            <th scope="col">Coodigo de barras</th>
                            <th scope="col">Preco Custo</th>
                            <th scope="col">Descricao</th>
                            <th scope="col">venda</th>
                            <th scope="col">validade</th>
                            <th scope="col">Quantidade em estoque</th>
                        </th>
                    </thead>
                    <tbody>
                    `);

                    for (var i = 0; i <listafuncionario.length; i++) {
                        resp.write(`
                            <tr>
                                <td>${listafuncionario[i].nome}</td>                        
                                <td>${listafuncionario[i].Empresa}</td> 
                                <td>${listafuncionario[i].email}</td> 
                                <td>${listafuncionario[i].Descrição}</td>
                                <td>${listafuncionario[i].venda}</td>
                                <td>${listafuncionario[i].validade}</td>
                                <td>${listafuncionario[i].cep}</td> 
                            </tr>
                            `);
                        
                    }

        resp.write(`</tbody>
                </table>
                <a type="button" href="/cadastrarfuncionario">Continuar Cadastrando</a>
                </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
            `);
    }//fim da validação
    else{

        resp.write(`
            
            <html>
                <head>
                    <title>Cadastro de Produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>

                    <div>
                        <h1>Cadastro de funcionario</h1>
                        <form method="POST" action="/cadastrarfuncionario" class="row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="nome" class="form-label">*Nome</label>
                                <input type="text" class="form-control" id="nome" name="nome" value="${nome}">
                            </div>
            `);
            if(!nome){
                resp.write(`
                    <div>
                        <span><p class="text-danger">O campo nome deve ser preenchido</p></span>
                    </div>
                    `);
            }
            resp.write(`
                <div class="col-md-4">
                                    <label for="nfantasia" class="form-label">Nome da Empresa</label>
                                    <input type="text" class="form-control" id="Empresa" name="Empresa" value="${Empresa}">
                                </div>
                `);

            if(!Empresa){
                (`
                <div>
                span><p class="text-danger">O campo empresa deve ser preenchido</p></span>
                </div>
                `);
            }

            resp.write(`
                <div class="col-md-4">
                    <label for="validationCustomUsername" class="form-label">*Email</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" class="form-control" id="Email" name="email" value="${email}">
                    </div>
                </div>
                `);

            if(!email){
                resp.write(`
                <div>
                    <span><p class="text-danger">O campo email deve ser preenchido</p></span>
                </div>
                `);
            }

            resp.write(`
                <div class="col-md-6">
                    <label for="end"class="form-label">Descrição do Produto</label>
                    <input type="text" class="form-control" id="endereco" name="endereco" value="${Descrição}">
                </div>
                                `);

            if(!Descrição){
                resp.write(`
                <div>
                    <span><p class="text-danger">O campo endereço deve ser preenchido</p></span>
                </div>
                `);
            }

            resp.write(`
                <div class="col-md-3">
                    <label for="venda" class="form-label">Preço de venda</label>
                    <input type="text" class="form-control" id="cidade" name="cidade" value="${venda}">
                </div>
                `); 

            if(!venda){    
                resp.write(`
                <div>
                    <span><p class="text-danger">O campo Preço de venda deve ser preenchido</p></span>
                </div>
                `);
            }

            resp.write(`
                <div class="col-md-6">
                    <label for="end"class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="validade" name="validade" value="${validade}">
                </div>
                                `);

            if(!validade){
                resp.write(`
                <div>
                    <span><p class="text-danger">O campo endereço deve ser preenchido</p></span>
                </div>
                `);
            }
            
    resp.write(`
        <div class="col-md-3">
        <label for="cep" class="form-label">Cep</label>
        <input type="text" class="form-control" id="cep" name="cep" value="${cep}">
        </div>
   `);
    
    if(!cep){
        resp.write(`
            <div>   
             <span><p class="text-danger">O campo cep deve ser preenchido</p></span>        
            </div>
        `);
    }
        resp.write(`
        </div>

                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                    </form>
                    </div>
            </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
    }//else da validação
        resp.end();//envia a resposta
     
}
function autenticarUsuario(req, resp){ 
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === 'admin' && senha === '123'){//registrar
        //Criar uma sessão individualmente para cada usuario que faça login
        req.session.usuarioLogado = true;
        //criar um cookie enviando para o navegador a data e hora de acesso do usuario
        resp.cookie('dataHoraUltimoAcesso', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
        resp.redirect('/')
    }   
    else{
        resp.send(`
        <html>
        <head>
            <meta charset="utf-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
            <body>
            <div class="container w-25">
                <div class="alert alert-danger" role="alert"> 
                Usuário ou senha inválidos!
                </div>
                <div>
                <a href="/login.html" class="btn btn-primary" role="button">Tentar novamente</a>
                </div>
            </div>
            </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
        </script>
        </html>
        `);
    }

}

//é o nosso middleware de segurançanca
function verificarAutenticacao(req, resp, next) {
    if(req.session.usuarioLogado){
        next();//permita acessar os recursos solicitados
    }
    else{
        resp.redirect('/login.html');
    }
}

app.get('/login',(req,resp) =>{  

    resp.sendFile(path.join(__dirname, 'public', 'login.html'));
    //resp.redirect('/login.html');
});
app.post('/login',autenticarUsuario);
app.get('/',verificarAutenticacao, menuView);
app.get('/cadastrarfuncionario',verificarAutenticacao, cadastro);//envia o formulario para cadastrar o personagem
app.post('/cadastrarfuncionario',verificarAutenticacao, cadastrarfuncionario);


app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
})