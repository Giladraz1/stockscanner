import React, { useState, useEffect } from "react";
import SecuirityItem from "./SecuirityItem.jsx";
import useStore from "../../store/appStore";
import { stockService } from "../../stock-service.js";

export default function SecuirityCall() {
  const title = useStore((state) => state.title);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    stockService.getStock(title).then((stockData) => setStock(stockData));
  }, [title]);

  return (
    <div>
      <SecuirityItem chosenStock={stock} />
    </div>
  );
}
