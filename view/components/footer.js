class footer extends HTMLElement {
    constructor() {
        super();
        } 

        connectedCallback() {
            this.innerHTML = `
        <style>
            @import url(/view/css/global.css);
            @import url(/view/css/footer/footer.css);
        </style>

        <footer id="fatherFooter">
            <div id="logoPet"></div>
            <div class="childFooter" id="petLacos">
                <div>
                    <p class="legendFont">LaçosPet</p>
                    <p class="legendFont paragraph">A LaçosPet é uma instituição sem fins lucrativos, voltada principalmente à adoção de pets e suporte às ONGs que fazem esse trabalho</p>
                    <p id="reserve">© 2024 | LaçosPet. Todos os direitos reservados.</p>
                </div>
            </div>
    
            <div class="childFooter" id="usefulLinks">
                <p class="legendFont">Links Úteis</p>
                <ul class="legendFont" id="theList">
                    <li><a class="listFooter" href=".\">Adote</a></li>
                    <li><a class="listFooter" href=".\">Sobre</a></li>
                    <li><a class="listFooter" href=".\">Perdidos</a></li>
                    <li><a class="listFooter" href=".\">Produtos</a></li>
                    <li><a class="listFooter" href=".\">ONGs</a></li>
                </ul>
            </div>
    
            <div id="logoSenac"></div>
        </footer>
        `; 
    }
}
customElements.define ('footer-component', footer)