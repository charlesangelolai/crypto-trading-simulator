function resetUserMain() {
  userMain().innerHTML = "";
}

function resetUserNav() {
  userNav().innerHTML = "";
}

function resetMarketMain() {
  marketMain().innerHTML = "";
}

function resetWalletTable() {
  walletTable().innerHTML = "";
}

function resetMarketTable() {
  marketTable().innerHTML = "";
}

function renderPage() {
  // resetMain();

  User.renderUserForm();
  Coin.renderMarketTable();
  // form().addEventListener("submit", User.submitForm);
}

document.addEventListener("DOMContentLoaded", function () {
  renderPage();
  Coin.getCoins();
  User.getUsers();
  Trade.getTrades();
  // Coin.updateCoins();
});
