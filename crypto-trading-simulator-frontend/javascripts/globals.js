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

function form() {
  return document.getElementById("user-form");
}

function userNav() {
  return document.getElementById("user-nav");
}

function userFormInput() {
  return document.getElementById("username");
}

function walletTable() {
  return document.getElementById("wallet-table");
}

function marketTable() {
  return document.getElementById("market-table");
}
