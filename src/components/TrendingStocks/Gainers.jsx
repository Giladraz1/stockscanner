import React, { useState, useEffect } from "react";
import MoversItem from "./MoversItem";
import axios from "axios";
import TableTop from "../UI/TableTop/TableTop";
import "../TrendingStocks/TrendingStocks.css";
import { BsChevronDown, BsChevronUp, BsChevronRight } from "react-icons/bs";
import Delayed from "../Delayed/Delayed";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Grow from "@mui/material/Grow";
import YAHOO_FINANCE_API_KEY from "../../../API_KEYS";

export default function Movers() {
  // const [checked, setChecked] = useState(false);
  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };

  const [open, setOpen] = useState(false);
  const [api, setApi] = useState([]);

  const options = {
    method: "GET",
    url: "https://yfapi.net/ws/screeners/v1/finance/screener/predefined/saved",
    params: { count: "25", scrIds: "day_gainers" },
    headers: {
      "x-api-key": YAHOO_FINANCE_API_KEY,
    },
  };

  const fetchData = () => {
    axios
      .request(options)
      .then(function (response) {
        if (response.data) {
          setApi(response.data.finance.result[0].quotes);
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
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center mb-5  mt-5">
      <div className="fw-bolder ps-2 ms-1">
        Stocks: Movers
        <BsChevronRight style={{ height: "9px", fontWeight: "800" }} />
      </div>
      <TableTop />
      <div>
        {api.slice(0, 5).map((item, index) => (
          <MoversItem key={index} trendingStock={item} />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        {!open ? (
          <Delayed>
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...(open ? { timeout: 4000 } : {})}
            >
              <Button
                className="m-2 btn-s"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                <BsChevronDown />
              </Button>
            </Grow>
          </Delayed>
        ) : (
          ""
        )}
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <div>
            {api.slice(5, 10).map((item, index) => (
              <MoversItem key={index} trendingStock={item} />
            ))}
          </div>
        </div>
      </Collapse>
      <div className="buttomButtonContainer d-flex justify-content-center">
        {open ? (
          <Button
            style={{ width: "45px" }}
            className="m-2"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <BsChevronUp />
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
