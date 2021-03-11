function resetMain() {
  main().innerHTML = "";
}

function resetWalletTable() {
  walletTable().innerHTML = "";
}

function resetMarketTable() {
  marketTable().innerHTML = "";
}

function renderPage() {
  resetMain();

  User.renderUserForm();
  Coin.renderMarketTable();
}

document.addEventListener("DOMContentLoaded", function () {
  renderPage();
  Coin.getCoins();
  // Coin.updateCoins();
});
