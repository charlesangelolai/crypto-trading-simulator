/** Formatters **/

const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** Node Getters **/

const userMain = () => document.getElementById("user-main");

const marketMain = () => document.getElementById("market-main");

const userForm = () => document.getElementById("user-form");

const userNav = () => document.getElementById("user-nav");

const userFormInput = () => document.getElementById("username");

const buyForm = (coin) => document.getElementById(`${coin}-buy-form`);

const sellForm = (coin) => document.getElementById(`${coin}-sell-form`);

const buyQty = (coin) => document.getElementById(`${coin}-buy-qty`);

const sellQty = (coin) => document.getElementById(`${coin}-sell-qty`);

const walletTable = () => document.getElementById("wallet-table");

const marketTable = () => document.getElementById("market-table");

const inputSearch = () => document.getElementById("search");
