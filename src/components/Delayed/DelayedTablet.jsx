import React, { useState, useEffect } from "react";

export default function DelayedTablet({ children, waitBeforeShow = 10000 }) {
  const [isShown, setIsShown] = useState(false);
  -useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);

    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return <>{isShown ? children : null}</>;
}
