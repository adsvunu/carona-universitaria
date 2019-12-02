let cardId;

function loadPage() {
    let user = sessionStorage.getItem("user");

    if (user) {
        user = JSON.parse(user).nome;
    }

    document.querySelector(".start-title").innerHTML = `Bem vindo, ${user}`

    if (!localStorage.getItem('db')) localStorage.setItem('db', JSON.stringify(fakedb));

    db = JSON.parse(localStorage.getItem('db'));

    let solicitacoes = '';
    for (i = 0; i < db.dados.solicitacoes.length; i++) {

        if (db.dados.solicitacoes[i].aceita === null) {
            solicitacoes += `
                <div class="userCard js-userCard" data-user-id="${i}" data-latitude="0" data-longitude="0">
                    <img class="userCard-image"
                        src="${db.dados.caroneiro[db.dados.solicitacoes[i].caroneiro].foto}"
                        alt="Foto">
                    <div class="userCard-info">
                        <h3 class="userCard-name">${db.dados.caroneiro[db.dados.solicitacoes[i].caroneiro].nome}</h3>
                        <p class="userCard-details">${db.dados.caroneiro[db.dados.solicitacoes[i].caroneiro].faculdade}, ${db.dados.caroneiro[db.dados.solicitacoes[i].caroneiro].idade} anos, ${"2"}km</p>
                    </div>
                </div>
            `;
        }

    }

    document.getElementById("cardSolicitations").innerHTML = solicitacoes;

    document.querySelectorAll(".js-userCard").forEach((card) => {
        card.addEventListener("click", (e) => {
            cardId = e.target.dataset.userId;
            document.querySelector(".modal").classList.add("is-visible");
            document.querySelector(".backdrop").classList.add("is-visible");
            document.querySelector(".navbar").classList.add("is-locked");
            toggleScroll();
        });
    })

    document.querySelector(".backdrop").addEventListener("click", () => {
        document.querySelector(".modal").classList.remove("is-visible");
        document.querySelector(".backdrop").classList.remove("is-visible");
    });

    document.querySelector(".js-refuse").addEventListener("click", () => {
        db.dados.solicitacoes[cardId].aceita = false;
        localStorage.setItem('db', JSON.stringify(db));
        document.querySelector(".modal").classList.remove("is-visible");
        document.querySelector(".backdrop").classList.remove("is-visible");
        loadPage();
        document.querySelector(".navbar").classList.remove("is-locked");
        toggleScroll();
    });

    document.querySelector(".js-accept").addEventListener("click", () => {
        db.dados.solicitacoes[cardId].aceita = true;
        localStorage.setItem('db', JSON.stringify(db));
        window.location.href = "/motorista/mapa";
        document.querySelector(".navbar").classList.remove("is-locked");
        toggleScroll();
    });
}

const toggleScroll = () => {
    document.body.style.overflow = document.body.style.overflow === "hidden" ? "" : "hidden";
}