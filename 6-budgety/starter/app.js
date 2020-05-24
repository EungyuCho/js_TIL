

function applicationInit(){
    // BUDGET CONTROLLER
    const budgetController = (function(){
        
        const Expense = function(id, description, value, ){
            this.id = id;
            this.description = description;
            this. value = value;
        };

        const Income = function(id, description, value){
            this.id = id;
            this.description = description;
            this. value = value;
        };

        const allExpenses = [];
        const allIncomes = [];
        let totalExpenses = 0;

        const data = {
            allItems: {
                exp: [],
                inc: []
            },
            totals: {
                exp: 0,
                inc: 0
            }
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

                // Push it into our data structure
                data.allItems[type].push(newItem);

                // Return the new element
                return newItem;
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
            expensesContainer: '.expenses__list'
        };

        return{
            getinput: function(){
                return{
                    type: document.querySelector(DOMStrings.inputType).value,
                    description: document.querySelector(DOMStrings.inputDescription).value,
                    value: document.querySelector(DOMStrings.inputValue).value
                };
            },

            addListItem: function(obj, type){
                let html, newHTML, element;
                //Create HTML string with placeholder text
                
                if(type === 'inc'){
                    html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                    element = DOMStrings.incomeContainer;
                }else if(type === 'exp'){
                    html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                    element = DOMStrings.expensesContainer;
                }
                //Replace the placeholder text with some actual data
                newHTML = html.replace('%id%', obj.id).replace('%description%', obj.description).replace('%value', obj.value);
                //Insert the HTML into DOM
                document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
            },

            clearFields: function(){
                let fields, fieldsArr;

                fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

                fieldsArr = Array.prototype.slice.call(fields);

                fieldsArr.foreach(function(current, index, array){
                    current.value = "";
                    
                });
            },

            getDOMstrings: function(){
                return DOMStrings;
            },


        }
    })();

    //GROBAL APP CONTROLLER    
    const controller = (function(budgetController, UICtrl){

        const setupEventListeners = function(){
            document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

            document.querySelector(DOM.inputValue).addEventListener('keypress', function(event){
                if(event.keyCode === 13 || event.which === 13){
                    ctrlAddItem();
                }
                
            });
        }

        const DOM = UIController.getDOMstrings();

        const ctrlAddItem = function() {
            let input, newItem

            // 1. GET the field input data
            input = UIController.getinput();
            // 2. ADD the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value); 
            // 3. ADD the item to the UI
            UICtrl.addListItem(newItem, input.type)
            // 4. Calculate the budget

            // 5. Display the budget on the UI
        }

        
        return {
            init: function(){
                console.log('Application has started.');
                setupEventListeners();
            }
        }
    })(budgetController, UIController);

    controller.init();
}

applicationInit();

