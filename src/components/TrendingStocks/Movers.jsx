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

import { stockService } from "../../stock-service";

export default function Movers() {
  const [open, setOpen] = useState(false);
  const [movers, setMovers] = useState([]);

  useEffect(() => {
    const fetchLoser = async () => {
      const movers = await stockService.getMovers();
      setMovers(movers);
    };
    fetchLoser();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center mb-5  mt-5">
      <div className="fw-bolder ps-2 ms-1">
        Stocks: Movers
        <BsChevronRight style={{ height: "9px", fontWeight: "800" }} />
      </div>
      <TableTop />
      <div>
        {movers.slice(0, 5).map((item, index) => (
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
            {movers.slice(5, 10).map((item, index) => (
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
