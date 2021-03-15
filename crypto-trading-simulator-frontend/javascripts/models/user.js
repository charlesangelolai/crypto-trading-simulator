class User {
  static all = [];
  static current_user = null;
  static state = [];

  constructor(attr) {
    this.id = attr.id;
    this.username = attr.username;
    this.buying_power = attr.buying_power;
    this.wallet_value = attr.wallet_value;
  }

  save() {
    User.all.push(this);
  }

  static logout() {
    clearInterval(User.state);
    User.current_user = null;
    resetUserNav();
    resetUserMain();
    resetMarketMain();
    User.renderUserForm();
    User.getUsers();
    Coin.renderMarketTable();
    Coin.getCoins();
  }

  static create(attr) {
    let user = new User(attr);
    user.save();
    return user;
  }

  static createFromCollection(collection) {
    collection.forEach((data) => User.create(data.attributes));
  }

  static getWallet() {
    User.renderUserCoins(
      Trade.all.filter((t) => t.user_id === User.current_user.id)
    );
    console.log("updating wallet...");
  }

  /** Templates **/

  static userFormTemplate() {
    let form = document.createElement("form");
    form.setAttribute("class", "d-flex");
    form.setAttribute("id", "user-form");
    form.addEventListener("submit", User.submitForm);

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control me-2");
    input.setAttribute("name", "username");
    input.setAttribute("id", "username");
    input.setAttribute("placeholder", "Username");

    let btn = document.createElement("button");
    btn.innerText = "Login";
    btn.setAttribute("type", "submit");
    btn.setAttribute("class", "btn btn-sm btn-success");

    form.appendChild(input);
    form.appendChild(btn);

    userNav().appendChild(form);
  }

  static userInfoTemplate() {
    let uSpan = document.createElement("span");
    let usr = document.createElement("span");

    uSpan.setAttribute("class", "navbar-text me-3");
    uSpan.innerHTML = "Username: ";
    usr.innerText = User.current_user.username;
    usr.style = "color: white";

    let bpSpan = document.createElement("span");
    let bp = document.createElement("span");

    bpSpan.setAttribute("class", "navbar-text me-3");
    bpSpan.innerHTML = "Buying Power: ";
    bp.innerText = `$${numberWithCommas(
      parseFloat(User.current_user.buying_power).toFixed(2)
    )}`;
    bp.style = "color: white";

    let wv = document.createElement("span");
    wv.innerText = `$${numberWithCommas(
      parseFloat(User.current_user.wallet_value).toFixed(2)
    )}`;
    wv.style = "color: white";

    let wvSpan = document.createElement("span");
    wvSpan.setAttribute("class", "navbar-text me-3");
    wvSpan.innerHTML = "Wallet Value: ";

    let l = document.createElement("button");
    l.innerHTML = "Logout";
    l.setAttribute("type", "submit");
    l.setAttribute("class", "btn btn-sm btn-success");
    l.addEventListener("click", User.logout);

    uSpan.appendChild(usr);
    bpSpan.appendChild(bp);
    wvSpan.appendChild(wv);

    userNav().appendChild(uSpan);
    userNav().appendChild(bpSpan);
    userNav().appendChild(wvSpan);
    userNav().appendChild(l);
  }

  static walletTableTemplate() {
    return `
      <h4 class="pt-4">CTS Wallet</h4>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Coin</th>
            <th scope="col">Symbol</th>
            <th scope="col">Qty</th>
            <th scope="col">Cost</th>
            <th scope="col">Current Value</th>
            <th scope="col">Return</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="wallet-table"></tbody>
      </table>
    `;
  }

  /** Fetches **/

  static async getUserInfo(id) {
    const data = await Api.get(`/users/${id}`);
    // add render
    debugger;
  }

  static async getUsers() {
    const users = await Api.get("/users");
    User.all = [];
    User.createFromCollection(users.data);
  }

  static submitForm(e) {
    e.preventDefault();

    let usr = User.all.find((u) => u.username === userFormInput().value);

    if (usr) {
      User.current_user = usr;
      User.renderUserInfo();
      Coin.renderMarketTable();
      User.getWallet();
      Coin.getCoins();
    } else {
      let strongParams = {
        user: {
          username: userFormInput().value,
        },
      };

      Api.post("/users", strongParams).then(function (user) {
        User.create(user.data.attributes);
        User.current_user = user.data.attributes;
        User.renderUserInfo();
        User.getWallet();
        Coin.renderMarketTable();
        Coin.getCoins();
      });
    }

    User.updateWallet();
  }

  /** Renders **/

  static renderUserForm() {
    resetUserNav();
    User.userFormTemplate();
  }

  static renderUserInfo() {
    resetUserNav();
    resetUserMain();
    User.userInfoTemplate();
  }

  static renderUserCoin(crypto) {
    let tr = document.createElement("tr");

    let logo = document.createElement("img");
    logo.setAttribute("id", "logo");
    logo.src = crypto.logo;

    let coin = document.createElement("th");
    coin.setAttribute("scope", "row");
    coin.appendChild(logo);
    coin.innerHTML += crypto.coin_id;

    let sym = document.createElement("td");
    sym.innerHTML = crypto.sym.toUpperCase();

    let qty = document.createElement("td");
    qty.innerHTML = crypto.qty;

    let cost = document.createElement("td");
    cost.innerHTML = `$${crypto.cost.toFixed(2)}`;

    let val = document.createElement("td");
    let current_val =
      Coin.all.find((c) => c.id === crypto.coin_id).current_price * crypto.qty;
    val.innerHTML = `$${current_val.toFixed(2)}`;

    let r = document.createElement("td");
    let r_val = current_val - crypto.cost;
    r.innerHTML = `$${r_val.toFixed(2)}`;

    if (r_val > 0.0) {
      r.style.color = "green";
    }

    if (r_val < 0.0) {
      r.style.color = "red";
    }

    let action = document.createElement("td");
    let form = document.createElement("form");
    form.setAttribute("class", "d-flex");
    form.setAttribute("id", "sell-form");
    // form.addEventListener("submit", function (e) {
    //   e.preventDefault();

    //   Trade.buy(User.current_user, crypto, sellQty(crypto.id).value);
    //   // console.log(sellQty(crypto.id).value);
    //   // console.log(crypto.id);
    //   // console.log(crypto.current_price);
    //   //
    // });

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("class", "form-control me-2");
    input.setAttribute("name", "qty");
    input.setAttribute("id", `${crypto.coin_id}-qty`);
    input.setAttribute("placeholder", "Qty");
    input.addEventListener("focus", function () {
      clearInterval(User.state);
    });
    input.addEventListener("blur", function () {
      User.updateWallet();
    });

    let btn = document.createElement("button");
    btn.setAttribute("type", "submit");
    btn.setAttribute("class", "btn btn-sm btn-success");
    btn.innerText = "Sell";

    form.appendChild(input);
    form.appendChild(btn);

    // userNav().appendChild(form);

    action.appendChild(form);

    tr.appendChild(coin);
    tr.appendChild(sym);
    tr.appendChild(qty);
    tr.appendChild(cost);
    tr.appendChild(val);
    tr.appendChild(r);
    tr.appendChild(action);

    walletTable().appendChild(tr);
  }

  static renderUserWallet() {
    userMain().innerHTML = User.walletTableTemplate();
  }

  static renderUserCoins(coins) {
    resetUserMain();
    User.renderUserWallet();

    coins.forEach(function (coin) {
      User.renderUserCoin(coin);
    });
  }

  static updateWallet() {
    User.state = setInterval(User.getWallet, 1000);
  }
}
