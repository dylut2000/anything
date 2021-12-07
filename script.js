let detail;
let amount;

// holds all transactions
let transactions = [];

// get values from inputs
function getInputValues() {
  detail = document.getElementById("detail").value;
  amount = Number(document.getElementById("amount").value);

}

// validate inputs
function isValid() {
  if (!detail || !amount) {
    alert("Detail and Amount are both required");
    return false;
  }
  return true;
}

// populate the table
function displayTable() {
  const tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";

  for (let i = 0; i < transactions.length; i++) {
    tableBody.innerHTML += `
        <tr>
                <th>${transactions[i].type}</th>
                <th>${transactions[i].detail}</th>
                <th>${transactions[i].amount}</th>
            </tr>
        `;
  }
}


function getResults () {
    const incomeTotal = document.getElementById("incomeTotal");
    const expenseTotal = document.getElementById("expenseTotal");
    const amountTotal = document.getElementById("amountTotal");

    let income = 0;
    let expense = 0;
    let amount = 0;

    

   for (let i = 0; i < transactions.length; i++) {

    if (transactions[i].type === "Income") {
        income += transactions[i].amount;
    }

    if (transactions[i].type === "Expense") {
        expense += transactions[i].amount;
    }
       
   }

   incomeTotal.innerHTML = income;
   expenseTotal.innerHTML = expense;
   amountTotal.innerHTML = income - expense;
}

function calc(type) {
  getInputValues();

  if (!isValid()) return;


  // TODO add array to local storage
  
  transactions.push({ type, detail, amount });

  // console.log(transactions);

  getResults();
  displayTable();
  clearInput();
  store();
  getLocalStorage();
}

const clearInput = () => {
  document.getElementById("detail").value = "";
  document.getElementById("amount").value = "";
}

const reset = () => {
  document.getElementById("detail").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("tableBody").innerHTML = "";

  localStorage.clear();

  transactions = [];

  document.getElementById("incomeTotal").innerHTML = "R0";
  document.getElementById("expenseTotal").innerHTML = "R0";
  document.getElementById("amountTotal").innerHTML = "R0";

}

function store () {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  /* localStorage.setItem("detail", detail);
  localStorage.setItem("amount", amount); */
}

const getLocalStorage = () => {
  if(localStorage.getItem("transactions") === null);
    localStorage.getItem("transactions", JSON.stringify([]));

  let localData = JSON.parse(localStorage.getItem("transactions"));

  // returns array of localStorage data
  return localData;
}


window.addEventListener("load", () =>{

   if(transactions.length === 0) {
     transactions.push(...getLocalStorage());
   }

  getResults();
  displayTable();
    
});


