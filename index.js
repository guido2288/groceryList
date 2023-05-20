import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { config } from "./config.js";

const url = config.Url;

const appSettings = {
  databaseURL: url
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

onValue(shoppingListInDB, function (snapshot) {



  if (snapshot.exists()) {

    let shoppingListArray = Object.entries(snapshot.val());

    clearValue();

    clearShoppingList()


    for (let i = 0; i < shoppingListArray.length; i++) {

      let currentItem = shoppingListArray[i];
      let currentItemId = currentItem[0]
      let currentItemValue = currentItem[1]


      insertItem(currentItem);
    }
  } else {
    shoppingList.innerHTML = 'No hay lista aun...'
  }


})



const inputField = document.getElementById('input-field');
const addBtn = document.getElementById('add-button');
const shoppingList = document.getElementById('shoping-list');




addBtn.addEventListener('click', function () {

  let inputValue = inputField.value;

  push(shoppingListInDB, inputValue);

  clearValue();

});


function clearValue() {

  inputField.value = '';
};

function insertItem(item) {

  let itemId = item[0];
  let itemValue = item[1];

  let newEl = document.createElement('li');

  newEl.textContent = `${itemValue}`;

  newEl.addEventListener('click', function () {

    let itemToDelete = ref(database, `shoppingList/${itemId}`);

    remove(itemToDelete);

  })

  shoppingList.append(newEl)

};


function clearShoppingList() {
  shoppingList.innerHTML = "";
}