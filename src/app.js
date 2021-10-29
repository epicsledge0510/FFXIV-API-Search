import * as firebase from "./firebase.js";
window.onload = (e) => {
  document.querySelector("#search").onclick = loadJsonFetch
  document.querySelector("#savebtn").onclick = searchSave
};
const nameField = document.querySelector("#searchterm");
const nameKey = "";
let resultsSection = document.querySelector("#results")
function saveData(favesNames, favesType){
  let listIDName = "name-list";
  let items = JSON.stringify(favesNames); 			// now it's a String
  localStorage.setItem(listIDName, favesNames);

  let listIDTypes = "type-list";
  let items2 = JSON.stringify(favesType); 			// now it's a String
  localStorage.setItem(listIDTypes, favesType);
}
function searchSave() {
  const storedName = localStorage.getItem(nameKey);

  // if we find a previously set name value, display it
  if (storedName) {
    nameField.value = storedName;
  } else {
    nameField.value = ""; // a default value if `nameField` is not found
  }


  /* This stuff happens later when the user does something */
  // when the user changes their favorites, update localStorage
  nameField.onchange = e => {
    localStorage.setItem(nameKey, e.target.value);
  };
}

function loadJsonFetch() {
  let searchTerm = document.querySelector("#searchterm").value;
  fetch(`https://xivapi.com/search?string=${searchTerm}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.text().then(text => {
        throw text;
      });
    })
    .then(json => {
      document.querySelector("#results").innerHTML = "";
      let i = 0;
      for (let key in json.Results) {
        if (i < document.querySelector("#resultAmount").value) {
          if (json.Results[key].UrlType == document.querySelector("#resultSelect").value || document.querySelector("#resultSelect").value == "any") {
            if (json.Results[key].UrlType == "Action") {
              document.querySelector("#results").innerHTML += `
            <div  class="column">
              <div class="notification">
                <ff-action data-name="${json.Results[key].Name}" data-img="${json.Results[key].Icon}" data-type="${json.Results[key].UrlType}" ;></ff-action>
              </div>
            </div>
            `
            } else {
              document.querySelector("#results").innerHTML += `
              <div  class="column">
                <div class="notification">
                  <ff-item data-name="${json.Results[key].Name}" data-img="${json.Results[key].Icon}" data-type="${json.Results[key].UrlType}" ;></ff-item>
                </div>
              </div>
            `
            }
            i++;
          }
        }
      }
    }).catch(error => {
      console.log(error);
    });
}
export{saveData};