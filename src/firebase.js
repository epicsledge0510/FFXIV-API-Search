let database;
// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"; // TODO: Add SDKs for Firebase products that you want to use
import {
  getDatabase,
  ref,
  set,
  increment,
  onValue
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJI4wAEQJdhoKYEWL2F9I-NYo8Fi20rI0",
  authDomain: "ffxiv-faves-5974f.firebaseapp.com",
  projectId: "ffxiv-faves-5974f",
  storageBucket: "ffxiv-faves-5974f.appspot.com",
  messagingSenderId: "350009311178",
  appId: "1:350009311178:web:4f56884068bb5d17b8d933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
const scoresRef = ref(db, 'scores2');

function downloadFaves(snapshot) {
  document.querySelector("#results").innerHTML = "";
  snapshot.forEach(scores2 => {
    const childKey = scores2.key;
    const childType = scores2.val().type;
    const childData = scores2.val().likes;
    console.log(childKey, childData);
    document.querySelector("#results").innerHTML += `
    <div  class="column">
        <div class="notification">
                  <ff-fave data-name="${childKey}" data-type="${childType}" data-likes="${childData}"></ff-fave>
        </div>
    </div>
    `
  });
}

function exportDownFaves(){
  onValue(scoresRef,downloadFaves);
}

function writeFavNameData(name, type) {
  const db = getDatabase();
  set(ref(db, 'scores2/' + name), {
    name,
    type,
    likes: increment(1)
  });
}
export {
  writeFavNameData,
  exportDownFaves
};