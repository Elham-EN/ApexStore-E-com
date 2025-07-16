import { Outlet } from "react-router";
import { Box, Container } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import Navbar from "@/app/layout/Navbar";

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
              ? "radial-gradient(circle, #c4c5c7, #111B27)"
              : "radial-gradient(circle, #baecf9, #103f5e)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}

export default App;
