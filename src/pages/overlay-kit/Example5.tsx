import { Box, Button } from "@mui/material";
import ky from "ky";
import { overlay } from "overlay-kit";

// eslint-disable-next-line react-refresh/only-export-components
function ErrorDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Box>
      여기서 open - {open} 이렇게 쓰는거 맞나??
      <Button onClick={onClose}>onClose</Button>
    </Box>
  );
}

/*
5. 네트워크 오류 처리하기
마지막으로 API 오류가 발생했을 때를 대비해 React 외부에서 오버레이를 열어 확인할 수 있도록 해 볼게요. */
const api = ky.extend({
  hooks: {
    afterResponse: [
      (_, __, response) => {
        if (response.status >= 400) {
          overlay.open(({ isOpen, close }) => {
            return <ErrorDialog open={isOpen} onClose={close} />;
          });
        }
      },
    ],
  },
});

export default api;
