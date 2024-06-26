class MyPets extends HTMLElement {
    constructor() {
        super();

        this.pets = this.petList();
        this.pages = [];
        this.lines = 2;
        this.setPages();

        this.pageIndex = 1;
        this.previousPage = this.getPreviousPageIndex();
        this.nextPage = this.getNextPageIndex();

        this.cards = this.getCardsList();
    }

    getPreviousPageIndex() {
        if (this.pageIndex <= 1) {
            return "-";
        } else {
            return this.pageIndex - 1;
        }
    }

    getNextPageIndex() {
        if (this.pageIndex >= this.pages.length) {
            return "-";
        } else {
            return this.pageIndex + 1;
        }
    }

    petList() {
        let list = [];
        let listStorage = JSON.parse(localStorage.getItem("petList"));
        let userEmail = JSON.parse(localStorage.getItem("loggedUser")).email.replace("@", "").replace(".", "");
        if (!listStorage) {
            return list;
        }
        listStorage.forEach(
            (pet) => {
                if (pet.userEmail == userEmail) {
                    list.push(pet);
                }
            }
        );
        return list;
    }

    getCardsList() {
        let cards = [];
        let list = ``;
        let page = this.pages[this.pageIndex - 1];
        if (page) {
            page.forEach(
                (pet, index, _) => {
                    let card = `
                    <pet-card pet='${JSON.stringify(pet)}'></pet-card>\n
                `;
                    cards.push(card);
                    if (cards.length == 2) {
                        list += `<div class="petList">${cards.join("")}</div>`;
                        cards = [];
                    } else if (index + 1 == page.length) {
                        list += `<div class="petList">${cards.join("")}
                        </div>`;
                    }
                }
            );
        }
        return list;
    }

    setPages() {
        let page = [];
        console.log("PETS", this.pets);
        this.pets.forEach(
            (pet, index, _) => {
                page.push(pet);
                if (page.length == 2 * this.lines) {
                    this.pages.push(page);
                    page = [];
                }
                if (index == this.pets.length - 1) {
                    this.pages.push(page);
                }
            }
        );
        console.log("PAGES", this.pages);
    }

    configureButtons() {
        let previousButton = document.getElementById("previousButton");
        let nextButton = document.getElementById("nextButton");

        if (this.pageIndex <= 1) {
            previousButton.disabled = true;
            previousButton.querySelector("img").classList.add("disabled");
            previousButton.querySelector("img").src = "/view/assets/icons/disabledArrow.svg";
        } else {
            previousButton.disabled = false;
            previousButton.querySelector("img").classList.remove("disabled");
            previousButton.querySelector("img").src = "/view/assets/icons/listArrow.svg";
        }

        if (this.pageIndex >= this.pages.length) {
            nextButton.disabled = true;
            nextButton.querySelector("img").classList.add("disabled");
            nextButton.querySelector("img").src = "/view/assets/icons/disabledArrow.svg";
        } else {
            nextButton.disabled = false;
            nextButton.querySelector("img").classList.remove("disabled");
            nextButton.querySelector("img").src = "/view/assets/icons/listArrow.svg";
        }
    }

    addButtonsListeners() {
        let previousButton = document.getElementById("previousButton");
        let nextButton = document.getElementById("nextButton");

        previousButton.addEventListener("click", () => {
            if (this.pageIndex > 1) {
                this.pageIndex--;
                this.previousPage = this.getPreviousPageIndex();
                this.nextPage = this.getNextPageIndex();
                this.cards = this.getCardsList();
                this.configureButtons();
                this.connectedCallback();
            }
        });

        nextButton.addEventListener("click", () => {
            if (this.pageIndex < this.pages.length) {
                this.pageIndex++;
                this.previousPage = this.getPreviousPageIndex();
                this.nextPage = this.getNextPageIndex();
                this.cards = this.getCardsList();
                this.configureButtons();
                this.connectedCallback();
            }
        });
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="myPetList">
            <div id="listHeader">
                <button id="previousButton">
                    <img id="previousPage"
                        src="assets/icons/listArrow.svg" alt="voltar">
                </button>
                <h4 id="previousPageIndex"
                    class="sectionSubtitleFont">-</h4>
                <h3 id="currentPageIndex"
                    class="sectionSubtitleFont">1</h3>
                <h4 id="nextPageIndex"
                    class="sectionSubtitleFont">-</h4>
                <button id="nextButton">
                    <img id="nextPage" src="assets/icons/listArrow.svg"
                        alt="voltar">
                </button>
            </div>
            <div id="petListFather">
                ${this.cards}
            </div>
        </div>`;
        this.configureButtons();
        this.addButtonsListeners();
    }
}

customElements.define('my-pets', MyPets);

