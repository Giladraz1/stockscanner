import React from "react";
import Container from "react-bootstrap/esm/Container";

export default function ContainerLayout({ children }) {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: 400 }}>
          {children}
        </div>
      </Container>
    </>
  );
}
