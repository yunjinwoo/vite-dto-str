import { Button } from "@mui/material";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export const RouterButton = ({
  path,
  children,
}: PropsWithChildren<{ path: string }>) => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(path)}>{children}</Button>;
};
