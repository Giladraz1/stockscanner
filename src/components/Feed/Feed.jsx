import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./feed.css";
import { BsChevronRight } from "react-icons/bs";

export default function Feed() {
  const [news, setNews] = useState([]);

  const options = {
    url: `https://newsapi.org/v2/top-headlines?country=us&category=business`,
    headers: {
      "x-api-key": "09ba06a407424582b0f8af72f2d25797",
    },
    params: { pageSize: "10" },
  };

  const fetchData = () => {
    axios
      .request(options)
      .then(function (response) {
        if (response.data) {
          setNews(response.data.articles);
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
  }, []);

  function shorten(str, maxLen, separator = " ") {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  }

  return (
    <div>
      <div className="fw-bolder mb-3 d-lg-none">
        Market News
        <BsChevronRight style={{ height: "9px", fontWeight: "800" }} />
      </div>
      <div className="row">
        {news.map((result) => {
          return result.author == null ? (
            ""
          ) : (
            <div key={result.title}>
              <div className=" d-flex mb-5">
                <div className="d-none d-xl-block col-xl-4">
                  <div
                    style={{
                      width: "280px",
                      height: "200px",
                      backgroundImage: `url(${result.urlToImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
                <div className="d-none d-md-block d-xl-none col-xl-4">
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundImage: `url(${result.urlToImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
                <div className="d-block d-md-none col-xl-4">
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundImage: `url(${result.urlToImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
                <div className="d-none d-md-block col-xl-8">
                  <CardContent className="py-0">
                    <div className="d-flex">
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {result.author.substr(0, 20)}{" "}
                        <span style={{ marginLeft: ".9rem" }}></span> •
                      </Typography>
                      <Typography className="ps-3 text-secondary">
                        {moment(result.publishedAt).calendar()}
                      </Typography>
                    </div>
                    <Typography gutterBottom>
                      <a
                        className="text-hover fs-5 fw-bolder"
                        href={result.url}
                      >
                        {result.title}
                      </a>
                    </Typography>
                    <Typography component="div">
                      {result.content}
                      ...
                    </Typography>
                  </CardContent>
                </div>
                <div className="d-block d-md-none col-xl-8">
                  <CardContent className="py-0">
                    <div className="d-block">
                      <Typography gutterBottom>
                        <a
                          className="text-hover fs-6 fw-bolder"
                          href={result.url}
                        >
                          {result.title
                            .substr(0, 70)
                            .substr(
                              0,
                              Math.min(
                                result.title.substr(0, 70).length,
                                result.title.substr(0, 70).lastIndexOf(" ")
                              )
                            )}
                          ...
                        </a>
                      </Typography>
                      <div className="d-flex">
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {result.author.substr(0, 20)}{" "}
                          <span style={{ marginLeft: ".9rem" }}></span> •
                        </Typography>
                        <Typography className="ps-3 text-secondary">
                          {moment(result.publishedAt).format("LT").slice(0, -2)}
                        </Typography>
                      </div>
                    </div>

                    {/* <Typography component="div">
                      {result.content}
                      ...
                    </Typography> */}
                  </CardContent>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
