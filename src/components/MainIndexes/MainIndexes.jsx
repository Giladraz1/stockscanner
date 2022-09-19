import React, { useState, useEffect } from "react";
import axios from "axios";
import MoversItem from "../TrendingStocks/MoversItem";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/config";

export default function UsersWatchListSecuirityCall() {
  const [userStocks, setUserStocks] = useState([]);

  const fetchStockData = (stockSymbol) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "GET",
          url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stockSymbol}`,
          headers: {
            "x-api-key": "eDdXjDlWo65VPVfo23rzg3QYu5IM2IG879AInLif",
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
  };

  async function getWatchlistStocks() {
    const myCollection = collection(db, "symbols");
    const q = query(myCollection, where("userId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const savedStocks = [];
    // [{symbol: 'APL', dbId:'s'}]
    querySnapshot.forEach((doc) => {
      const stock = { ...doc.data(), dbId: doc.id };
      savedStocks.push(stock);
    });

    const stocksDataPromises = [];
    //[Promise<pending>]
    for (const stock of savedStocks) {
      console.log("stock symbol", stock.symbol);
      stocksDataPromises.push(fetchStockData(stock.symbol));
    }

    const stockData = await Promise.all(stocksDataPromises);
    // [{stockData}]
    const stockDataWithId = stockData.map((stock, i) => ({
      ...stock, //stockData
      dbId: savedStocks[i].dbId,
    }));
    // console.log(stockData);
    setUserStocks(stockDataWithId);
  }

  useEffect(() => {
    getWatchlistStocks();
  }, []);

  return (
    <>
      {userStocks.map((stock) => {
        return (
          <div className="d-flex">
            <MoversItem key={stock.symbol} trendingStock={stock} />
          </div>
        );
      })}
    </>
  );
}
