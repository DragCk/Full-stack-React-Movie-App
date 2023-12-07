import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* Global Loading */}

      {/* Login Modal */}

      <Box display="flex" minHeight="100vh">
        {/* Header */}

        {/* Main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* Main */}
      </Box>
      {/* Footer */}

      {/* Footer */}
    </>
  );
};

export default MainLayout;
