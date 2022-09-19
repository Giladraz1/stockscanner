import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../Home/oldHome";

const Dashboard = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Home />
    </>
  );
};

export default Dashboard;
