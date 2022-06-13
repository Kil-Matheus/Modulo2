function TestGETDB(){
    var url = "http://127.0.0.1:3061/endereco";
    var resposta;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    resposta = JSON.parse(xhttp.responseText);
    
    $(getDBResDiv).append("<br /><br />" + JSON.stringify(resposta));
}

