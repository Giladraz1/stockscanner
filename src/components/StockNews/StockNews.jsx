import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../../store/appStore";
import NewsItem from "./NewsItem";
import YAHOO_FINANCE_API_KEY from "../../../API_KEYS";

export default function StockNews() {
  const [newsItems, setNewsItems] = useState([]);
  const title = useStore((state) => state.title);

  const options = {
    method: "GET",

    url: `https://yfapi.net/ws/insights/v1/finance/insights?symbol=${title}`,
    headers: {
      "x-api-key": YAHOO_FINANCE_API_KEY,
    },
  };

  const fetchData = () => {
    axios
      .request(options)
      .then(function (response) {
        if (response.data) {
          setNewsItems(response.data.finance.result.reports);
        } else {
          console.log("no");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
    // console.log("prop", chosenOption);
    const interval = setInterval(() => {
      fetchData();
    }, 100000000000000);

    return () => clearInterval(interval);
  }, [title]);

  return (
    <>
      <div className="container mt-5">
        {newsItems.length > 0 ? (
          <div className="lead fw-bold fs-4">Latest News on {title} stock </div>
        ) : (
          ""
        )}
        {newsItems.length > 0
          ? newsItems
              .slice(0, 10)
              .map((item, index) => (
                <NewsItem key={index} trendingNews={item} />
              ))
          : ""}
      </div>
    </>
  );
}
