import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContainerLayout from "../UI/ContainerLayout/ContainerLayout";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current.value === "") {
      return setError("Please enter your email address");
    }

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Password reset failed, check your email address");
    }
    setLoading(false);
  };
  return (
    <>
      <ContainerLayout>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" ref={emailRef} />
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </ContainerLayout>
    </>
  );
};

export default ForgotPassword;
