import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import useStore from "../../store/appStore";
import { Navigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../context/AuthContext";

import YAHOO_FINANCE_API_KEY from "../../../API_KEYS";

export default function SearchBarNew() {
  const updateTitle = useStore((state) => state.updateTitle);

  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [stockApi, setStockApi] = useState([]);
  const [userStock, setUserStock] = useState(``);

  const fetchData = (stock) => {
    setIsLoading(true);
    axios
      .request({
        method: "GET",
        url: `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${stock}`,
        headers: {
          "x-api-key": YAHOO_FINANCE_API_KEY,
        },
      })
      .then(function (response) {
        if (response.data) {
          setStockApi(response.data.ResultSet.Result);
        } else {
          console.log("no");
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!userStock) {
      return;
    }
    fetchData(userStock);
  }, [userStock, inputValue]);

  return (
    <>
      {searchValue && !currentUser ? (
        <Navigate to="/stockPage/" />
      ) : searchValue && currentUser ? (
        <Navigate to="/dashboard/stockPage/" />
      ) : (
        ""
      )}

      <div className="py-3">
        <Autocomplete
          freeSolo
          disableClearable={false}
          autoHighlight={false}
          value={searchValue}
          onChange={(event, newValue) => {
            setSearchValue(newValue);

            updateTitle(newValue);

            if (newValue === "") {
              setIsOpen(false);
            }
          }}
          options={stockApi.map((item) => item.symbol)}
          noOptionsText="No Options"
          sx={{ width: 300 }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setIsOpen(true);
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              className="pe-4"
              {...params}
              value={userStock}
              onChange={(e) => setUserStock(e.target.value)}
              label={
                <React.Fragment>
                  <SearchIcon className="pe-2" fontSize="medium" />
                  Search for Stocks
                </React.Fragment>
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    </>
  );
}
