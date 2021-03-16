/** Global Variables **/

let cryptos = [];

/** Formatters **/

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Node Getters **/

function userMain() {
  return document.getElementById("user-main");
}

function marketMain() {
  return document.getElementById("market-main");
}

function userForm() {
  return document.getElementById("user-form");
}

function userNav() {
  return document.getElementById("user-nav");
}

function userFormInput() {
  return document.getElementById("username");
}

function buyForm(coin) {
  return document.getElementById(`${coin}-buy-form`);
}

function sellForm(coin) {
  return document.getElementById(`${coin}-sell-form`);
}

function buyQty(coin) {
  return document.getElementById(`${coin}-buy-qty`);
}

function sellQty(coin) {
  return document.getElementById(`${coin}-sell-qty`);
}

function walletTable() {
  return document.getElementById("wallet-table");
}

function marketTable() {
  return document.getElementById("market-table");
}
