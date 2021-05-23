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
let cheeseOption = document.querySelector(".cheeseOption");
let cheeseDropdown = document.querySelector('.cheeseDropdown');

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
priceTotal.innerText = total;


for (let i = 0; i < divRadioBtn.length; i++) {
    divRadioBtn[i].addEventListener("click", () => {
        // CLEAR TOTAL IF A NEW DOUGH OPTION CHOSEN
        total = 0;
        priceTotal.innerText = total;

        // CLEAR SELECT SIZE IF A NEW DOUGN OPTION CHOSEN
        selectedDoughSize.innerText = "";

        // HIDE SELECT CHEESE IF A NEW DOUGH OPTION CHOSE 
        if(!cheeseOption.classList.contains("hidden")) {
            cheeseOption.classList.add('hidden')
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
  flag = true;
  selectedDoughSize.innerText = "Selected size: " + selSize;
  console.log("index: ", selSize.indexOf("$"));
  let price = selSize.slice(selSize.indexOf("$") + 1);
//   keepingCurrentSizePrice(price);
  console.log("price: ", price);
  total += Number(price);
  priceTotal.innerText = total;
  selectCheese();
}

// function keepingCurrentSizePrice(truePrice) {
//     return truePrice;
// }

function selectCheese() {
    cheeseOption.classList.remove("hidden");
    cheeseDropdown.addEventListener('click', e => {
        e.preventDefault();
        console.log('e target: ', e.target.id);
        if(e.target.id === 'extraCheese') calculatePrice(2.99);
        else if(e.target.id === 'doubleCheese') calculatePrice(3.99);
        else calculatePrice(0);
        priceTotal.innerText = total; 
        selectedCheese.innerHTML ='Selected Cheese: ' +  e.target.innerHTML;      
  })
}

function calculatePrice(num) {
    let currPrice =  total;
    currPrice += Number(num);
    currPrice = currPrice.toFixed(2);
    console.log('curr Price: ', currPrice);
    console.log('priceTotal: ', priceTotal);
    priceTotal.innerText = `${currPrice}`;
    console.log('priceTotal after: ', priceTotal);
 }
