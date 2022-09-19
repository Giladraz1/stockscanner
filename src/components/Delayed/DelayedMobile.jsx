import React, { useState, useEffect } from "react";

export default function DelayedMobile({ children, waitBeforeShow = 5000 }) {
  const [isShown, setIsShown] = useState(false);
  -useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);

    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return <>{isShown ? children : null}</>;
}
