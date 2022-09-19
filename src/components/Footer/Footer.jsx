import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box component="footer" sx={{ boxShadow: 3 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            py: 4,
          }}
        >
          <Typography color="text.secondary" variant="body2">
            © 2022 Stock Scanner
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
