import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import useStore from "../../store/appStore";
import moment from "moment";
import YAHOO_FINANCE_API_KEY from "../../../API_KEYS";

export default function StockChart() {
  const [price, setPrice] = useState([]);
  const [time, setTime] = useState([]);
  const title = useStore((state) => state.title);

  const options = {
    method: "GET",

    url: `https://yfapi.net/v8/finance/chart/${title}?range=3mo&region=US&interval=1d&lang=en&events=div%2Csplit`,
    headers: {
      "x-api-key": YAHOO_FINANCE_API_KEY,
    },
  };

  const fetchData = () => {
    axios
      .request(options)
      .then(function (response) {
        if (response.data) {
          setPrice(response.data.chart.result[0].indicators.quote[0].close);
          setTime(response.data.chart.result[0].timestamp);
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
    const interval = setInterval(() => {
      fetchData();
    }, 100000000000000);

    return () => clearInterval(interval);
  }, [title]);

  var x = time.map((t) => moment(parseInt(t + "000")).format("MMM Do YY"));
  var y = price.map((p) => parseFloat(p.toFixed(2)));
  var z = x.map(function (e, i) {
    return [e, y[i]];
  });

  const webChartOptions = {
    chart: {
      title: "Stock Performance throughout the Year",
    },
    width: 900,
    height: 500,
  };

  const mobileChartOptions = {
    chart: {
      title: "Stock Performence throughout the Year",
    },
    width: 350,
    height: 300,
    legend: "none",
  };

  return (
    <div>
      <div className="container mt-3">
        <div className=" d-none d-md-block">
          <Chart
            format="short"
            chartType="Line"
            data={[["Time", "Price in USD"], ...z.map((e) => e)]}
            options={webChartOptions}
          />
        </div>

        <div className="d-block d-md-none">
          <Chart
            format="short"
            chartType="Line"
            data={[["Time", "USD"], ...z.map((e) => e)]}
            options={mobileChartOptions}
          />
        </div>
      </div>
    </div>
  );
}
