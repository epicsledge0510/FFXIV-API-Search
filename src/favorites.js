import * as firebase from "./firebase.js";
let items;
let items2;
window.onload = (e) => {
    document.querySelector("#loadbtn").onclick = loadData;
    document.querySelector("#clearbtn").onclick = clearData;
    document.querySelector("#cloudbtn").onclick = firebase.exportDownFaves;
};
document.querySelector("#loadbtn").onclick = loadJsonFetch();
let resultsSection = document.querySelector("#results")
function loadData() {
    let listIDName = "name-list";
    items = localStorage.getItem(listIDName); // returns a String
    console.log(items);
    let listIDTypes= "type-list";
    items2 = localStorage.getItem(listIDTypes); // returns a String
    console.log(items2);
    try{
        items = items.split(',');
        items2 = items2.split(',');
        console.log(items);
        console.log(items2);
    }
    catch{
        console.log("no locally stored favorites");
    }
    loadJsonFetch(items, items2)
}

function clearData() {
    localStorage.clear();
    document.querySelector("#results").innerHTML = "";
}

function loadJsonFetch(items, items2) {
    document.querySelector("#results").innerHTML = "";
    let i = 0;
    for (let obj in items) {
        document.querySelector("#results").innerHTML += `
            <div class="column">
            <ff-fave data-name="${items[obj]}" data-type="${items2[i]}" ;></ff-item>
			</div>
            `
        i++;
    }
}
