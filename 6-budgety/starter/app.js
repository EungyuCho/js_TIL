 // BUDGET CONTROLLER
const budgetController = (function () {

    const Expense = function ({id, description, value}) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentages = function (totalIncome) {
        if (totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome) * 100);
    };

    Expense.prototype.getPercentage= function () {
        return this.percentage;
    };

    const Income = function ({id, description, value}) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = (type) => {
        let sum = 0;
        data.allItems[type].forEach((el) => {
            sum += el.value;
        });

        data.totals[type] = sum;
    }

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
        },

        deleteItem: (type, id) => {
            const ids = data.allItems[type].map((current) => {
                return current.id;
            });

            const index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: () => {

            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // Calculate the budget: income - expenses

            data.budget = data.totals.inc - data.totals.exp;
            // Calculate the percentage of income that we spent

            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        },

        calculatePercentages: () => {
            data.allItems.exp.forEach((cur) => {
                cur.calculatePercentages(data.totals.inc);
            });
        },

        getPercentage: () => {
            const allPercentage = data.allItems.exp.map((cur) => {
                return cur.getPercentage();
            });

            return allPercentage;
        },

        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: () => {
            return data;
        }
    }
})();

const UIController = (function () {

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

    const formatNumber =  (num, type) => {
        let numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];

        dec = numSplit[1];

        if (int.length > 3)
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    const nodeListForEach = (list, callback) => {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: (obj, type) => {
            let html, newHtml, element;
            // Create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html =  `<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`

            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: (selectorID) => {
            const el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: () => {
            const fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fields.forEach((el) => el.value = '');
            fields[0].focus();
        },

        displayBudget: (obj) => {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0)
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            else
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';

        },

        displayPercentages: percentages => {

            const fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            nodeListForEach(fields, (current, index) => {
                if(percentages[index] > 0)
                    current.textContent = percentages[index] + '%';
                else
                    current.textContent = '---';
            });
        },

        displayMonth: () => {
            let year, month, months;

            const now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            year = now.getFullYear();
            month = now.getMonth();

            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;

        },

        changedType: () => {

            const fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );

            nodeListForEach(fields, cur => {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    }

    const updateBudget = () => {

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        const budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    }

    const updatePercentages = () => {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. Read percentages from the budget controller
        const percentages = budgetCtrl.getPercentage();
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    }

    const ctrlAddItem = () => {

        // 1. Get the field input data
        const input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            const newItem = budgetCtrl.addItem({type: input.type, des: input.description, val: input.value});

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }
    };

    const ctrlDeleteItem = (event) => {
        let itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }
    }


    return {
        init: () => {
            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                    totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();