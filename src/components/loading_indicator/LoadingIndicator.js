import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./LoadingIndicator.css";
export default function LoadingIndicator() {
  return (
    <div className="container-loading">
      <CircularProgress className="progress" />
    </div>
  );
}
