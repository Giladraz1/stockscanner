import { useEffect, useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContainerLayout from "../UI/ContainerLayout/ContainerLayout";
import AuthNavBar from "../navbar/AuthNavBar";
import MainContainer from "../MainContainer/MainContainer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      return navigate("/login");
    } catch (error) {
      setError("Logout failed");
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <AuthNavBar className="mb-4" />
      <MainContainer />
      {/* <ContainerLayout>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {currentUser ? (
              <strong>Email: {currentUser.email}</strong>
            ) : null}{" "}
            <Link to="/update-profile" className="btn btn-primary  w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center">
          <Button variant="link" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </ContainerLayout> */}
    </>
  );
};

export default Dashboard;
