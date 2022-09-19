import UnAuthNavBar from "../../components/navbar/UnAuthNavBar";
import Feed from "../Feed/Feed";
import React from "react";
import Gainers from "../TrendingStocks/Gainers";
import Losers from "../TrendingStocks/Losers";
import Movers from "../TrendingStocks/Movers";
import WatchList from "../usersWatchlist/Watchlist";
import { useAuth } from "../context/AuthContext";
import Footer from "../Footer/Footer";
import MainIndexes from "../MainIndexes/MainIndexes";
import userStocks from "../usersWatchlist/WatchList";
// import SearchBar4 from "../SearchComponents/SearchBar";
// import IndexItem from "../MainIndexes/IndexItem";
import Iframe from "../Iframe/Iframe";
import DelayedTablet from "../Delayed/DelayedTablet";
import DelayedMobile from "../Delayed/DelayedMobile";

export default function MainContainer() {
  const { currentUser } = useAuth();

  return (
    <>
      {!currentUser ? <UnAuthNavBar /> : ""}

      <div className="container-xxl">
        {/* //Mobile view */}

        {/* <div className="row d-flex d-block d-lg-none">
          {currentUser ? <WatchList /> : ""}
          <Movers />
          <Gainers />
          <Losers />
          <Feed />
        </div> */}

        {/* Tablet view */}
        {/* 
        <div className="row d-flex d-none d-lg-block d-xxl-none mt-5">
          <div className="row d-flex justify-content-around">
            <div className="col-6">{currentUser ? <WatchList /> : ""}</div>
          </div>
          <div className="row d-flex justify-content-around">
            <div
              className="col-6"
              style={{ position: "relative", top: "-22px" }}
            >
              <Movers className="col-6" />
            </div>
          </div>
          <div className="row d-flex justify-content-around">
            <div className="col-6">
              <Gainers />
            </div>
          </div>
          <div className="row d-flex justify-content-around">
            <div className="col-6">
              <Losers />
            </div>
          </div>
          <div className="row d-flex justify-content-around">
            <div className="col-10">
              <Feed />
            </div>
          </div>
        </div> */}

        {/* Web view */}
        <div className="row d-flex justify-content-between">
          <div className="d-none d-xxl-block col-xxl-8 mt-5">
            <Iframe />
            <Feed />
          </div>
          <div className="d-none d-xxl-block col-xxl-4">
            {currentUser ? (
              <div className="mt-5">
                <WatchList />
              </div>
            ) : (
              ""
            )}
            <Movers />
            <Gainers />
            <Losers />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
