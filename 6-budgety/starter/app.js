 // BUDGET CONTROLLER
const budgetController = (function () {

    // Some code

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
        const input = UICtrl.getInput();
        console.log(input);
    };

    // 1. Get the field input data

    // 2. Add the item to the budget controller

    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI

    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();