function resetMain() {
  main().innerHTML = "";
}

function resetWalletTable() {
  walletTable().innerHTML = "";
}

function resetMarketTable() {
  marketTable().innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
  Coin.renderMarketTable();
  Coin.getCoins();
  Coin.updateCoins();
});
