import UnAuthNavBar from "../navbar/UnAuthNavBar";
import AuthNavBar from "../navbar/AuthNavBar";
import Feed from "../Feed/Feed";
import Gainers from "../TrendingStocks/Gainers";
import Losers from "../TrendingStocks/Losers";
import Movers from "../TrendingStocks/Movers";
import WatchList from "../usersWatchlist/Watchlist";
import { useAuth } from "../context/AuthContext";
import Footer from "../Footer/Footer";
import Iframe from "../Iframe/Iframe";
import React from "react";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <>
      {!currentUser ? <UnAuthNavBar /> : <AuthNavBar />}
      <div className="container-xxl">
        <div className="row d-flex justify-content-between">
          <div className="order-2 order-lg-1 col-lg-8  mt-5">
            <Iframe />
            <Feed />
          </div>
          <div className="order-1 order-lg-2 col-lg-4 col-md-6 col-12">
            {/* <div className="tablet-left-side"> */}
            {currentUser ? (
              <div className="mt-5">
                <WatchList />
              </div>
            ) : (
              ""
            )}

            <Movers />
            {/* </div> */}
            {/* <div className="tablet-right-side"> */}
            <Gainers />
            <Losers />
            {/* </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
