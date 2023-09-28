import CircularProgress from "@mui/material/CircularProgress";
import "./LoadingIndicator.css";
export default function LoadingIndicator() {
  return (
    <div className="container-loading">
      <CircularProgress
        className="progress"
        style={{ width: "75px", height: "75px" }}
      />
    </div>
  );
}
