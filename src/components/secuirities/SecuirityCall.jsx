import React, { useState, useEffect } from "react";
import axios from "axios";
import SecuirityItem from "./SecuirityItem.jsx";
import useStore from "../../store/appStore";
import YAHOO_FINANCE_API_KEY from "../../../API_KEYS.jsx";
import { stockService } from "../../stock-service.js";

export default function SecuirityCall() {
  const title = useStore((state) => state.title);
  const [stock, setStock] = useState([]);

  // const options = {
  //   method: "GET",
  //   url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${title}`,
  //   headers: {
  //     "x-api-key": YAHOO_FINANCE_API_KEY,
  //   },
  // };

  // const fetchData = () => {
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       if (response.data) {
  //         setStock(response.data.quoteResponse.result[0]);
  //       } else {
  //         console.log("no");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    stockService.getStock(title).then((stockData) => setStock(stockData));
  }, [title]);

  return (
    <div>
      <SecuirityItem chosenStock={stock} />
    </div>
  );
}
