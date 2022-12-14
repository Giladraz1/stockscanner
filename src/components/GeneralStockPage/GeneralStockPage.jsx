import React from "react";
import StockParams from "../StockParams/StockParams";
import StockChart from "../StockChart/StockChart";
import StockNews from "../StockNews/StockNews";
import UnAuthNavBar from "../navbar/UnAuthNavBar";
import AuthNavBar from "../navbar/AuthNavBar";
import { useAuth } from "../context/AuthContext";

export default function GeneralStockPage() {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? <AuthNavBar /> : <UnAuthNavBar />}
      <div className="mt-5">
        <StockParams />
        <StockChart />
        <StockNews />
      </div>
    </>
  );
}
