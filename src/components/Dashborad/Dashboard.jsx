import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../Home/Home";

const Dashboard = () => {
  const navigate = useNavigate();
  // const [error, setError] = useState("");

  const { currentUser } = useAuth();
  // const handleLogout = async () => {
  //   setError("");
  //   try {
  //     await logout();
  //     return navigate("/login");
  //   } catch (error) {
  //     setError("Logout failed");
  //   }
  // };

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
