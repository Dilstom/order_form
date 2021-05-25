const $ = (id) => document.getElementById(id);

/*
 ******  DELIVERY LOCATION *******
 */
// VARIABLES I
let fullName = $("fullName");
let zip = $("zip");
let phone = $("phone");
let email = $("email");
let state = $("state");
let priceTotal = $("priceTotal");
let dropdown = document.querySelector(".addressType .dropdown-menu a");
let otherInput = document.querySelector(".hidden");
let e = document.querySelector(".addressType .dropdown-menu");

// let flag = false;

// VALIDATORS
function validateName(fullName) {
  let regCheck = /^[a-z ,.'-]+$/i;
  fullName = fullName.trim();
  if (regCheck.test(fullName)) {
    console.log("pass");
  } else {
    console.log("fail");
  }
  console.log("full name in validate; ", fullName);
}

function validateZip(zip) {
  let regCheck = /^\d{5}(?:[-\s]\d{4})?$/;
  zip = zip.trim();
  if (regCheck.test(zip)) {
    console.log("Z pass");
  } else {
    console.log("Z fail");
  }
  console.log("zip in validate; ", zip);
}

function validatePhone(phone) {
  let regCheck = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  phone = phone.trim();
  if (regCheck.test(phone)) {
    console.log("phone pass");
  } else {
    console.log("phone fail");
  }
  console.log("phone in validate; ", phone);
}

function validateEmail(email) {
  const regCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());

  if (regCheck.test(String(email).trim().toLowerCase())) {
    console.log("email pass");
  } else {
    console.log("email fail");
  }
  console.log("email in validate; ", email);
}

function validateState(state) {
  const regCheck = /^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/;
  // const regCheck = /\b[A-Z]{2}\b/;
  // return re.test(String(state).toLowerCase());
  state = state.trim().toUpperCase();

  if (regCheck.test(String(state))) {
    console.log("state pass");
  } else {
    console.log("state fail");
  }
  console.log("state in validate; ", state);
}

// TOGGLE 'HIDDEN' CLASS WHEN ADDRESS TYPE IS 'OTHER'
e.addEventListener("click", function () {
  let chosenOption = document.querySelector(
    ".btn#dropdownMenuButtonAddressType:first-child"
  ).innerHTML;
  console.log("chosenJ: ", chosenOption);
  if (chosenOption === "Other") {
    console.log("this: ", this);
    otherInput.classList.remove("hidden");
  } else {
    if (!otherInput.classList.contains("hidden")) {
      otherInput.classList.add("hidden");
    }
  }
});

fullName.addEventListener("blur", () => validateName(fullName.value));
zip.addEventListener("blur", () => validateZip(zip.value));
phone.addEventListener("blur", () => validatePhone(phone.value));
email.addEventListener("blur", () => validateEmail(email.value));
state.addEventListener("blur", () => validateState(state.value));

/*
 ******  BUILD ORDER *******
 */

const pizzaSize = {
  option1: {
    Small: "9.99",
    Medium: "12.99",
    Large: "14.99",
  },
  option2: {
    Medium: "11.99",
    Large: "13.99",
  },
  option3: {
    Large: "16.99",
    "Extra Large": "19.99",
  },
  option4: {
    Small: "10.99",
  },
};

// VARIABLES II
let selectSizeDiv = $("selectSizeDiv");
let option1 = $("option1");
let option2 = $("option2");
let option3 = $("option3");
let option4 = $("option4");
let selectedDough = $("selectedDough");
let selectedDoughSize = $("selectedDoughSize");
let selectedCheese = $("selectedCheese");
let selectedSauce = $("selectedSauce");
let cheeseOption = document.querySelector(".cheeseOption");
let sauceOption = document.querySelector(".sauceOption");
let cheeseDropdown = document.querySelector('.cheeseDropdown');
let sauceDropdown = document.querySelector('.sauceDropdown');
let toppingOption = document.querySelector('.toppingOption');

let pSelectedToppings = $('selectedToppings');

// // CREATE DROPDOWN MENU FOR SELECTED SIZE
// // BUTTON
// let btnSelectedDough = document.createElement("button");
// btnSelectedDough.classList = "btn btn-secondary dropdown-toggle";
// btnSelectedDough.setAttribute("type", "button");
// btnSelectedDough.setAttribute("id", "dropdownMenuButtonSelectSize");
// btnSelectedDough.setAttribute("data-toggle", "dropdown");
// btnSelectedDough.setAttribute("aria-haspopup", "true");
// btnSelectedDough.setAttribute("aria-expanded", "false");
// btnSelectedDough.appendChild(document.createTextNode("Choose Size"));
// // DIV
// let divSelectedDough = document.createElement("div");
// divSelectedDough.classList = "dropdown-menu sizeList";
// divSelectedDough.setAttribute(
//   "aria-labelledby",
//   "dropdownMenuButtonSelectSize"
// );
// let aTag = document.createElement("a");
// aTag.classList = "dropdown-item";
// aTag.setAttribute("href", "#");

