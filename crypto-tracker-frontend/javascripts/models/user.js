class User {
  static all = [];

  constructor(attr) {
    this.id = id;
    this.username = username;
  }

  save() {
    User.all.push(this);
    sessionStorage.setItem("username", this.username);
  }

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
      <div class="container">
        <div class="row">
          <div class="col-6">
            <form class="pt-3">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  id="username"
                />
              </div>
              <button type="submit" class="btn btn-sm btn-primary">
                Sign In
              </button>
            </form>
          </div>
        </div>
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

  /** Renders **/
  static renderUserForm() {}
  static renderUserInfo() {}
  static renderUserWallet() {}
}
