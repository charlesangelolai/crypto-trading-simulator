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
    // create trade
    let userTrades = Trade.all.filter((t) => t.user_id === user.id);
    let trade = userTrades.find((t) => t.coin_id === coin.id);
    let cost = coin.current_price * qty;
    // calculate new buying power and wallet value
    let bp = parseFloat(user.buying_power) - cost;
    let wv = parseFloat(user.wallet_value) + cost;

    if (trade) {
      // patch trade
      let tradeID = userTrades.find((t) => t.coin_id === coin.id).id;
      let newQty = trade.qty + parseInt(qty);
      let newCost = trade.cost + cost;

      let tradeParams = {
        trade: {
          qty: newQty,
          cost: newCost,
        },
      };

      // fetch with patch/update request
      Api.patch(`/trades/${tradeID}`, tradeParams).then(() => {
        Trade.getTrades();
      });
    } else {
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

      Api.post("/trades", tradeParams).then(function (trade) {
        Trade.create(trade.data);
      });
    }

    let userParams = {
      user: {
        buying_power: bp,
        wallet_value: wv,
      },
    };

    Api.patch(`/users/${user.id}`, userParams).then((user) => {
      User.current_user = user.data.attributes;
      User.renderUserInfo();
      User.getWallet();
    });
  }

  static sell(user, coin, qty) {
    /** updates trade instance **/
    // finds users trades
    let userTrades = Trade.all.filter((t) => t.user_id == user.id);
    // finds trade id
    let tradeID = userTrades.find((c) => c.coin_id === coin.coin_id).id;
    // finds trade cost
    let tradeCost = userTrades.find((c) => c.coin_id === coin.coin_id).cost;
    // finds trade total qty
    let tradeQty = userTrades.find((c) => c.coin_id === coin.coin_id).qty;
    // new trade qty
    let newQty = tradeQty - parseInt(qty);

    // price per coin
    let pricePerCoin = tradeCost / tradeQty;
    // new trade cost
    let newCost = tradeCost - pricePerCoin * parseInt(qty);

    let tradeParams = {
      trade: {
        qty: newQty,
        cost: newCost,
      },
    };

    /** update user instance **/
    // finds current coin price
    let currentCoinPrice = Coin.all.find((c) => c.id === coin.coin_id)
      .current_price;
    // total return
    let totalReturn = currentCoinPrice * parseInt(qty);
    // new buying power
    let bp = parseFloat(user.buying_power) + totalReturn;
    let wv = parseFloat(user.wallet_value) - totalReturn;

    let userParams = {
      user: {
        buying_power: bp,
        wallet_value: wv,
      },
    };

    Api.patch(`/trades/${tradeID}`, tradeParams).then(() => {
      Trade.getTrades();
    });

    Api.patch(`/users/${user.id}`, userParams).then((user) => {
      User.current_user = user.data.attributes;
      User.renderUserInfo();
      User.getWallet();
    });
  }
}
