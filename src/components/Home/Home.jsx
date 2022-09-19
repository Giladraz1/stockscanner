import React from "react";
import MainContainer from "../MainContainer/MainContainer";
import AuthNavBar from "../navbar/AuthNavBar";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? <AuthNavBar className="mb-4" /> : ""}
      <MainContainer className="mb-4" />
    </>
  );
}
