import { Outlet } from "react-router";
import { Box, Container } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import Navbar from "@/app/layout/Navbar";
import Footer from "./Footer";

function App() {
  const { mode } = useColorScheme();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            mode === "dark"
              ? "radial-gradient(circle, #2D1B69, #0F0C29)"
              : "radial-gradient(circle, #E3F2FD, #F3E5F5)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default App;
