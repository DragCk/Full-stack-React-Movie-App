import { useSelector } from "react-redux";
import { Paper, box, LinearProgress, Toolbar } from "@mui/material";
import { useState } from "react";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Paper></Paper>
    </>
  );
};

export default GlobalLoading;
