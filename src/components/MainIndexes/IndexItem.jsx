// import axios from "axios";
import React from "react";

export default function IndexItem() {
  // const options = {
  //   method: "GET",
  //   url: "https://finnhub-realtime-stock-price.p.rapidapi.com/quote",
  //   params: { symbol: "AAPL" },
  // };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log("rapid", response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });

  // const [stock, setStock] = useState("");

  return (
    <div>
      {/* <div className="fw-bold" style={{ color: "#2771FF" }}>
        S&P 500
      </div>
      <div className="fw-bold pb-1">3,910.44</div>
      <div className="d-flex" style={{ fontSize: "13px" }}>
        <div className="ms-2 fs-4 mt-1">
          {chosenStock.regularMarketChange > 0 ? (
            <div className="text-success fw-bold">
              +{chosenStock.regularMarketChange.toFixed(2)}
            </div>
          ) : chosenStock.regularMarketChange < 0 ? (
            <div className="text-danger fw-bold">
              {chosenStock.regularMarketChange.toFixed(2)}
            </div>
          ) : (
            <div>{chosenStock.regularMarketChange.toFixed(2)}</div>
          )}
        </div>

        <div className="ms-2  fs-4 mt-1">
          {chosenStock.regularMarketChangePercent > 0 ? (
            <div className="text-success fw-bold">
              (+{chosenStock.regularMarketChangePercent.toFixed(2)}%)
            </div>
          ) : chosenStock.regularMarketChangePercent < 0 ? (
            <div className="text-danger fw-bold">
              ({chosenStock.regularMarketChangePercent.toFixed(2)}%)
            </div>
          ) : (
            <div>{chosenStock.regularMarketChangePercent.toFixed(2)}%</div>
          )}
        </div>
      </div> */}
    </div>
  );
}
