const $ = (id) => document.getElementById(id);

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
    selectedCheese: '',
    priceCheese: 0,
    selectedSauce: '',
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


// MAIN FUNCTIONS
  function init() {
      let divRadioBtn = document.querySelectorAll(".radioBtn input");

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
    let checkboxes = document.querySelectorAll('.toppingOption input[type=checkbox]').forEach(checkbox => checkbox.addEventListener('click', e=> toppingCheckboxes(e)));
}

function toppingCheckboxes(e) {
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

  

  init();