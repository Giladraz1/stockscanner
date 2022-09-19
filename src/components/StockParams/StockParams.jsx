import React from "react";
import SecuirityItem from "../secuirities/SecuirityItem";
import SecuirityCall from "../secuirities/SecuirityCall";
import StockChart from "../StockChart/StockChart";
import { useParams } from "react-router-dom";

export default function StockParams() {
  const { stockName } = useParams();

  return (
    <>
      <h1>{stockName}</h1>
      <SecuirityCall>
        <SecuirityItem chosenStock={stockName} />
        <StockChart />
      </SecuirityCall>
    </>
  );
}
