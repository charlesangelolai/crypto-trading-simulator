class User {
  static all = [];
  static current_user;

  constructor(attr) {
    this.username = username;
  }

  save() {
    User.all.push(this);
  }

  logout() {}

  static create(attr) {
    let user = new User(attr);
    user.save();
    return user;
  }

  static createFromCollection(collection) {
    collection.forEach((data) => User.create(data));
  }

  /** Templates **/

  // static userFormTemplate() {
  //   // return `
  //   //   <div class="row">
  //   //     <div class="col-6">
  //   //       <form class="pt-3" id="user-form">
  //   //         <div class="mb-3">
  //   //           <label for="username" class="form-label">Username</label>
  //   //           <input type="text" class="form-control" name="username" id="username" />
  //   //         </div>
  //   //         <button type="submit" class="btn btn-sm btn-primary" >Submit</button>
  //   //       </form>
  //   //     </div>
  //   //   </div>
  //   // `;
  //   let row = document.createElement("div");
  //   row.className = "row";

  //   let col = document.createElement("div");
  //   col.className = "col-6";

  //   let form = document.createElement("form");
  //   form.className = "pt-3";
  //   form.id = "user-form";
  //   form.addEventListener("submit", User.submitForm);

  //   let label = document.createElement("label");
  //   label.className = "form-label";
  //   label.setAttribute("for", "username");
  //   label.innerText = "Username";

  //   let input = document.createElement("input");
  //   input.setAttribute("type", "text");
  //   input.setAttribute("name", "username");
  //   input.setAttribute("id", "username");
  //   input.className = "form-control";

  //   let btn = document.createElement("button");
  //   btn.setAttribute("type", "submit");
  //   btn.className = "btn btn-sm btn-primary mt-3";
  //   btn.innerText = "Submit";

  //   form.appendChild(label);
  //   form.appendChild(input);
  //   form.appendChild(btn);

  //   col.appendChild(form);
  //   row.appendChild(col);

  //   userMain().appendChild(row);
  // }

  static userInfoTemplate() {
    let uSpan = document.createElement("span");
    let bpSpan = document.createElement("span");
    let wvSpan = document.createElement("span");

    uSpan.setAttribute("class", "navbar-text me-3");
    uSpan.innerHTML = "Username: ";

    bpSpan.setAttribute("class", "navbar-text me-3");
    bpSpan.innerHTML = "Buying Power: ";

    wvSpan.setAttribute("class", "navbar-text me-3");
    wvSpan.innerHTML = "Wallet Value: ";

    let usr = document.createElement("span");
    usr.innerText = User.current_user.username;
    usr.style = "color: white";

    let bp = document.createElement("span");
    bp.innerText = `$${numberWithCommas(
      parseFloat(User.current_user.buying_power).toFixed(2)
    )}`;
    bp.style = "color: white";

    let wv = document.createElement("span");
    wv.innerText = `$${numberWithCommas(
      parseFloat(User.current_user.wallet_value).toFixed(2)
    )}`;
    wv.style = "color: white";

    uSpan.appendChild(usr);
    bpSpan.appendChild(bp);
    wvSpan.appendChild(wv);

    userNav().appendChild(uSpan);
    userNav().appendChild(bpSpan);
    userNav().appendChild(wvSpan);
  }

  static walletTableTemplate() {
    return `
      <h4 class="pt-3">CTS Wallet</h4>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Coin</th>
            <th scope="col">Symbol</th>
            <th scope="col">Qty</th>
            <th scope="col">Cost</th>
            <th scope="col">Value</th>
            <th scope="col">Profit</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="wallet-table"></tbody>
      </table>
    `;
  }

  /** Fetches **/

  static async getUserInfo() {
    const data = await Api.get("/users");

    User.current_user = data.find(
      (user) => user.username === User.current_user.username
    );
  }

  static submitForm(e) {
    e.preventDefault();

    let strongParams = {
      user: {
        username: userFormInput().value,
      },
    };

    fetch("http://localhost:3000/users", {
      body: strongParams,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(strongParams),
      method: "POST",
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        User.current_user = data;
        User.renderUserInfo();
        User.renderUserWallet();
      });
  }

  /** Renders **/

  static renderUserForm() {
    User.userFormTemplate();
  }

  static renderUserInfo() {
    resetUserNav();
    resetUserMain();
    User.userInfoTemplate();
  }

  static renderUserWallet() {
    userMain().innerHTML += User.walletTableTemplate();
  }
}
