// Access to Elements
let brand = document.getElementById("brand");
let model = document.getElementById("model");
let year = document.getElementById("year");
let form  = document.querySelector("form");
let operation = document.getElementById('operation');
let state = document.getElementById("state");
let factor = document.getElementById('factor');
let price = document.getElementById('price');
let error = document.getElementById('error');


//Define Class
class CarInfo {
    constructor(brand, model, year, operation, state) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.operation = operation;
        this.state = state;
    }
    
    CalculatePrice() {
        let factoryPrice = this.GetFactoryPrice();
        let pricePerYearBuilt = this.GetPricePerYearBuilt(factoryPrice);
        let pricePerOperation = this.GetPricePerOperation(pricePerYearBuilt);
        let price = this.GetPricePerBodyCondition(pricePerOperation);
        return price;
    }

    GetFactoryPrice() {
        switch (this.model) {
            case 'اپتیما':
                {
                    return 1830000000;
                }
            case 'اسپورتیج':
                {
                    return 1450000000;
                }
            case 'سراتو':
                {
                    return 1400000000;
                }
            case 'توسان':
                {
                    return 1600000000;
                }
            case 'سانتافه':
                {
                    return 2100000000;
                }
            case 'النترا':
                {
                    return 700000000;
                }
            case 'جک s5':
                {
                    return 750000000;
                }
            case 'جک s3':
                {
                    return 520000000;
                }
            case 'جک j4':
                {
                    return 410000000;
                }
        }
    }

    GetPricePerYearBuilt(factoryPrice) {
        let currentYear = new Date().getFullYear();
        let count = currentYear - this.year;
        if (count == 0) {
            return factoryPrice;
        }
        if (count == 1) {
            return factoryPrice - (factoryPrice * 12 / 100);
        }
        if (count == 2) {
            return factoryPrice - (factoryPrice * 17 / 100);
        }
        if (count == 3) {
            return factoryPrice - (factoryPrice * 23 / 100);
        }
        if (count >= 4) {
            return factoryPrice - (factoryPrice * 27 / 100);
        }
    }

    GetPricePerOperation(pricePerYearBuilt) {
        let currentYear = new Date().getFullYear();
        let count = currentYear - this.year;
        let standardOperation = count * 20000;
        if (this.operation == standardOperation) {
            return pricePerYearBuilt;
        }
        if (this.operation > standardOperation) {
            return pricePerYearBuilt - (pricePerYearBuilt * 3 / 100);
        }
        if (this.operation < standardOperation) {
            return pricePerYearBuilt + (pricePerYearBuilt * 3 / 100);
        }
    }

    GetPricePerBodyCondition(pricePerOperation) {
        switch (this.state) {
            case 0: {
                return pricePerOperation;
            }
            case 1: {
                return pricePerOperation - (pricePerOperation * 4 / 100);
            }
            case 2: {
                return pricePerOperation - (pricePerOperation * 9 / 100);
            }
            case 3: {
                return pricePerOperation - (pricePerOperation * 16 / 100);
            }
            case 4: {
                return pricePerOperation - (pricePerOperation * 25 / 100);
            }
        }
    }

}



// Event Listner
let ui = new UI();
brand.addEventListener("change",function(){
       ui.FillModels(brand.value);
});
document.addEventListener("DOMContentLoaded",function(){
    let date = new Date();
    let currentYear = date.getFullYear();
    for (let index = 0; index < 20; index++) {
        let option = document.createElement("option");
        option.value = index;
        option.innerHTML = currentYear - index;
        year.appendChild(option);
        
    }
});
form.addEventListener("submit",function(event){

    if (brand.value == '' || model.value == '' || year.value == '' || operation.value == '' || state.value == '') {
        error.innerText = 'پر کردن تمامی فیلدها الزامی است.';
    }
    else {
        error.innerText = '';
        let brandValue = brand.options[brand.selectedIndex].innerText;
        let modelValue = model.options[model.selectedIndex].innerText;
        let yearValue = Number(year.options[year.selectedIndex].innerText);
        let operationValue = Number(operation.value);
        let stateValue = Number(state.value);

        let objCar = new CarInfo(brandValue, modelValue, yearValue, operationValue, stateValue);
        price.innerText = objCar.CalculatePrice().toLocaleString();
        factor.style.display = 'block';
    }

    event.preventDefault();
});



// UI Constructor
function UI(){

};

UI.prototype.FillModels = function(value){

    switch(value){
        case '1':
            {
                let models = ['اپتیما', 'اسپورتیج', 'سراتو'];
                ui.CreationOption(models);
                break;
            }
        case '2':
            {
                let models = ['النترا', 'سانتافه', 'توسان'];
                ui.CreationOption(models);
                break;
            }
        case '3':
            {
                let models = ['جک s5', 'جک s3', 'جک j4'];
                ui.CreationOption(models);
                break;
            }
    }
};

UI.prototype.CreationOption = function(models){

    while(model.length > 1){
        model.lastChild.remove();
    }

    for (let index = 0; index < models.length; index++) {

        let option = document.createElement("option");
        option.value = index;
        option.innerHTML = models[index]; 
        model.appendChild(option);     
    }
};
