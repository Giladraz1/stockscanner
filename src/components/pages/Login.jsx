import { AuthErrorCodes } from "firebase/auth";
import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContainerLayout from "../UI/ContainerLayout/ContainerLayout";

// import GooglePageLogin from "./GoogleSignIn";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return setError("Please fill all fields");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Password can not be less than 6 characters");
    }
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setMessage("login successfully");
      // alert("Login success");
      return navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      setMessage("");
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      <ContainerLayout>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In </h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" ref={passwordRef} />
              </Form.Group>{" "}
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Login
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password ?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center">
          Need an account ? <Link to="/signup">Sign Up</Link>
        </div>
        {/* <GooglePageLogin /> */}
      </ContainerLayout>
    </>
  );
};

export default Login;
