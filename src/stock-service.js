import axios from "axios";
import YAHOO_FINANCE_API_KEY from "../API_KEYS";

class StockService {
  stocks = {};
  movers = [];
  gainers = [];
  losers = [];

  async getMovers() {
    if (this.movers.length) {
      return this.movers;
    }

    const response = await axios.request({
      method: "GET",
      url: "https://yfapi.net/ws/screeners/v1/finance/screener/predefined/saved",
      params: { count: "25", scrIds: "most_actives" },
      headers: {
        "x-api-key": YAHOO_FINANCE_API_KEY,
      },
    });
    const data = response.data.finance.result[0].quotes;
    this.movers = data;
    return data;
  }

  async getGainers() {
    if (this.gainers.length) {
      return this.gainers;
    }

    const response = await axios.request({
      method: "GET",
      url: "https://yfapi.net/ws/screeners/v1/finance/screener/predefined/saved",
      params: { count: "25", scrIds: "day_gainers" },
      headers: {
        "x-api-key": YAHOO_FINANCE_API_KEY,
      },
    });
    const data = response.data.finance.result[0].quotes;
    this.gainers = data;
    return data;
  }

  async getLosers() {
    if (this.losers.length) {
      return this.losers;
    }

    const response = await axios.request({
      method: "GET",
      url: "https://yfapi.net/ws/screeners/v1/finance/screener/predefined/saved",
      params: { count: "25", scrIds: "day_losers" },
      headers: {
        "x-api-key": YAHOO_FINANCE_API_KEY,
      },
    });
    const data = response.data.finance.result[0].quotes;
    this.losers = data;
    return data;
  }

  async getStock(symbol) {
    if (Object.keys(this.stocks).includes(symbol)) {
      // already fetched
      return this.stocks[symbol];
    }

    // stock wasn't fetched yet
    const stockData = await this.fetchStock(symbol);
    this.stocks[symbol] = stockData;

    return stockData;
  }

  fetchStock(symbol) {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "GET",
          url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbol}`,
          headers: {
            "x-api-key": YAHOO_FINANCE_API_KEY,
          },
        })
        .then(function (response) {
          if (response.data) {
            resolve(response.data.quoteResponse.result[0]);
          } else {
            console.log("no");
            reject("no");
          }
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    });
  }
}

export const stockService = new StockService();
