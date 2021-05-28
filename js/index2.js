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
let addressType = $("addressType");
let dropdown = document.querySelector(".addressType .dropdown-menu a");
let otherInput = document.querySelector(".hidden");
let e = document.querySelector(".addressType .dropdown-menu");
let fullNameError = $('fullNameError');
let stateError = $('stateError');
let zipError = $('zipError');
let emailError = $('emailError');
let phoneError = $('phoneError');
let cityError = $('cityError');
let typeError = $('typeError');
let addressLine1Error = $('addressLine1Error');
let streetAddress = $('streetAddress');
let streetAddress2 = $('streetAddress2');
let saveBtn = $('saveBtn');
let pOtherHelperInfo = $('pOtherHelperInfo');



let contactObj = {
    fullName: '',
    zip: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    type: '',
    otherType: '',
    streetAddress: '',
    streetAddress2: ''
}

let billingObj = {
  fullName2: '',
  zip2: '',
  state2: '',
  city2: '',
  address1: '',
  address2: ''
}

// VALIDATORS
function validateName(fullName, billing) {
  let regCheck = /^[a-z ,.'-]+$/i;
  fullName = fullName.trim();
  if (regCheck.test(fullName)) {
    console.log("pass");
    billing ? billingObj.fullName2 = fullName : contactObj.fullName = fullName;
    billing ? fullName2Error.innerHTML = '': fullNameError.innerHTML = '';
  } else {
    console.log("fail");
    billing ? fullName2Error.innerHTML = '* Please, provide valid name (letters only)': fullNameError.innerHTML = '* Please, provide valid name (letters only)';

    // fullNameError.innerHTML = '* Please, provide valid name (letters only)';
}
console.log("full name in validate; ", fullName);
}

function validateZip(zip, billing) {
    let regCheck = /^\d{5}(?:[-\s]\d{4})?$/;
    zip = zip.trim();
    if (regCheck.test(zip)) {
        console.log("Z pass");
       billing ? billingObj.zip2 = zip :  contactObj.zip = zip;
       billing ? zip2Error.innerHTML = '' : zipError.innerHTML = '';
    } else {
        console.log("Z fail");
       billing ? zip2Error.innerHTML = '* Please, provide valid zip code' : zipError.innerHTML = '* Please, provide valid zip code';
    }
    console.log("zip in validate; ", zip);
}

function validatePhone(phone) {
    let regCheck = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    phone = phone.trim();
    if (regCheck.test(phone)) {
        console.log("phone pass");
        contactObj.phone = phone;
        phoneError.innerHTML = '';
    } else {
        console.log("phone fail");
        phoneError.innerHTML = '* Please, provide valid phone number';
    }
    console.log("phone in validate; ", phone);
}

function validateEmail(email) {
    const regCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    
    if (regCheck.test(String(email).trim().toLowerCase())) {
        console.log("email pass");
        contactObj.email = email;
        emailError.innerHTML = '';
    } else {
        console.log("email fail");
        emailError.innerHTML = '* Please, provide valid email address';
    }
    console.log("email in validate; ", email);
}

function validateState(state, billing) {
    const regCheck = /^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/;
    // const regCheck = /\b[A-Z]{2}\b/;
    // return re.test(String(state).toLowerCase());
    state = state.trim().toUpperCase();
    
    if (regCheck.test(String(state))) {
        console.log("state pass");
        billing ? billingObj.state2 = state : contactObj.state = state;
        billing ? state2Error.innerHTML = '' : stateError.innerHTML = '';
    } else {
        console.log("state fail");
        billing ? state2Error.innerHTML = '* Please, provide valid two-letters State f/e: CA' : stateError.innerHTML = '* Please, provide valid two-letters State f/e: CA';
    }
    console.log("state in validate; ", state);
}

function validateCity(cityName, billing) {
    cityName = cityName.trim();
    if(!cityName){
      billing ? city2Error.innerHTML = '* Please, provide a city name': cityError.innerHTML = '* Please, provide a city name';
    }else{
        billing ? billingObj.city2 = cityName : contactObj.city = cityName;
        billing ? city2Error.innerHTML = '' : cityError.innerHTML = '';
    }
    console.log('contact obj: ', contactObj)
}

function validateStreet(streetAddress, billing) {
    streetAddress = streetAddress.trim();
    if(!streetAddress){
       billing ? address1Error.innerHTML = '* Please, provide a street address' : addressLine1Error.innerHTML = '* Please, provide a street address';
    }else{
       billing ? billingObj.address1 = streetAddress : contactObj.streetAddress = streetAddress;
       billing ? address1Error.innerHTML = '' :  addressLine1Error.innerHTML = '';
    }
    console.log('contact obj: ', contactObj)
}

function validateType(type) {
    type = type.trim();
    // pOtherHelperInfo.innerHTML = ""
    if(!type){
        typeError.innerHTML = '* Please, provide a type name';
    }else{
        contactObj.otherType = type
        typeError.innerHTML = '';
        pOtherHelperInfo.innerHTML = ''
    }
    console.log('contact obj: ', contactObj)
}

// TOGGLE 'HIDDEN' CLASS WHEN ADDRESS TYPE IS 'OTHER'
e.addEventListener("click", function () {
  let chosenOption = document.querySelector(
    ".btn#dropdownMenuButtonAddressType:first-child"
  ).innerHTML;
  console.log("chosenJ: ", chosenOption);
  if (chosenOption === "Other") {
    // contactObj.otherInput = chosenOption;
    console.log("this: ", this);
    contactObj.type = '';
    otherInput.classList.remove("hidden");
    pOtherHelperInfo.innerHTML = '* Please provide address type'
    addressType.addEventListener("blur", () => validateType(addressType.value));
  } else {
    contactObj.type = chosenOption;
    contactObj.otherType = '';
    if (!otherInput.classList.contains("hidden")) {
      otherInput.classList.add("hidden");
    }
  }
  console.log('current contact: ', contactObj)
});

fullName.addEventListener("blur", () => validateName(fullName.value, billing=false));
zip.addEventListener("blur", () => validateZip(zip.value,  billing=false));
phone.addEventListener("blur", () => validatePhone(phone.value));
email.addEventListener("blur", () => validateEmail(email.value));
state.addEventListener("blur", () => validateState(state.value,  billing=false));
city.addEventListener("blur", () => validateCity(city.value,  billing=false));
streetAddress.addEventListener("blur", () => validateStreet(streetAddress.value,  billing=false));
streetAddress2.addEventListener("blur", (e) => 
contactObj.streetAddress2 = e.target.value
)

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

//   VARIABLES
let hiddenClass = document.querySelector('.hiddenDiv');
let selectSizeDiv = $("selectSizeDiv");
let selectedDoughSize = $('selectedDoughSize');
let priceTotal = $('priceTotal');
let cheeseDropdown = document.querySelector('.cheeseDropdown');
let sauceDropdown = document.querySelector('.sauceDropdown');
let toppingOption = document.querySelector('.toppingOption');
let pSelectedToppings = $('selectedToppings');



// HELPER OBJECT
let selectedOptionsObj = {
    dough: '',
    size: '',
    priceSize: 0,
    selectedCheese: 'Normal (default): no charge',
    priceCheese: 0,
    selectedSauce: 'Regular Tomato: no charge',
    priceSauce: 0,
    sum: 0,
    total: function(){
        this.sum =  Number(this.priceCheese) + Number(this.priceSize) + Number(this.priceSauce) + (0.99 * this.topping.length);
        return this.sum.toFixed(2)
    },
    topping: []
}

// HELPER ASIDE FUNCTION
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function calculateTotal() {
    priceTotal.innerHTML = selectedOptionsObj.total();
    console.log('Template Object: ', selectedOptionsObj)
  }

//   let selectedOptionsObj = {
//     dough: '',
//     size: '',
//     priceSize: 0,
//     selectedCheese: 'Normal (default): no charge',
//     priceCheese: 0,
//     selectedSauce: 'Regular Tomato: no charge',
//     priceSauce: 0,
//     sum: 0,
//     total: function(){
//         this.sum =  Number(this.priceCheese) + Number(this.priceSize) + Number(this.priceSauce) + (0.99 * this.topping.length);
//         return this.sum.toFixed(2)
//     },
//     topping: []
// }

// MAIN FUNCTIONS
  function init() {
      let divRadioBtn = document.querySelectorAll(".radioBtn input");
      saveBtn.addEventListener('click', function() {
        console.log('ininit contactobj: ', contactObj)
          if(contactObj.fullName && contactObj.zip && contactObj.phone && contactObj.email && contactObj.state && contactObj.city){
            if(contactObj.type || contactObj.otherType) {
              if(selectedOptionsObj.dough && selectedOptionsObj.size) {
                console.log('PASS!')
                pizzaOrderForm.classList.add('hidden');
                billingInfo.classList.remove('hidden');
        
                typeError.innerHTML = "";
                // CLOSE MODAL
                document.getElementById('exampleModal').click();
                buildBilling();
              } else {
                alert('Please build your pizza')
                // CLOSE MODAL
                document.getElementById('exampleModal').click();
              }
            } else {
              // pOtherHelperInfo.innerHTML = "* Missing address type"
              alert('Please choose address type!');
              // CLOSE MODAL
              document.getElementById('exampleModal').click();
            }

          }else{
            console.log('NO PASS!')
            alert('Please add missing information to Delifery section')
          }
     
      })

      let checked = document.querySelectorAll('.dougnOption input');
      checked.forEach(dough => {
          dough.addEventListener('click', (e) => {
              console.log(e.target.id);
              let selectedDough = $(e.target.id).parentElement.textContent.trim();
              console.log('selectedDough: ', selectedDough);
              selectedOptionsObj.dough = selectedDough;
                console.log('selectedOptionsObj: ', selectedOptionsObj);
                hiddenClass.classList.remove('hidden');
              selectSizeBuilder(dough);
              selectCheese();
              selectSauce();
              selectTopping();
          })
      })
  }

  function selectSizeBuilder(divRadioBtn) {
    //   RECALC TOTAL AND RESET SIZE 
    
    selectedOptionsObj.size = '';
    selectedOptionsObj.priceSize = 0;
    selectedDoughSize.innerHTML = "Selected size: " + selectedOptionsObj.size;
    calculateTotal();
       //   CLEAR SELECTED SIZE DIV BEFORE EACH SELECTED OPTION
    removeAllChildNodes(selectSizeDiv);
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
    let selectedOption = divRadioBtn.parentElement.textContent.trim();
    console.log("selectedOption: ", selectedOption);
    selectedDough.innerText = `Selected Dough: ${selectedOption}`;

    // GET RADIO BUTTON ID TO ACCESS OBJECT KEY
    let parentId = divRadioBtn.getAttribute("id");
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
      selectedOptionsObj.size = e.target.innerHTML;
      selectedDoughSize.innerHTML = "Selected size: " + selectedOptionsObj.size;
      console.log('selectedOptionsObj in builder: ', selectedOptionsObj);
        getSelectedSize(e.target.innerHTML);
        calculateTotal();
        // priceTotal.innerHTML = selectedOptionsObj.total();
        // console.log('total: ', selectedOptionsObj.total())
    });
  }



  function getSelectedSize(str) {
    let priceSize = str.slice(str.indexOf("$") + 1);
    console.log('priceSize: ', priceSize);
    selectedOptionsObj.priceSize = priceSize;
    console.log('selectedOptionsObj in selectedSize: ', selectedOptionsObj); 
  }

  function selectCheese() {
    cheeseDropdown.addEventListener('click', e => {
        e.preventDefault();
        console.log('e target: ', e.target.id);
        if(e.target.id === 'extraCheese') selectedOptionsObj.priceCheese = 2.99;
        else if(e.target.id === 'doubleCheese') selectedOptionsObj.priceCheese = 3.99;
        else selectedOptionsObj.priceCheese = 0;
        selectedOptionsObj.selectedCheese = e.target.innerHTML;
        selectedCheese.innerHTML ='Selected Cheese: ' +  e.target.innerHTML; 
        calculateTotal(); 
  })}

  function selectSauce() {
    // selectedSauce.innerHTML ='Selected Sauce: Regular Tomato: no charge';
    sauceDropdown.addEventListener('click', e => {       
        e.preventDefault();
        console.log('e target: ', e.target.id);
        selectedOptionsObj.selectedSauce = e.target.innerHTML;
        if(e.target.id === 'heartyTomato') selectedOptionsObj.priceSauce = 0.99;
        else if(e.target.id === 'bbqSauce') selectedOptionsObj.priceSauce = 1.99;
        else selectedOptionsObj.priceSauce = 0;
        selectedSauce.innerHTML ='Selected Sauce: ' +  selectedOptionsObj.selectedSauce;     
        calculateTotal(); 
  })
}

