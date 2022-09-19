import UnAuthNavBar from "../navbar/UnAuthNavBar";
import AuthNavBar from "../navbar/AuthNavBar";
import Feed from "../Feed/Feed";
import React, { useEffect, useCallback, useState } from "react";
import Gainers from "../TrendingStocks/Gainers";
import Losers from "../TrendingStocks/Losers";
import Movers from "../TrendingStocks/Movers";
import WatchList from "../usersWatchlist/Watchlist";
import { useAuth } from "../context/AuthContext";
import Footer from "../Footer/Footer";
// import SearchBar4 from "../SearchComponents/SearchBar";
// import IndexItem from "../MainIndexes/IndexItem";
import Iframe from "../Iframe/Iframe";

export default function Home() {
  const { currentUser } = useAuth();

  const [device, setDevice] = useState("desktop");

  //choose the screen size
  const handleResize = useCallback(() => {
    if (window.innerWidth <= 992) {
      setDevice("mobile");
      return;
    }

    if (window.innerWidth > 992 && window.innerWidth <= 1200) {
      setDevice("tablet");
      return;
    }

    setDevice("desktop");
  });

  // create an event listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!currentUser ? <UnAuthNavBar /> : <AuthNavBar />}

      <div className="container-xxl">
        {/* //Mobile view */}
        {/* {device === "mobile" ? ( */}
        {/* <div className="row d-flex d-block d-lg-none">
          <h1>mobile</h1>
          {currentUser ? <WatchList /> : ""}
          <Movers />
          <Gainers />
          <Losers />
          <Feed />
        </div> */}
        {/* 
        // ) : null} */}

        {/* Tablet view */}
        {/* {device === "tablet" ? ( */}
        {/* <div
          id="tablet"
          className="row d-flex d-none d-lg-block d-xxl-none mt-5"
        >
          <h1>tablet</h1>
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
        {/*           
        // ) : null} */}

        {/* Web view */}
        {/* {device === "desktop" ? ( */}
        {/* 
        <div className="row d-flex justify-content-between">
          <div className="  d-xxl-block col-xxl-8 mt-5">
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
        </div> */}

        <div className="row d-flex justify-content-between">
          <div className="  d-xxl-block col-xxl-8 mt-5">
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

        {/* 
        ) : null} */}

        {/* End of Web view */}
      </div>
      <Footer />
    </>
  );
}
