import * as firebase from "./firebase.js";
import * as app from "./proj2.js";
let favesNames = [];
let favesType = [];
const template1 = document.createElement("template");
template1.innerHTML = `
<style>
  :host{
    display: block;
    linear-gradient(
      rgba(70, 75, 71, 0.7),
      rgba(0, 0, 0, 0.7)
    );
    background-color: #B2BEB5;
  }
  span{
    color: #F76902;
    font-varient: small-caps;
    font-weight: bolder;
    font-family: sans-serif;
  }
  </style>
  <img>
  <p>
  <span></span>
  <h4></h4>
`;
class FFXIVItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild(template1.content.cloneNode(true));
    // put this at the end of the constructor
    if (!this.dataset.name) this.dataset.name = 1989;
    if (!this.dataset.img) this.dataset.img = "Bill & Ted";
    if (!this.dataset.id) this.dataset.id = "/Action/11408";
    if (!this.dataset.type) this.dataset.type = "Item";

    this.span = this.shadowRoot.querySelector("span");
    this.img = this.shadowRoot.querySelector("img");
    this.h4 = this.shadowRoot.querySelector("h4");
  }
  connectedCallback() {
    this.img.onclick = () => {
      const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "1995";
      const img = this.getAttribute('data-img') ? this.getAttribute('data-img') : "Nobody";
      const type = this.getAttribute('data-type') ? this.getAttribute('data-type') : "Item";
      favesNames.push(name);
      favesType.push(type);
      firebase.writeFavNameData(name, type);
      app.saveData();
      this.shadowRoot.querySelector("h4").innerHTML = `Added to favorites<`;
    }
    this.render();
  }
  render() {
    const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "1995";
    const img = this.getAttribute('data-img') ? this.getAttribute('data-img') : "Nobody";
    this.shadowRoot.querySelector("span").innerHTML = `${name}`;
    this.shadowRoot.querySelector("img").src = "https://xivapi.com" + img
    this.shadowRoot.querySelector("img").height = 40;
    this.shadowRoot.querySelector("img").width = 40;
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
customElements.define('ff-item', FFXIVItem);
const template2 = document.createElement("template");
template2.innerHTML = `
<style>
  :host{
    display: block;
    background-color: #F4BB44;
  }
  span{
    color: #C41E3A;
    font-varient: small-caps;
    font-weight: bolder;
    font-family: sans-serif;
  }
  </style>
  <img>
  <p>
  <span></span>
  <h4></h4>
`;
class FFXIVAction extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild(template2.content.cloneNode(true));
    // put this at the end of the constructor
    if (!this.dataset.name) this.dataset.name = 1989;
    if (!this.dataset.img) this.dataset.img = "Bill & Ted";
    if (!this.dataset.id) this.dataset.id = "/Action/11408";
    if (!this.dataset.type) this.dataset.type = "Action";

    this.span = this.shadowRoot.querySelector("span");
    this.img = this.shadowRoot.querySelector("img");
    this.h4 = this.shadowRoot.querySelector("h4");
  }
  connectedCallback() {
    this.img.onclick = () => {
      const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "1995";
      const img = this.getAttribute('data-img') ? this.getAttribute('data-img') : "Nobody";
      const type = this.getAttribute('data-type') ? this.getAttribute('data-type') : "Action";
      favesNames.push(name);
      favesType.push(type);
      firebase.writeFavNameData(name, type);
      app.saveData(favesNames, favesType);
      this.shadowRoot.querySelector("h4").innerHTML = `Added to favorites`;
    }
    this.render();
  }
  render() {
    const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "1995";
    const img = this.getAttribute('data-img') ? this.getAttribute('data-img') : "Nobody";
    this.shadowRoot.querySelector("span").innerHTML = `${name}`;
    this.shadowRoot.querySelector("img").src = "https://xivapi.com" + img
    this.shadowRoot.querySelector("img").height = 40;
    this.shadowRoot.querySelector("img").width = 40;
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
customElements.define('ff-action', FFXIVAction);