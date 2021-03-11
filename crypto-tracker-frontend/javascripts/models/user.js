class User {
  static all = [];
  static current_user;

  constructor(attr) {
    this.id = id;
    this.username = username;
  }

  save() {
    User.all.push(this);
    sessionStorage.setItem("username", this.username);
  }

  signin() {}

  logout() {
    sessionStorage.clear();
  }

  static create(attr) {
    let user = new User(attr);
    user.save();
    return user;
  }

  static createFromCollection(collection) {
    collection.forEach((data) => User.create(data));
  }

  /** Templates **/

  static userFormTemplate() {
    return `
      <div class="row">
        <div class="col-6">
          <form class="pt-3" id="user-form">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                name="username"
                id="username"
              />
            </div>
            <input type="submit" class="btn btn-sm btn-primary" value="Sign In" />
          </form>
        </div>
      </div>
    `;
  }

  static userInfoTemplate() {
    return `
      <div>
        Username: ${this.username}
        Buying Power: ${this.buyingPower}
        Wallet Value: ${this.walletValue}
      </div>
    `;
  }

  static walletTableTemplate() {
    return `
      <div class="container">
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
      </div>
    `;
  }

  /** Fetches **/
  static async getUser() {
    const data = await ApplicationCache.get("/users");

    User.createFromCollection(data);
    User.renderUserInfo();
  }

  /** Renders **/
  static renderUserForm() {
    main().innerHTML += User.userFormTemplate();
    form().addEventListener("submit", User.submitForm);
    debugger;
  }

  // static renderUserInfo() {}
  // static renderUserWallet() {}

  static submitForm(e) {
    e.preventDefault();

    debugger;
  }
}
