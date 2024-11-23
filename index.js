import express from 'express';

const app = express();
app.use(express.urlencoded({extended: true}));
const porta = 3000; 
const host = 'localhost'; //ip refere-se a todas as interfaces locais(placas de rede do seu pc)



var listafuncionario = []; // lista para armazenar funcionarios cadastrados
//implementar a funcionalidade para entregar um formulario html para o cliente
function cadastro(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de funcionarios</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>

                <div>
                    <h1>Cadastro de funcionario</h1>
                    <form method="POST" action="/cadastrarfuncionario" class="row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="nome" class="form-label">*Nome</label>
                            <input type="text" class="form-control" id="nome" name="nome">
                        </div>

                        <div class="col-md-4">
                                <label for="nfantasia" class="form-label">Nome da Empresa</label>
                                <input type="text" class="form-control" id="Empresa" name="Empresa">
    
                             </div>

                        <div class="col-md-4">
                            <label for="validationCustomUsername" class="form-label">*Email</label>
                                <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" class="form-control" id="Email" name="email">
                                </div>
                        </div>

                        <div class="col-md-6">
                                <label for="end" class="form-label">Endereço</label>
                                <input type="text" class="form-control" id="endereco" name="endereco">
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" class="form-control" id="cidade" name="cidade">
                            </div>

                         <div class="col-md-3">
                                <label for="estado" class="form-label">UF</label>
                                <select class="form-select" id="estado" name="estado">
                                    <option selected value="SP">São Paulo</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>


                        <div class="col-md-3">
                                <label for="cep" class="form-label">Cep:</label>
                                <input type="text" class="form-control" id="cep" name="cep">
                            </div>

                    <div class="col-md-3">
                        <label for="numero" class="form-label">Numero do Celular:</label>
                        <input type="text" class="form-control" id="numero" name="numero">
                        </div>
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
    resp.send(`
<html><head>
<title>Cadastro de funcionarios</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <meta charset="utf-8">
    </head>
    <body>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/cadastrarfuncionario">MENU</a>
            <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/cadastrarfuncionario">Cadastrar funcionario</a>
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
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const cep = req.body.cep;
    const numero = req.body.numero;

    

//Validar a entrada do Usuario
//caso os dados não estiverem validos nos deveremos retornar um feedback

    if(nome&& Empresa&& email&& endereco&& cidade&& estado && cep&& numero){
        
        const funcionario = {nome,Empresa,email,endereco,cidade,estado,cep,numero};

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
                            <th scope="col">nome</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">email</th>
                            <th scope="col">endereco</th>
                            <th scope="col">cidade</th>
                            <th scope="col">estado</th>
                            <th scope="col">cep</th>
                            <th scope="col">telefone</th>
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
                                <td>${listafuncionario[i].endereco}</td>
                                <td>${listafuncionario[i].cidade}</td>
                                <td>${listafuncionario[i].estado}</td>
                                <td>${listafuncionario[i].cep}</td> 
                                <td>${listafuncionario[i].telefone}</td>
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
                    <title>Cadastro de funcionarios</title>
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
                    <label for="end"class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco}">
                </div>
                                `);

            if(!endereco){
                resp.write(`
                <div>
                    <span><p class="text-danger">O campo endereço deve ser preenchido</p></span>
                </div>
                `);
            }

            resp.write(`
                <div class="col-md-3">
                    <label for="cidade" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}">
                </div>
                `); 

            if(!cidade){    
                resp.write(`
                <div>
                    <span><p class="text-danger">O campo cidade deve ser preenchido</p></span>
                </div>
                `);
            }

            resp.write(`
                <div class="col-md-3">
                     <label for="estado" class="form-label">UF</label>
                    <select class="form-select" id="estado" name="estado">`);
            if(estado == "SP"){
                resp.write(`<option selected value="SP">São Paulo</option>`);}
            else{
                resp.write(`<option value="SP">São Paulo</option>`);
            }
            if(estado == "AC"){
                resp.write(`<option selected value="AC">Acre</option>`);}
            else{
                resp.write(`<option value="AC">Acre</option>`);}
                        
            if(estado == "AL"){
                resp.write(`<option selected value="AL">Alagoas</option>`);}
            else{
                resp.write(`<option value="AL">Alagoas</option>`);}
            if(estado == "AP"){
                resp.write(`<option selected value="AP">Amapá</option>`);}
            else{
                resp.write(`<option value="AP">Amapá</option>`);}
            if(estado == "AM"){
                resp.write(`<option selected value="AM">Amazonas</option>`);}
            else{
                resp.write(`<option value="AM">Amazonas</option>`);}
            if(estado == "BA"){
                resp.write(`<option selected value="BA">Bahia</option>`);}
            else{
                resp.write(`<option value="BA">Bahia</option>`);}
            if(estado == "CE"){
                resp.write(`<option selected value="CE">Ceará</option>`);}
            else{
                resp.write(`<option value="CE">Ceará</option>`);}
            if(estado == "DF"){
                resp.write(`<option selected value="DF">Distrito Federal</option>`);}
            else{
                resp.write(`<option value="DF">Distrito Federal</option>`);}
            if(estado == "ES"){
                resp.write(`<option selected value="ES">Espírito Santo</option>`);}
            else{
                resp.write(`<option value="ES">Espírito Santo</option>`);}
            if(estado == "GO"){
                resp.write(`<option selected value="GO">Goiás</option>`);}
            else{
                resp.write(`<option value="GO">Goiás</option>`);}
            if(estado == "MA"){
                resp.write(`<option selected value="MA">Maranhão</option>`);}
            else{
                resp.write(`<option value="MA">Maranhão</option>`);}
            if(estado == "MT"){
                resp.write(`<option selected value="MT">Mato Grosso</option>`);}
            else{
                resp.write(`<option value="MT">Mato Grosso</option>`);}
            if(estado == "MS"){
                resp.write(`<option selected value="MS">Mato Grosso do Sul</option>`);}
            else{
                resp.write(`<option value="MS">Mato Grosso do Sul</option>`);}
            if(estado == "MG"){
                resp.write(`<option selected value="MG">Minas Gerais</option>`);}
            else{
                resp.write(`<option value="MG">Minas Gerais</option>`);}
            if(estado == "PA"){
                resp.write(`<option selected value="PA">Pará</option>`);}
            else{
                resp.write(`<option value="PA">Pará</option>`);}
            if(estado == "PB"){
                resp.write(`<option selected value="PB">Paraíba</option>`);}
            else{
                resp.write(`<option value="PB">Paraíba</option>`);}
            if(estado == "PR"){
                resp.write(`<option selected value="PR">Paraná</option>`);}
            else{
                resp.write(`<option value="PR">Paraná</option>`);}
            if(estado == "PE"){
                resp.write(`<option selected value="PE">Pernambuco</option>`);}
            else{
                resp.write(`<option value="PE">Pernambuco</option>`);}
            if(estado == "PI"){
                resp.write(`<option selected value="PI">Piaí</option>`);}
            else{
                resp.write(`<option value="PI">Piaí</option>`);}
            if(estado == "RJ"){
                resp.write(`<option selected value="RJ">Rio de Janeiro</option>`);}
            else{
                resp.write(`<option value="RJ">Rio de Janeiro</option>`);}
            if(estado == "RN"){
                resp.write(`<option selected value="RN">Rio Grande do Norte</option>`);}
            else{
                resp.write(`<option value="RN">Rio Grande do Norte</option>`);}
            if(estado == "RS"){
                resp.write(`<option selected value="RS">Rio Grande do Sul</option>`);}
            else{
                resp.write(`<option value="RS">Rio Grande do Sul</option>`);}
            if(estado == "RO"){
                resp.write(`<option selected value="RO">Rondônia</option>`);}
            else{
                resp.write(`<option value="RO">Rondônia</option>`);}
            if(estado == "RR"){
                resp.write(`<option selected value="RR">Roraima</option>`);}
            else{
                resp.write(`<option value="RR">Roraima</option>`);}
            if(estado == "SC"){
                resp.write(`<option selected value="SC">Santa Catarina</option>`);}
            else{
                resp.write(`<option value="SC">Santa Catarina</option>`);}
            if(estado == "SE"){
                resp.write(`<option selected value="SE">Sergipe</option>`);}
            else{
                resp.write(`<option value="SE">Sergipe</option>`);}
            if(estado == "SP"){
                resp.write(`<option selected value="SP">São Paulo</option>`);}
            else{
                resp.write(`<option value="SP">São Paulo</option>`);}
            if(estado == "TO"){
                resp.write(`<option selected value="TO">Tocantins</option>`);}
            else{
                resp.write(`<option value="TO">Tocantins</option>`);}

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

app.get('/',menuView);
app.get('/cadastrarfuncionario', cadastro);//envia o formulario para cadastrar o personagem
app.post('/cadastrarfuncionario', cadastrarfuncionario);


app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
})