function selectTopping() {
    // selectedOptionsObj.topping = [];
    console.log('checking in selectTopping: ', selectedOptionsObj.topping);
    let checkboxes = document.querySelectorAll('.toppingOption input[type=checkbox]').forEach(checkbox => checkbox.addEventListener('click', e=> toppingCheckboxes(e)));
}

function toppingCheckboxes(e) {
    console.log('checking in toppingCheckboxe: ', selectedOptionsObj.topping);

    console.log('e.target.checked: ', e.target.checked);
    console.log('e.target.name: ', e.target.name);
    console.log('e.target.value: ', e.target.value);
    if(e.target.checked) {
        selectedOptionsObj.topping.push(e.target.id);
    }else{
        let i = selectedOptionsObj.topping.indexOf(e.target.id);
        console.log('i: ', i)
        selectedOptionsObj.topping.splice(i, 1);
    }
    pSelectedToppings.innerHTML =  selectedOptionsObj.topping;
    calculateTotal();
}

// function proceedToBilling() {
//     console.log('billing')
//     window.open('./billing.html');

// }
  

  init();

  // BILLING ADDRESS VARIABLES
let fullName2 = $("fullName2");
let state2 = $("state2");
let address1 = $("address1");
let address2 = $("address2");
let zip2 = $("zip2");
let city2 = $("city2");
let fullName2Error = $("fullName2Error");
let address1Error = $("address1Error");
let city2Error = $("city2Error");
let state2Error = $("state2Error");
let zip2Error = $("zip2Error");
let sameAsDeliveryInfo = $('sameAsDeliveryInfo');
console.log('same as delivery info; ', sameAsDeliveryInfo)

