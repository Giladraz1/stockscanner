import { Button } from "@mui/material";
import { handleBreakpoints } from "@mui/system";
import { Routes, Route, Link } from "react-router-dom";
import useStore from "../../store/appStore";
// import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { useAuth } from "../context/AuthContext";
import "./TrendingStocks.css";

export default function MoversItem({ trendingStock }) {
  const updateTitle = useStore((state) => state.updateTitle);

  const { currentUser } = useAuth();

  var handleClick = function () {
    updateTitle(trendingStock.symbol);
  };

  return (
    <>
      <Table className="ms-3 mb-0">
        <tbody>
          <tr key={trendingStock.symbol} className="row d-flex me-1">
            <td className="col-4">
              {currentUser ? (
                <div>
                  <Link
                    className="text-underline-hover fw-bolder"
                    onClick={handleClick}
                    to={{
                      pathname: `/dashboard/stockPage/`,
                    }}
                  >
                    {trendingStock.symbol}
                  </Link>
                  <div className="text-nowrap d-none d-lg-block text-muted fw-normal small">
                    {trendingStock.longName}
                  </div>
                </div>
              ) : !currentUser ? (
                <div>
                  <Link
                    className="text-underline-hover fw-bolder"
                    onClick={handleClick}
                    to={{
                      pathname: `/stockPage`,
                    }}
                  >
                    {trendingStock.symbol}
                  </Link>
                  <div className="text-nowrap d-none d-lg-block text-muted fw-normal small">
                    {trendingStock.longName}
                  </div>
                </div>
              ) : (
                " "
              )}
            </td>
            <td className="row col-8">
              <div className="col-4 fw-bold p-1">
                {Number(trendingStock.regularMarketPrice).toFixed(2)}
              </div>
              <div className="col-4 p-1">
                {trendingStock.regularMarketChange > 0 ? (
                  <div className="text-success fw-bold">
                    +{trendingStock.regularMarketChange.toFixed(2)}
                  </div>
                ) : trendingStock.regularMarketChange < 0 ? (
                  <div className="text-danger fw-bold">
                    {trendingStock.regularMarketChange.toFixed(2)}
                  </div>
                ) : (
                  <div className="fw-bold">
                    {Number(trendingStock.regularMarketChange).toFixed(2)}
                  </div>
                )}
              </div>

              <div className="col-4 p-1">
                {trendingStock.regularMarketChangePercent > 0 ? (
                  <div className="text-success fw-bold">
                    +{trendingStock.regularMarketChangePercent.toFixed(2)}%
                  </div>
                ) : trendingStock.regularMarketChangePercent < 0 ? (
                  <div className="text-danger fw-bold">
                    {trendingStock.regularMarketChangePercent.toFixed(2)}%
                  </div>
                ) : (
                  <div className="fw-bold">
                    {Number(trendingStock.regularMarketChangePercent).toFixed(
                      2
                    )}
                    %
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
