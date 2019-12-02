// Inputs
const profilePicture = document.querySelector(".profile-picture");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const faculdade = document.querySelector("#faculdade");
const idade = document.querySelector("#idade");
const descricao = document.querySelector("#descricao");

var loadPage = () => {
    let user = sessionStorage.getItem("user");

    if (user) {
        user = JSON.parse(user);
        profilePicture.src = user.foto;
        nome.value = user.nome;
        email.value = user.email;
        senha.value = user.senha;
        faculdade.value = user.faculdade;
        idade.value = user.idade;
        descricao.value = user.descricao;
    }
}

document.querySelector(".profile-form").addEventListener("submit", e => {
    e.preventDefault();
    let user = sessionStorage.getItem("user");

    if (user) {
        user = JSON.parse(user);
        console.log(e);
        const newItem = db.dados[window.location.pathname.split("/")[1]].filter(i => i.id != user.id);
        const newUser = {
            ...user,
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            faculdade: faculdade.value,
            idade: idade.value,
            foto: profilePicture.src,
            descricao: descricao.value
        };

        newItem.push(newUser);

        const newDb = db;
        newDb.dados[window.location.pathname.split("/")[1]] = newItem;

        setSession(newUser);
        sessionStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("db", JSON.stringify(newDb));
    }

})

function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        callback(reader.result);
    };
}

document.querySelector("#profile-picture").addEventListener("change", e => {
    const file = e.target.files[0];

    getBase64(file, (c) => {
        profilePicture.src = c;
    })
});
