import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MoversItem from "../TrendingStocks/MoversItem";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { BsChevronRight } from "react-icons/bs";
import TableTop from "../UI/TableTop/TableTop";
import { uniqueId } from "lodash";
import { stockService } from "../../stock-service";

export default function WatchList() {
  const [userStocks, setUserStocks] = useState([]);

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
      // console.log("stock symbol", stock.symbol);
      stocksDataPromises.push(stockService.getStock(stock.symbol));
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

  function deleteStock(id) {
    console.log({ id });
    deleteDoc(doc(db, "symbols", id));
  }

  useEffect(() => {
    getWatchlistStocks();
  }, []);

  const { currentUser } = useAuth();
  return (
    <>
      {currentUser && userStocks.length ? (
        <div className="mb-5 mt-5 mt-lg-0">
          <div className="d-flex flex-column justify-content-center">
            <div className="fw-bolder  ps-1 ms-2">
              Stocks: Watchlist
              <BsChevronRight style={{ height: "9px" }} />
            </div>
            <TableTop />
            {userStocks.map((stock) => {
              stock.uniqueKey = uniqueId();
              return (
                <div key={stock.uniqueKey} style={{ position: "relative" }}>
                  <MoversItem
                    trendingStock={stock}
                    style={{ position: "relative" }}
                  />

                  <button
                    onClick={() => {
                      deleteStock(stock.dbId);
                      setTimeout(() => getWatchlistStocks(), 200);
                    }}
                    style={{
                      backgroundColor: "Transparent",
                      backgroundRepeat: "no-repeat",
                      border: "none",
                      cursor: "pointer",
                      overflow: "hidden",
                      position: "absolute",
                      zIndex: "666",
                      right: "1px",
                      top: "25px",
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
