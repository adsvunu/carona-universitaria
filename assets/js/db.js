var fakedb = {
    "dados": {
        "caroneiro": [
            {
                "id": 1,
                "nome": "Lucas Gusmão",
                "email": "lucas@gmail.com",
                "senha": "123",
                "faculdade": "Puc Minas - Liberdade",
                "idade": 18,
                "foto": "https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg",
                "descricao": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo unde sapiente quidem est ratione aliquid mollitia aspernatur. Corporis expedita a est at assumenda nemo quidem atque. Inventore, facilis vel."
            },
            {
                "id": 2,
                "nome": "Arthur Braga",
                "email": "arthur@gmail.com",
                "senha": "456",
                "faculdade": "Puc Minas - Liberdade",
                "idade": 22,
                "foto": "https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg",
                "descricao": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo unde sapiente quidem est ratione aliquid mollitia aspernatur. Corporis expedita a est at assumenda nemo quidem atque. Inventore, facilis vel."
            },
            {
                "id": 3,
                "nome": "Isabella Nicácio",
                "email": "isabella@gmail.com",
                "senha": "789",
                "faculdade": "UFMG",
                "idade": 17,
                "foto": "https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg",
                "descricao": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo unde sapiente quidem est ratione aliquid mollitia aspernatur. Corporis expedita a est at assumenda nemo quidem atque. Inventore, facilis vel."
            },
            {
                "id": 4,
                "nome": "Pedro Henrique",
                "email": "pedro@gmail.com",
                "senha": "000",
                "faculdade": "UniBH - Buritis",
                "idade": 23,
                "foto": "https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg",
                "descricao": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo unde sapiente quidem est ratione aliquid mollitia aspernatur. Corporis expedita a est at assumenda nemo quidem atque. Inventore, facilis vel."
            },
        ],
        "motorista": [
            {
                "id": 1,
                "nome": "Samuel Baker",
                "email": "samuel@gmail.com",
                "senha": "111",
                "faculdade": "Puc Minas - Liberdade",
                "idade": 18,
                "foto": "https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg",
                "descricao": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo unde sapiente quidem est ratione aliquid mollitia aspernatur. Corporis expedita a est at assumenda nemo quidem atque. Inventore, facilis vel."
            }
        ],
        "solicitacoes": [
            {
                "caroneiro": 0,
                "motorista": 0,
                "coordenada": {
                    "lat": 765675,
                    "long": 2342342
                },
                "aceita": null
            },
            {
                "caroneiro": 1,
                "motorista": 0,
                "coordenada": {
                    "lat": 765675,
                    "long": 2342342
                },
                "aceita": null
            },
            {
                "caroneiro": 2,
                "motorista": 0,
                "coordenada": {
                    "lat": 765675,
                    "long": 2342342
                },
                "aceita": null
            },
            {
                "caroneiro": 3,
                "motorista": 0,
                "coordenada": {
                    "lat": 765675,
                    "long": 2342342
                },
                "aceita": null
            },
        ]
    }

}

// Caso exista no Local Storage, recupera os dados salvos
var db = JSON.parse(localStorage.getItem('db'));
if (!db) {
    db = fakedb
    localStorage.setItem('db', JSON.stringify(db));
};


function insertCadastro(cadastro, tipoUsuario) {
    if (tipoUsuario == "Motorista") {
        // Calcula novo Id a partir do último código existente no array
        let novoId = db.dados.motorista[db.dados.motorista.length - 1].id + 1;
        let novoCadastro = {
            "id": novoId,
            "nome": cadastro.nome,
            "email": cadastro.email,
            "senha": cadastro.senha,
            "faculdade": cadastro.faculdade,
            "idade": cadastro.idade,
            "foto": "https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg",
            "descricao": cadastro.descricao,
        };

        // Insere o novo objeto no array
        db.dados.motorista.push(novoCadastro);

        // Atualiza os dados no Local Storage
        localStorage.setItem('db', JSON.stringify(db));
    }
    else{
        // Calcula novo Id a partir do último código existente no array
        let novoId = db.dados.caroneiro[db.dados.caroneiro.length - 1].id + 1;
        let novoCadastro = {
            "id": novoId,
            "nome": cadastro.nome,
            "email": cadastro.email,
            "senha": cadastro.senha,
            "faculdade": cadastro.faculdade,
            "idade": cadastro.idade,
            "foto": cadastro.foto,
            "descricao": cadastro.descricao,
        };

        let tipoUsuario = cadastro.tipoUsuario;

        db.dados.caroneiro.push(novoCadastro);

        // Atualiza os dados no Local Storage
        localStorage.setItem('db', JSON.stringify(db));
    }

}