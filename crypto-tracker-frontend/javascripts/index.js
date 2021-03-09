let cryptos = [];

// api

function getCrypto() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      renderCoins(data);
    });
}

// dom manipulation

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function tBody() {
  return document.getElementById("tbody");
}

function resetTable() {
  tbody.innerHTML = "";
}

function renderCoin(crypto) {
  //   let tHead = document.createElement("thead");
  //   let hRow = document.createElement("row");
  //   let id = document.createElement("th");
  //   let coin = document.createElement("th");
  //   let sym = document.createElement("th");
  //   let price = document.createElement("th");
  //   let hChange = document.createElement("th");
  //   let high = document.createElement("th");
  //   let low = document.createElement("th");
  //   let tBody = document.createElement("tbody");
  //   let bRow = document.createElement("row");
  //   let tId = document.createElement("th");
  //   let td = document.createElement("td");

  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let logo = document.createElement("img");
  let coin = document.createElement("td");
  let sym = document.createElement("td");
  let price = document.createElement("td");
  let hChange = document.createElement("td");
  let high = document.createElement("td");
  let low = document.createElement("td");

  logo.setAttribute("id", "logo");
  logo.src = crypto.image;
  coin.appendChild(logo);

  th.setAttribute("scope", "row");
  th.innerHTML = crypto.market_cap_rank;
  coin.innerHTML += crypto.name;
  sym.innerHTML = crypto.symbol.toUpperCase();
  price.innerHTML = `$${numberWithCommas(crypto.current_price.toFixed(2))}`;
  hChange.innerHTML = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
  high.innerHTML = `$${numberWithCommas(crypto.high_24h.toFixed(2))}`;
  low.innerHTML = `$${numberWithCommas(crypto.low_24h.toFixed(2))}`;

  tr.appendChild(th);
  tr.appendChild(coin);
  tr.appendChild(sym);
  tr.appendChild(price);
  tr.appendChild(hChange);
  tr.appendChild(high);
  tr.appendChild(low);
  tBody().appendChild(tr);
}

function renderCoins(coins) {
  resetTable();

  coins.forEach(function (coin) {
    renderCoin(coin);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getCrypto();
});
