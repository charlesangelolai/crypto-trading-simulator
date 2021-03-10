/** Global Variables **/

let cryptos = [];

/** Formatters **/

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Node Getters **/

function main() {
  return document.getElementById("main");
}

function userForm() {
  return document.getElementById("user-form");
}

function walletTable() {
  return document.getElementById("wallet-table");
}

function marketTable() {
  return document.getElementById("market-table");
}
