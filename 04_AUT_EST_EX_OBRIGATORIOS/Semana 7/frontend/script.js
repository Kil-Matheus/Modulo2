api = 'http://127.0.0.1:3071'

var users = {
    
    list() {
        $.ajax({
            url: api + '/alunos',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="insert" onclick="user.insert()">Inserir</div>';
                data.forEach(element => {
                    tx += '<div class="user">';
                        tx += '<p id="nome">' + element.nome + '</p>';
                        tx += '<div class="actions">';
                            tx += '<div class="action" onclick="user.update(' + element.userId + ',\'' + element.title + '\')">Editar</div>';
                            tx += '<div class="action" onclick="user.delete(' + element.userId + ')">Excluir</div>';
                        tx += '</div>';
                    tx += '</div>';
                });
                $('#main').html(tx);
            }
        });
        
    }
    
};