class Coin {
  static all = [];

  /** Fetches **/

  static getCoins() {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        console.log("Fetching data...");
        console.log(data);
        Coin.renderCoins(data);
        Coin.all = data;
      });
  }

  /** Templates **/
  static marketTableTemplate() {
    return `
      <h4 class="pt-3">Market Table</h4>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coin</th>
            <th scope="col">Symbol</th>
            <th scope="col">Price</th>
            <th scope="col">1h</th>
            <th scope="col">High (24h)</th>
            <th scope="col">Low (24h)</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="market-table"></tbody>
      </table>
    `;
  }

  /** Renders **/

  static renderMarketTable() {
    resetMain();
    main().innerHTML = Coin.marketTableTemplate();
  }

  static renderCoin(crypto) {
    let tr = document.createElement("tr");

    let th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerHTML = crypto.market_cap_rank;

    let logo = document.createElement("img");
    logo.setAttribute("id", "logo");
    logo.src = crypto.image;

    let coin = document.createElement("td");
    coin.appendChild(logo);
    coin.innerHTML += crypto.name;

    let sym = document.createElement("td");
    sym.innerHTML = crypto.symbol.toUpperCase();

    let price = document.createElement("td");
    price.innerHTML = `$${numberWithCommas(crypto.current_price.toFixed(2))}`;

    let hChange = document.createElement("td");
    hChange.innerHTML = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
    crypto.price_change_percentage_24h > 0.0
      ? (hChange.style.color = "green")
      : (hChange.style.color = "red");

    let high = document.createElement("td");
    high.innerHTML = `$${numberWithCommas(crypto.high_24h.toFixed(2))}`;

    let low = document.createElement("td");
    low.innerHTML = `$${numberWithCommas(crypto.low_24h.toFixed(2))}`;

    let action = document.createElement("td");
    let buy = document.createElement("a");
    buy.setAttribute("class", "btn btn-primary btn-sm");
    buy.style.padding = "6px 12px";
    buy.innerText = "Buy";
    buy.addEventListener("click", function (e) {
      console.log(crypto);
    });
    action.appendChild(buy);

    tr.appendChild(th);
    tr.appendChild(coin);
    tr.appendChild(sym);
    tr.appendChild(price);
    tr.appendChild(hChange);
    tr.appendChild(high);
    tr.appendChild(low);
    tr.appendChild(action);
    marketTable().appendChild(tr);
  }

  static renderCoins(coins) {
    resetMarketTable();

    coins.forEach(function (coin) {
      Coin.renderCoin(coin);
    });
  }

  static updateCoins() {
    setInterval(Coin.getCoins, 1000);
  }
}
