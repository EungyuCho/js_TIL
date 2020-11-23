 // BUDGET CONTROLLER
const budgetController = (function () {

    const Expense = function ({id, description, value}) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function ({id, description, value}) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: ({type, des, val}) => {
            let newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else
                ID = 0;

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem  = new Expense({id: ID, description: des, value: val});
            } else if (type === 'inc') {
                newItem = new Income({id: ID, description: des, value: val});
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        }
    }
})();

const UIController = (function () {

    const DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },

        getDOMStrings: () => {
            return DOMStrings;
        }
    }
})();


const controller = (function (budgetCtrl, UICtrl) {

    const setupEventListeners = () => {

        const DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress',  async e => {
            if (e.code === 'Enter') {
                ctrlAddItem();
            }
        });

    }


    const ctrlAddItem = () => {

        // 1. Get the field input data
        const input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        const newItem = budgetCtrl.addItem({type: input.type, des: input.description, val: input.value});

        console.log(newItem);
        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
    };


    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();