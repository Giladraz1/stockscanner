import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { doc, addDoc, deleteDoc } from "firebase/firestore";
import { BsStar, BsStarFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import moment from "moment/moment";

export default function SecuirityItem({ chosenStock }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  var goToSignIn = function () {
    return navigate("/login", { replace: true });
  };

  var goBackHomeAuth = function () {
    return navigate("/dashboard", { replace: true });
  };

  var goBackHomeUnAuth = function () {
    return navigate("/", { replace: true });
  };

  const handleAddToWatchlist = async () => {
    const docRef = await addDoc(collection(db, "symbols"), {
      symbol: chosenStock.symbol,
      userId: auth.currentUser.uid,
    });
    console.log(docRef.id);
  };

  const handleDeleteStockFromWatchlist = async () => {
    const myCollection = collection(db, "symbols");
    const q = query(
      myCollection,
      where("userId", "==", auth.currentUser.uid),
      where("symbol", "==", chosenStock.symbol)
    );
    const querySnapshot = await getDocs(q);
    const docsToDelete = [];
    querySnapshot.forEach((doc) => {
      docsToDelete.push(doc.id);
    });

    for (const docId of docsToDelete) {
      console.log(docId);
      deleteDoc(doc(db, "symbols", docId));
    }
  };

  useEffect(() => {
    if (chosenStock === "") {
      navigate("/");
    }
  }, [chosenStock]);

  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div className="container">
        {currentUser ? (
          <button
            className="btn btn-outline-primary btn-sm mb-4"
            onClick={goBackHomeAuth}
          >
            <BsFillArrowLeftCircleFill className="mb-1 me-1" />
            {`  `} Home
          </button>
        ) : (
          <button
            className="btn btn-outline-primary btn-sm mb-4"
            onClick={goBackHomeUnAuth}
          >
            <BsFillArrowLeftCircleFill className="mb-1 me-1" />
            {`  `} Home
          </button>
        )}
        <div className="row">
          <ul style={{ listStyleType: "none" }}>
            {!chosenStock ? (
              <div>No stock selected</div>
            ) : (
              <li key={chosenStock.symbol}>
                <div className="d-flex">
                  <div>
                    <h4 className="fw-bold">
                      {chosenStock.shortName} ({chosenStock.symbol})
                    </h4>
                    <p className="text-muted">
                      {chosenStock.fullExchangeName} -{" "}
                      {chosenStock.quoteSourceName} - Currency in{" "}
                      {chosenStock.currency}
                    </p>
                  </div>
                  {!currentUser ? (
                    <button
                      className="btn btn-outline-primary btn-sm ms-3 py-2 mt-1 h-75"
                      onClick={goToSignIn}
                    >
                      <BsStar /> Add To Watchlist
                    </button>
                  ) : (
                    <div>
                      <button
                        className={
                          isActive
                            ? "btn btn-outline-primary btn-sm ms-3 py-2 mt-1 h-75 d-block"
                            : "d-none"
                        }
                        onClick={() => {
                          handleAddToWatchlist();
                          handleToggle();
                        }}
                      >
                        <BsStar className="mb-1 me-2" />
                        Add To Watchlist
                      </button>

                      <button
                        className={
                          isActive
                            ? "d-none"
                            : "btn btn-primary btn-sm ms-3 py-2 mt-1 h-75 d-block"
                        }
                        onClick={() => {
                          handleDeleteStockFromWatchlist();
                          handleToggle();
                        }}
                      >
                        <BsStarFill className="mb-1 me-2" />
                        Remove From Watchlist
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="d-flex">
                    <h2 className="fw-bolder">
                      {chosenStock.regularMarketPrice}
                    </h2>
                    <div className="ms-2 fs-4 mt-1">
                      {chosenStock.regularMarketChange > 0 ? (
                        <div className="text-success fw-bold">
                          +{chosenStock.regularMarketChange.toFixed(2)}
                        </div>
                      ) : chosenStock.regularMarketChange < 0 ? (
                        <div className="text-danger fw-bold">
                          {chosenStock.regularMarketChange.toFixed(2)}
                        </div>
                      ) : (
                        <div>{chosenStock.regularMarketChange}</div>
                      )}
                    </div>

                    <div className="ms-2  fs-4 mt-1">
                      {chosenStock.regularMarketChangePercent > 0 ? (
                        <div className="text-success fw-bold">
                          (+{chosenStock.regularMarketChangePercent.toFixed(2)}
                          %)
                        </div>
                      ) : chosenStock.regularMarketChangePercent < 0 ? (
                        <div className="text-danger fw-bold">
                          ({chosenStock.regularMarketChangePercent.toFixed(2)}%)
                        </div>
                      ) : (
                        <div>{chosenStock.regularMarketChangePercent}%</div>
                      )}
                    </div>
                  </div>
                  <p className="text-muted">
                    At Close:{" "}
                    {moment(
                      parseInt(chosenStock.regularMarketTime + "000")
                    ).format("MMMM Do , h:mm")}
                  </p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
