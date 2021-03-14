class Trade {
  static all = [];

  constructor(attr) {
    this.id = attr.id;
    this.logo = attr.logo;
    this.sym = attr.sym;
    this.qty = attr.qty;
    this.cost = parseFloat(attr.cost);
    this.user_id = attr.user_id;
    this.coin_id = attr.coin_id;
  }

  save() {
    Trade.all.push(this);
  }

  static create(data) {
    let trade = new Trade(data.attributes);
    trade.save();
    return trade;
  }

  static createFromCollection(collection) {
    collection.forEach((data) => Trade.create(data));
  }

  static async getTrades() {
    const trades = await Api.get("/trades");

    Trade.all = [];
    Trade.createFromCollection(trades.data);
  }

  static buy(user, coin, qty) {
    let cost = coin.current_price * qty;
    let bp = User.current_user.buying_power - cost;

    let wv = parseFloat(User.current_user.wallet_value) + cost;

    let tradeParams = {
      trade: {
        qty: qty,
        cost: cost,
        sym: coin.symbol,
        logo: coin.image,
        coin_id: coin.id,
        user_id: user.id,
      },
    };

    let userParams = {
      user: {
        buying_power: bp,
        wallet_value: wv,
      },
    };

    Api.post("/trades", tradeParams).then(function (trade) {
      Trade.create(trade.data);
    });

    Api.patch(`/users/${User.current_user.id}`, userParams).then((data) => {
      User.current_user = data;
      User.renderUserInfo();
      User.renderUserWallet();
    });
  }
}
