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
        Coin.renderCoins(data);
        Coin.all = data;
      });
  }

  /** Templates **/
  static marketTableTemplate() {
    // return `
    //   <h4 class="pt-3">Market Table</h4>
    //   <table class="table table-hover">
    //     <thead>
    //       <tr>
    //         <th scope="col">#</th>
    //         <th scope="col">Coin</th>
    //         <th scope="col">Symbol</th>
    //         <th scope="col">Price</th>
    //         <th scope="col">1h</th>
    //         <th scope="col">High (24h)</th>
    //         <th scope="col">Low (24h)</th>
    //         <th scope="col">Action</th>
    //       </tr>
    //     </thead>
    //     <tbody id="market-table"></tbody>
    //   </table>
    // `;

    let h4 = document.createElement("h4");
    h4.setAttribute("class", "pt-3");
    h4.innerText = "Market Table";

    let table = document.createElement("table");
    table.setAttribute("class", "table table-hover");

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let id = document.createElement("th");
    let coin = document.createElement("th");
    let sym = document.createElement("th");
    let price = document.createElement("th");
    let hChange = document.createElement("th");
    let high = document.createElement("th");
    let low = document.createElement("th");

    id.setAttribute("scope", "col");
    coin.setAttribute("scope", "col");
    sym.setAttribute("scope", "col");
    price.setAttribute("scope", "col");
    hChange.setAttribute("scope", "col");
    high.setAttribute("scope", "col");
    low.setAttribute("scope", "col");

    id.innerText = "#";
    coin.innerText = "Coin";
    sym.innerText = "Symbol";
    price.innerText = "Price";
    hChange.innerText = "1h";
    high.innerText = "High (24h)";
    low.innerText = "Low (24h)";

    tr.appendChild(id);
    tr.appendChild(coin);
    tr.appendChild(sym);
    tr.appendChild(price);
    tr.appendChild(hChange);
    tr.appendChild(high);
    tr.appendChild(low);

    if (User.current_user) {
      let action = document.createElement("th");
      action.setAttribute("scope", "col");
      action.innerText = "Action";
      tr.appendChild(action);
    }

    let tbody = document.createElement("tbody");
    tbody.setAttribute("id", "market-table");

    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);

    marketMain().appendChild(h4);
    marketMain().appendChild(table);
  }

  /** Renders **/

  static renderMarketTable() {
    resetMarketMain();
    Coin.marketTableTemplate();
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

    tr.appendChild(th);
    tr.appendChild(coin);
    tr.appendChild(sym);
    tr.appendChild(price);
    tr.appendChild(hChange);
    tr.appendChild(high);
    tr.appendChild(low);

    if (User.current_user) {
      let action = document.createElement("td");
      // action.style = "width: 25%";
      // let buy = document.createElement("a");
      // buy.setAttribute("class", "btn btn-primary btn-sm");
      // buy.style.padding = "6px 12px";
      // buy.innerText = "Buy";
      // buy.addEventListener("click", function (e) {
      //   console.log(crypto);
      // });

      let form = document.createElement("form");
      form.setAttribute("class", "d-flex");
      form.setAttribute("id", "buy-form");
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        Trade.buy(User.current_user, crypto, buyQty(crypto.id).value);
        // console.log(buyQty(crypto.id).value);
        // console.log(crypto.id);
        // console.log(crypto.current_price);
        // debugger;
      });

      let input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("class", "form-control me-2");
      input.setAttribute("name", "qty");
      input.setAttribute("id", `${crypto.id}-qty`);
      input.setAttribute("placeholder", "Qty");

      let btn = document.createElement("button");
      btn.setAttribute("type", "submit");
      btn.setAttribute("class", "btn btn-sm btn-success");
      btn.innerText = "Buy";

      form.appendChild(input);
      form.appendChild(btn);

      // userNav().appendChild(form);

      action.appendChild(form);
      tr.appendChild(action);
    }

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
