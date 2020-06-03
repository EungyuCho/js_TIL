

// BUDGET CONTROLLER
const budgetController = (function(){
    
    const Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);        
        } else{
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    const Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this. value = value;
    };

    const calculateTotal = function(type){
        let sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem: function(type, des, val) {
            let newItem, ID;

            //Create new ID
            if(data.allItems[type].length > 0){
                const itemLength = data.allItems[type].length;
                ID = data.allItems[type][itemLength -1].id + 1;
            }else{
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            console.log(newItem);

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        deleteItem: function(type, id){
            //  id = 3
            // data.allItems[type][id];
            //[1 2 4 6 8]
            let ids, index; 
            
            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }

        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentage: function(){
            let allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;
        },

        calculateBudget: function(){
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
        },

        getBudget: function(){
            return {
                budget : data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function(){
            console.log(data);
        }
    };

})();

const UIController = (function(){

    const DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    const formatNumber =  function(num, type){
        let numSplit, int ,dec;
        /*
        + or - before number
        exactly 2 mecimal points
        comma seperating the thousands
        
        2010.4567 -> + 2,310.46
        2000 -> + 2,000.00
         */

        num = Math.abs(num);
        num = num.toFixed(2);

        console.log(num)
        numSplit = num.split('.');
        int = numSplit[0];
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    
    const nodeListFOrEach = function(list, callback){
        for(let i = 0; i<list.length; i++){
            callback(list[i], i);                    
        }
    }

    return{
        getinput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function(obj, type){
            let html, newHTML, element;
            //Create HTML string with placeholder text
            
            if(type === 'inc'){
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                element = DOMStrings.incomeContainer;
            }else if(type === 'exp'){
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                element = DOMStrings.expensesContainer;
            }
            //Replace the placeholder text with some actual data
            newHTML = html.replace('%id%', obj.id)
            newHTML = newHTML.replace('%description%', obj.description)
            newHTML = newHTML.replace('%value', formatNumber(obj.value, type));
            //Insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        deleteListItem: function(selectorID){
            const el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function(){
            let fields;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            const fieldArr = Array.from(fields);
            fieldArr.forEach(function(current, index, array){
                current.value = "";
            });
            
            fieldArr[0].focus();
        },

        displayBudget: function(obj){
            let type;
            type = obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;

            if(obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },


        displayPercentages: function(percentages){
            const fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            nodeListFOrEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                }else{
                    current.textContent = '---';
                }
            });

        },

        displayMonth: function(){
            let now, year, month, months;

            months = ['January', 'Februray', 'March', 'April,', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            now = new Date();
            year = now.getFullYear();
            month = months[now.getMonth()];
            document.querySelector(DOMStrings.dateLabel).textContent = month + ' ' + year;
            
        },

        changeType: function(){
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue);

            nodeListFOrEach(fields, function(cur){
                cur.classList.add('red-focus');
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
        },

        getDOMstrings: function(){
            return DOMStrings;
        },


    }
})();

//GROBAL APP CONTROLLER    
const controller = (function(budgetController, UICtrl){

    const DOM = UIController.getDOMstrings();

    const setupEventListeners = function(){
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.querySelector(DOM.inputValue).addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UIController.changeType);
    }


    const updateBudget = function(){

        // 1. Calculate the budget
        budgetController.calculateBudget();
        // 2. return the budget
        const budget = budgetController.getBudget();
        // 3. Display the budget on the UI
        UIController.displayBudget(budget); 
    }

    const ctrlAddItem = function() {
        let input, newItem

        // 1. GET the field input data
        input = UIController.getinput();

        if(input.description !== "" && !isNaN(input.value)){
            // 2. ADD the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value); 
            // 3. ADD the item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. Clear the fields
            UICtrl.clearFields();
            // 5. Calculate and update budget
            updateBudget();
            // 6. Update percentages
            updatePercentages();
        }
    };

    const updatePercentages = function(){
        // 1. Calculate percentages
        budgetController.calculatePercentages();
        // 2. Read percentages from the budget controller
        const percentages = budgetController.getPercentage();
        // 3. Update to the UI with new percentages
        UIController.displayPercentages(percentages);
    };

    const ctrlDeleteItem = function(event){
        let splitID, type, ID;

        const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from thedata structure
            budgetController.deleteItem(type, ID);
            // 2. delete the item from the ui
            UIController.deleteListItem(itemID);
            // 3. update and show the new budget
            updateBudget();
        }
    }

    return {
        init: function(){
            console.log('Application has started.');
            UIController.displayMonth();
            UIController.displayBudget({
                budget : 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();