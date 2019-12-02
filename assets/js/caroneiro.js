const $backdrop = document.querySelector(".backdrop");
const $searchBox = document.querySelector(".searchBox");
const $positionBox = document.querySelector(".positionBox");
const $confirmModal = document.querySelector(".confirmModal");

const init = () => {
    $searchBox.classList.add("is-visible");

    document.addEventListener("click", event => {
        if (event.target.classList.contains("searchBox-input") || event.target.classList.contains("searchBox")) {
            $searchBox.classList.add("is-open");
        }
    });

    document.querySelector(".js-confirmSearch").addEventListener("click", confirmSearchClicked);
    document.querySelector(".js-cancelSearch").addEventListener("click", cancelSearchClicked);
    document.querySelector(".js-confirmPosition").addEventListener("click", confirmPositionClicked);
    document.querySelector(".js-cancelPosition").addEventListener("click", cancelPositionClicked);
}

const confirmSearchClicked = () => {
    $backdrop.classList.remove("is-visible");

    $searchBox.classList.remove("is-open");
    $searchBox.classList.add("is-hidden");

    $positionBox.classList.add("is-open");
    
    initPositioning();
}

const confirmPositionClicked = () => {
    $positionBox.classList.remove("is-open");
    $searchBox.classList.remove("is-visible");

    loadingBox.show();
    
    // Fake timeout to simulate a request, until we implement proper searching for drivers
    setTimeout(() => {
        loadingBox.hide();

        document.querySelector(".confirmModal").classList.add("is-visible");
    }, 2000);
}

const cancelSearchClicked = () => {
    if ($searchBox.classList.contains("is-open")) {
        $searchBox.classList.remove("is-open");
    }
}

const cancelPositionClicked = () => {
    if ($positionBox.classList.contains("is-open")) {
        $positionBox.classList.remove("is-open");
        $searchBox.classList.remove("is-hidden");
        $searchBox.classList.add("is-open");
    }
}

const okConfirmClicked = () => {
    $confirmModal.classList.remove("is-visible");
}

var socket = io();
document.querySelector(".js-confirmPosition").addEventListener("click",(e)=>{
    socket.on("transmitter", function(e){
        document.querySelector(".confirmModal").innerHTML = "";
        document.querySelector(".confirmModal").innerHTML = `
            <div class="userInfo -u-bottom-space-20">
                <img class="userCard-image"
                    src="${e.foto}"
                    alt="Foto">
                <div class="userCard-info">
                    <h3 class="userCard-name">${e.nome} (8/10)</h3>
                    <p class="userCard-details">${e.faculdade}, ${e.idade} anos, 14km</p>
                </div>
            </div>
            <div class="userInfo-description -u-bottom-space-20">
                ${e.descricao}
            </div>
        `;
    });
});

init();