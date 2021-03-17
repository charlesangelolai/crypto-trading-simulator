class Coin {
  static all = [];
  static state;

  /** Fetches **/

  static async getCoins() {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    const data = await resp.json();

    console.log("Fetching data...");
    Coin.all = data;

    inputSearch().length > 0
      ? Coin.renderCoins(Coin.all)
      : Coin.renderCoins(Coin.inputFilter());
  }

  /** Templates **/
  static marketTableTemplate() {
    let hDiv = document.createElement("div");
    hDiv.setAttribute("class", "row justify-content-between pt-3 pb-3");

    let hCol = document.createElement("div");
    hCol.setAttribute("class", "col-4");
    let sCol = document.createElement("div");
    sCol.setAttribute("class", "col-4");

    let search = document.createElement("input");
    search.setAttribute("placeholder", "Search Coin");
    search.setAttribute("id", "search");
    search.setAttribute("class", "form-control");
    search.addEventListener("keyup", Coin.inputFilter);

    let h4 = document.createElement("h4");
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

    hCol.appendChild(h4);
    sCol.appendChild(search);
    hDiv.appendChild(hCol);
    hDiv.appendChild(sCol);

    marketMain().appendChild(hDiv);
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

      let form = document.createElement("form");
      form.setAttribute("class", "d-flex");
      form.setAttribute("id", `${crypto.id}-buy-form`);
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        Trade.buy(User.current_user, crypto, buyQty(crypto.id).value);
        buyForm(crypto.id).reset();
      });

      let input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("class", "form-control me-2");
      input.setAttribute("name", "qty");
      input.setAttribute("id", `${crypto.id}-buy-qty`);
      input.setAttribute("placeholder", "Qty");
      input.addEventListener("focus", function () {
        clearInterval(Coin.state);
      });
      input.addEventListener("blur", function () {
        Coin.updateCoins();
      });

      let btn = document.createElement("button");
      btn.setAttribute("type", "submit");
      btn.setAttribute("class", "btn btn-sm btn-success");
      btn.innerText = "Buy";

      form.appendChild(input);
      form.appendChild(btn);

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
    Coin.state = setInterval(Coin.getCoins, 1000);
  }

  static inputFilter() {
    const query = inputSearch().value;
    return Coin.all.filter((c) => c.id.includes(query));
  }
}
