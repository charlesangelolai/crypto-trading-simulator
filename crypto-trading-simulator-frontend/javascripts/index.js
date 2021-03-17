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
  User.renderUserForm();
  Coin.renderMarketTable();
}

document.addEventListener("DOMContentLoaded", function () {
  renderPage();
  Coin.getCoins();
  User.getUsers();
  Trade.getTrades();
  Coin.updateCoins();
});
