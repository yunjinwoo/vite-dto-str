import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const WordMenu = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="outlined" onClick={() => navigate("/word")}>
        word
      </Button>
      <Button variant="outlined" onClick={() => navigate("/word/info")}>
        info
      </Button>
    </>
  );
};