function buildBilling() {
  fullName2.addEventListener("blur", () => validateName(fullName2.value, billing=true));
  zip2.addEventListener("blur", () => validateZip(zip2.value, billing=true));
  state2.addEventListener("blur", () => validateState(state2.value, billing=true));
  city2.addEventListener("blur", () => validateCity(city2.value, billing=true));
  address1.addEventListener("blur", () => validateStreet(address1.value, billing=true));
  address2.addEventListener("blur", (e) => billingObj.address2 = e.target.value);
}

sameAsDeliveryInfo.addEventListener('click', function(e) {
    if(e.target.checked){
      console.log('checked')
      fullName2.value = contactObj.fullName;
      zip2.value = contactObj.zip;
      city2.value = contactObj.city;
      state2.value = contactObj.state;
      address1.value = contactObj.streetAddress;
      address2.value = contactObj.streetAddress2;
      // 
      // billingObj.fullName2 = contactObj.fullName;
      // billingObj.zip2 = contactObj.zip;
      // billingObj.city2 = contactObj.city;
      // billingObj.state2 = contactObj.state;
      // billingObj.address1 = contactObj.streetAddress;
      // billingObj.address2 = contactObj.streetAddress2;
      // DISABLE THE INPUT FIELD
      fullName2.disabled = true;
      zip2.disabled = true;
      city2.disabled = true;
      state2.disabled = true;
      address1.disabled = true;
      address2.disabled = true;
    }else {
     console.log('unchecked');
     console.log('billing obj: ', billingObj)
     fullName2.value = billingObj.fullName2;
     zip2.value = billingObj.zip2;
     city2.value = billingObj.city2;
     state2.value = billingObj.state2;
     address1.value = billingObj.address1;
     address2.value = billingObj.address2;
     // DISABLE THE INPUT FIELD
     fullName2.disabled = false;
     zip2.disabled = false;
     city2.disabled = false;
     state2.disabled = false;
     address1.disabled = false;
     address2.disabled = false;
    }
});

