const toggleLoginBox = () => {
    if (document.querySelector(".loginBox").classList.contains("is-visible")) {
        document.querySelector(".loginBox").classList.remove("is-visible");
        return;
    }
    
    document.querySelector(".loginBox").classList.add("is-visible");
}

const toggleSignupBox = () => {
    if (document.querySelector(".signupBox").classList.contains("is-visible")) {
        document.querySelector(".signupBox").classList.remove("is-visible");
        return;
    }
    
    document.querySelector(".signupBox").classList.add("is-visible");
}

const toggleBackdrop = () => {
    if (document.querySelector(".backdrop").classList.contains("is-visible")) {
        document.querySelector(".backdrop").classList.remove("is-visible");
        return;
    }
    
    document.querySelector(".backdrop").classList.add("is-visible");
}

const backdropClicked = () => {
    document.querySelectorAll(".modal").forEach(modal => {
        if (modal.classList.contains("is-visible")) {
            modal.classList.remove("is-visible");
        }
    });

    toggleBackdrop();
}

const signIn = (login, senha) => {
    const caroneiro = db.dados.caroneiro.find(i => i.email == login && i.senha == senha);
    
    if (caroneiro) {
        setSession(caroneiro);
        location.href = "/caroneiro/inicio";
        return;
    }

    const motorista = db.dados.motorista.find(i => i.email == login && i.senha == senha);

    if (motorista) {
        setSession(motorista);
        location.href = "/motorista/inicio";
        return;
    }

    alert("Senha ou e-mail errados.");
}

const loginClicked = (e) => {
    e.preventDefault();

    // obtem os dados
    let login = document.querySelector('#email-login').value;
    let senha = document.querySelector('#password-login').value;

    signIn(login, senha);
}

const signupClicked = (e) => {
    e.preventDefault();

    let nome = document.querySelector("#name-signup").value;
    let email = document.querySelector('#email-signup').value;
    let senha = document.querySelector('#password-signup').value;
    let confirmSenha = document.querySelector('#confirmPassword-signup').value;
    let faculdade = document.querySelector("#university-signup").value;
    let idade = document.querySelector('#age-signup').value;
    let tipoUsuario = document.querySelector('input[name="type-radio"]:checked').value;

    if (confirmSenha === senha) {
        let cadastro = { nome, email, senha, faculdade, idade};
        insertCadastro(cadastro, tipoUsuario);

        signIn(email, senha);

        return;
    }

    alert("As senhas não estão iguais");
}


document.querySelector("#login-button").addEventListener("click", () => {
    toggleBackdrop();

    toggleLoginBox();
});

document.querySelector("#signup-link").addEventListener("click", () => {
    toggleLoginBox();
    toggleSignupBox();
});

document.querySelector(".backdrop").addEventListener("click", () => {
    backdropClicked();
});

document.querySelector("#login-form").addEventListener("submit", loginClicked);

 // Adiciona funções para tratar os eventos 
 document.querySelector("#signup-form").addEventListener("submit", signupClicked);
