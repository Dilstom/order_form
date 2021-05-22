const $ = (id) => document.getElementById(id);

/* 
    ******  DELIVERY LOCATION *******
*/
// VARIABLES I
let fullName = $('fullName');
let zip = $('zip');
let phone = $('phone');
let email = $('email');
let state = $('state');
let dropdown = document.querySelector(".dropdown-menu a");
let otherInput = document.querySelector(".hidden");
let e = document.querySelector(".dropdown-menu");

// VALIDATORS   
function validateName(fullName){
    let regCheck = /^[a-z ,.'-]+$/i;
    fullName = fullName.trim();
    if(regCheck.test(fullName)){
        console.log('pass')
    }else{
        console.log('fail')
    }
    console.log('full name in validate; ', fullName);
};

function validateZip(zip){
    let regCheck = /^\d{5}(?:[-\s]\d{4})?$/;
    zip = zip.trim();
    if(regCheck.test(zip)){
        console.log('Z pass')
    }else{
        console.log('Z fail')
    }
    console.log('zip in validate; ', zip);
} 

function validatePhone(phone){
    let regCheck = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    phone = phone.trim();
    if(regCheck.test(phone)){
        console.log('phone pass')
    }else{
        console.log('phone fail')
    }
    console.log('phone in validate; ', phone);
} 

function validateEmail(email) {
    const regCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());

    if(regCheck.test(String(email).trim().toLowerCase())){
        console.log('email pass')
    }else{
        console.log('email fail')
    }
    console.log('email in validate; ', email);
} 

function validateState(state) {
    const regCheck = /^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/;
    // const regCheck = /\b[A-Z]{2}\b/;
    // return re.test(String(state).toLowerCase());
    state = state.trim().toUpperCase();

    if(regCheck.test(String(state))){
        console.log('state pass')
    }else{
        console.log('state fail')
    }
    console.log('state in validate; ', state);
} 

// TOGGLE 'HIDDEN' CLASS WHEN ADDRESS TYPE IS 'OTHER'
e.addEventListener("click", function () {
    let chosenOption = document.querySelector(
      ".btn#dropdownMenuButtonAddressType:first-child"
    ).innerHTML;
    console.log("chosenJ: ", chosenOption);
    if (chosenOption === "Other") {
        console.log('this: ', this)
        otherInput.classList.remove('hidden');
    } else {
        if(!otherInput.classList.contains('hidden')){
            otherInput.classList.add('hidden');
        }
    }
  });

fullName.addEventListener('blur', () => validateName(fullName.value));
zip.addEventListener('blur', () => validateZip(zip.value));
phone.addEventListener('blur', () => validatePhone(phone.value));
email.addEventListener('blur', () => validateEmail(email.value));
state.addEventListener('blur', () => validateState(state.value));

/* 
    ******  BUILD ORDER *******
*/

const pizzaSize  = {
    option1: {
        Small: 9.99,
        Medium: 12.99,
        Large: 14.99
    },
    option2: {
        Medium: 11.99,
        Large: 13.99
    },
    option3: {
        Large: 16.99,
        "Extra Large": 19.99
    },
    option4: {
        Small: 10.99
    },   
}

// VARIABLES II
let selectSizeDiv = $('selectSizeDiv');
let option1 = $('option1');
let option2 = $('option2');
let option3 = $('option3');
let option4 = $('option4');
let divRadioBtn = document.querySelector('radioBtn');

divRadioBtn.addEventListener('click', () => {
    console.log('hi')
})


