import * as firebase from "./firebase.js";
const template3 = document.createElement("template");
template3.innerHTML = `
<style>
  :host{
    display: block;
    background-color: #B2BEB5;
  }
  span{
    color: #F76902;
    font-varient: small-caps;
    font-weight: bolder;
    font-family: sans-serif;
  }
  </style>
  <p>
  <span></span>
  <h3></h3>
  <h4></h4>
`;
class FFXIVFave extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.appendChild(template3.content.cloneNode(true));
        // put this at the end of the constructor
        if (!this.dataset.name) this.dataset.name = "Self-Destruct";
        if (!this.dataset.img) this.dataset.img = "/i\/003000\/003276.png";
        if (!this.dataset.id) this.dataset.id = "/Action/11408";
        if (!this.dataset.type) this.dataset.type = "Item";
        if (!this.dataset.likes) this.dataset.likes = "1";

        this.span = this.shadowRoot.querySelector("span");
        this.h3 = this.shadowRoot.querySelector("h3");
        this.h4 = this.shadowRoot.querySelector("h4");
    }
    connectedCallback() {
        this.render();
    }
    render() {
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "1995";
        const type = this.getAttribute('data-type') ? this.getAttribute('data-type') : "Items";
        const likes = this.getAttribute('data-likes') ? this.getAttribute('data-likes') : "0";
        
        this.shadowRoot.querySelector("span").innerHTML = `${name}`;
        this.shadowRoot.querySelector("h3").innerHTML = `Type: ${type}`;
        this.shadowRoot.querySelector("h4").innerHTML = `Likes: ${likes}`;

    }
    static get observedAttributes() {
        return ["data-name"];
    }
    attributeChangedCallback(attributeName, oldVal, newVal) {
        //console.log(attributeName, oldVal, newVal);
        this.render();
    }
    disconnectedCallback() {

    }
};
customElements.define('ff-fave', FFXIVFave);