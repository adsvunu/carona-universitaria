class LoadingBox {
    $loadingBox = document.querySelector(".loadingBox");
    $loadingBoxText = document.querySelector(".js-loadingBoxText");

    init = () => {
        if (!this.$loadingBox) {
            document.body.innerHTML += `
            <div class="loadingBox">
                <span class="loadingBox-text js-loadingBoxText">Carregando...</span>
                <i class="loader"></i>
            </div>`;

            this.$loadingBox = document.querySelector(".loadingBox");
            this.$loadingBoxText = document.querySelector(".js-loadingBoxText");
        }
    }

    show = () => {
        if (!this.$loadingBox) {
            this.init();
        }
    
        this.$loadingBox.classList.add("is-visible");
    }
    
    hide = () => {
        if (this.$loadingBox) {
            this.$loadingBox.classList.remove("is-visible");
        }
    }
}

const loadingBox = new LoadingBox();