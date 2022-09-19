import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContainerLayout from "../UI/ContainerLayout/ContainerLayout";
const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  //  const accountsCollection = new Collection("accounts");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      passwordConfirmRef.current.value === ""
    ) {
      return setError("Please fill all fields");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Password can not be less than 6 characters");
    }
    try {
      setError("");
      setLoading(true);
      console.log("this signup", signup);
      await signup(emailRef.current.value, passwordRef.current.value);

      setMessage("Registeration successful");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setMessage("");
      setError("Failed to create an account");
      console.log(error);
    }
  };
  return (
    <>
      <ContainerLayout>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>

            {message && <Alert variant="success"> {message}</Alert>}
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation:</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </ContainerLayout>
      <div className="w-100 text-center">
        Already have an account?<Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default SignUp;