let divRadioBtn = document.querySelectorAll(".radioBtn input");
let checked = document
  .querySelector("input:checked")
  .parentElement.textContent.trim();
console.log("checked: ", checked);

console.log("radio: ", divRadioBtn);
console.log("object: ", pizzaSize);

// SET PRICE
let total = 0;
// priceTotal.innerText = total;


for (let i = 0; i < divRadioBtn.length; i++) {
    divRadioBtn[i].addEventListener("click", () => {
        // CLEAR TOTAL IF A NEW DOUGH OPTION CHOSEN
        total = 0;
        priceTotal.innerText = total;

        // CLEAR SELECT SIZE IF A NEW DOUGN OPTION CHOSEN
        selectedDoughSize.innerText = "";

        // HIDE "SELECT CHEESE", "SELECTSAUCE", "TOPPINGS" IF A NEW DOUGH OPTION CHOSE 
        if(!cheeseOption.classList.contains("hidden")) {
            cheeseOption.classList.add('hidden')
        }
        if(!sauceOption.classList.contains("hidden")) {
            sauceOption.classList.add('hidden')
        }
        if(!toppingOption.classList.contains("hidden")) {
            toppingOption.classList.add('hidden')
        }

    //   CLEAR SELECTED SIZE DIV BEFORE EACH SELECTED OPTION
    removeAllChildNodes(selectSizeDiv);
    // if (selectSizeDiv.firstChild) {
    //   console.log("yes, first child");
    //   console.log("firstChidl", selectSizeDiv.firstChild);
    //   let removedDiv = selectSizeDiv.firstChild;
    //   removedDiv.remove();
    // }
    // CREATE DROPDOWN MENU FOR SELECTED SIZE
    // BUTTON
    let btnSelectedDough = document.createElement("button");
    btnSelectedDough.classList = "btn btn-secondary dropdown-toggle";
    btnSelectedDough.setAttribute("type", "button");
    btnSelectedDough.setAttribute("id", "dropdownMenuButtonSelectSize");
    btnSelectedDough.setAttribute("data-toggle", "dropdown");
    btnSelectedDough.setAttribute("aria-haspopup", "true");
    btnSelectedDough.setAttribute("aria-expanded", "false");
    btnSelectedDough.appendChild(document.createTextNode("Choose Size"));
    // DIV
    let divSelectedDough = document.createElement("div");
    divSelectedDough.classList = "dropdown-menu sizeList";
    divSelectedDough.setAttribute(
      "aria-labelledby",
      "dropdownMenuButtonSelectSize"
    );
    //   GET RADIO BUTTON TEXT
    let selectedOption = divRadioBtn[i].parentElement.textContent.trim();
    console.log("selectedOption: ", selectedOption);
    selectedDough.innerText = `Selected Dough: ${selectedOption}`;

    // GET RADIO BUTTON ID TO ACCESS OBJECT KEY
    let parentId = divRadioBtn[i].getAttribute("id");
    // console.log("parentId: ", parentId);
    // console.log("selected object", pizzaSize[parentId]);
    // console.log(
    //   "selected object length",
    //   Object.keys(pizzaSize[parentId]).length
    // );
    Object.keys(pizzaSize[parentId]).forEach((key) => {
      let aTag = document.createElement("a");
      aTag.classList = "dropdown-item";
      aTag.setAttribute("href", "#");
      console.log("key: ", key, pizzaSize[parentId][key]);
      aTag.appendChild(
        document.createTextNode(`${key}: $${pizzaSize[parentId][key]}`)
      );
      divSelectedDough.appendChild(aTag);
    });
    selectSizeDiv.appendChild(btnSelectedDough);
    selectSizeDiv.appendChild(divSelectedDough);

    // SELECTED SIZE
    let sizeList = document.querySelector(".sizeList");
    sizeList.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("selected size: ", e.target.innerHTML);
      total = 0;
      getSelectedSize(e.target.innerHTML);
    });
    // console.log('selected size; ', sizeList.value ? sizeList.value: '')
    // selectedDoughSize.innerText = `Selected size: ${}`
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getSelectedSize(selSize) {
  console.log("selected size in function: ", selSize);
//   flag = true;
//   CLEAR SELECTED CHOICES BELOW IF USER CHANGES DOUGH SIZE 
  selectedDoughSize.innerText = "Selected size: " + selSize;
  selectedSauce.innerHTML ='Selected Sauce: Regular Tomato: no charge';
//   console.log("index: ", selSize.indexOf("$"));
  let price = selSize.slice(selSize.indexOf("$") + 1);
//   keepingCurrentSizePrice(price);
  console.log("price: ", price);
  total += Number(price);
  console.log("total in size: ", total);
  priceTotal.innerText = total;
  selectCheese();
  selectSauce();
  selectTopping();
}

// function keepingCurrentSizePrice(truePrice) {
//     return truePrice;
// }

function selectCheese() {
    cheeseOption.classList.remove("hidden");
    selectedCheese.innerHTML ='Selected Cheese: Normal (default): no charge';
    
    cheeseDropdown.addEventListener('click', e => {
        selectedSauce.innerHTML ='Selected Sauce: Regular Tomato: no charge';
        e.preventDefault();
        console.log('e target: ', e.target.id);
        if(e.target.id === 'extraCheese') calculatePrice(2.99);
        else if(e.target.id === 'doubleCheese') calculatePrice(3.99);
        else calculatePrice(0);
        selectedCheese.innerHTML ='Selected Cheese: ' +  e.target.innerHTML;      
  })
}

function selectSauce() {
    sauceOption.classList.remove("hidden");
    selectedSauce.innerHTML ='Selected Sauce: Regular Tomato: no charge';
    sauceDropdown.addEventListener('click', e => {
        e.preventDefault();        
        console.log('e target: ', e.target.id);
        if(e.target.id === 'heartyTomato') calculateNewPrice(0.99);
        else if(e.target.id === 'bbqSauce') calculateNewPrice(1.99);
        else calculateNewPrice(0);
        selectedSauce.innerHTML ='Selected Sauce: ' +  e.target.innerHTML;      
  })
}

// 'PERSIST' PREVIOUS PRICE AFTER SIZE TO CALC. CHEESE
console.log('total: ', total)
let priceAfterCheeseSelection = null;
function calculatePrice(num) {
    let currPrice = total;
    currPrice += Number(num);

    console.log('currPrice in calc: ', currPrice)
    currPrice = currPrice.toFixed(2);
    // console.log('curr Price: ', currPrice);
    // console.log('priceTotal: ', priceTotal);
    priceTotal.innerText = `${currPrice}`;
    console.log('priceTotal after: ', priceTotal);
    priceAfterCheeseSelection = currPrice;
    return currPrice;
 }

//  'PERSIST' PRICE AFTER CHEESE TO CALC. SAUCE
 let priceAfterSauceSelection = null;
function calculateNewPrice(num) {
    console.log('total in new price: ', total)
    console.log('priceAfterCheeseSekection in new price: ', priceAfterCheeseSelection)
    // IF USER SELECTS SAUCE BEFORE CHEESE
    if(priceAfterCheeseSelection === null) {
        priceAfterCheeseSelection = total;
    }
    let currPrice = Number(priceAfterCheeseSelection);
    console.log('newPrice: ', currPrice);
    currPrice += Number(num);
    console.log('currPrice in calc: ', currPrice)
    currPrice = currPrice.toFixed(2);
    // console.log('curr Price: ', currPrice);
    // console.log('priceTotal: ', priceTotal);
    priceTotal.innerText = `${currPrice}`;
    console.log('priceTotal after: ', priceTotal);
    priceAfterSauceSelection = currPrice;
    return currPrice;
 }


function selectTopping() {
    toppingOption.classList.remove("hidden");
    let checkboxes = document.querySelectorAll('.toppingOption input[type=checkbox]').forEach(checkbox => checkbox.addEventListener('click', e=> toppingCheckboxes(e)));
}

let selections = [];
// let selection = {};
function toppingCheckboxes(e) {
    console.log('e.target.checked: ', e.target.checked);
    console.log('e.target.name: ', e.target.name);
    console.log('e.target.value: ', e.target.value);
    if(e.target.checked) {
        selections.push(e.target.id);
    }else{
        let i = selections.indexOf(e.target.id);
        selections.splice(i, 1);
    }
    console.log('selections; ', selections);
    pSelectedToppings.innerHTML =  selections;
    let sum = 0.99 * selections.length;
    calculatePriceAfterTopping(sum)
}

let priceAfterToppingSelection = null;
function calculatePriceAfterTopping(num) {
    let currPrice = total;
    currPrice += Number(num);

    console.log('currPrice in calc: ', currPrice)
    currPrice = currPrice.toFixed(2);
    // console.log('curr Price: ', currPrice);
    // console.log('priceTotal: ', priceTotal);
    priceTotal.innerText = `${currPrice}`;
    console.log('priceTotal after: ', priceTotal);
    priceAfterToppingSelection = currPrice;
    return currPrice;
 }