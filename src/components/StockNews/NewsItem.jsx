import React from "react";
import moment from "moment";

export default function NewsItem({ trendingNews }) {
  return (
    <>
      <div className="d-none d-md-block">
        <ul className="mt-4 ps-0">
          <li
            style={{ listStyleType: "none" }}
            key={trendingNews.id}
            className="mb-5 mt-2"
          >
            <div className="d-flex">
              <p className="fs-5 fw-bold text-primary"> {trendingNews.title}</p>
              <span className="text-secondary ms-3 mt-1"> • </span>
              <p className="text-secondary ms-3 mt-1">
                {moment(trendingNews.publishedOn).format("MMM Do YY")}
              </p>
            </div>
            <p>{trendingNews.summary}</p>
          </li>
        </ul>
      </div>
      <div className="d-block d-md-none">
        <ul className="mt-4 ps-0">
          <li
            style={{ listStyleType: "none" }}
            key={trendingNews.id}
            className="mb-4"
          >
            <p className="fs-5 fw-bold text-primary mt-5">
              {" "}
              {trendingNews.title}
            </p>
            <p className="text-secondary">
              {moment(trendingNews.publishedOn).format("MMM Do YY")}
            </p>

            <p>{trendingNews.summary}</p>
          </li>
        </ul>
      </div>
    </>
  );
}
