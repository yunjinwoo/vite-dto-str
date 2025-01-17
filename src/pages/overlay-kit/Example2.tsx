import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { overlay } from "overlay-kit";

// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// // import DialogContent from "@mui/material/DialogContent";
// // import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

/**
 * https://overlay-kit.slash.page/ko/quickstart.html#_2-오버레이-열기
 * 2. 오버레이 열기
이제 버튼을 클릭했을 때 오버레이를 여는 기능을 추가해볼게요. <OverlayProvider /> 안에서 오버레이를 열려면 overlay.open()을 호출하면 돼요.

우리는 Material UI의 <Dialog />를 열고 싶으니, 다음과 같이 코드를 작성할 수 있어요.
 */
function Example2() {
  return (
    <>
    <Box>코드상으론 해당 내용이 어딘가에 출력되는건줄알았는데 그냥 바로 출력되네??</Box>
      <button
        onClick={() => {
          overlay.open(({ isOpen, close }) => {
            console.log("🚀 ~ overlay.open ~ close:", close)
            console.log("🚀 ~ overlay.open ~ isOpen:", isOpen)
            return (
              <>
                {close} & {isOpen}이거 이거 되는거야??
              </>
            );
          });
        }}
      >
        Text test 열기
      </button>
      <button
        onClick={() => {
          overlay.open(({ isOpen, close }) => {
            return (
              <Dialog open={isOpen} onClose={close}>
                <DialogTitle>정말로 계속하시겠어요?</DialogTitle>
                <DialogActions>
                  <Button onClick={close}>아니요</Button>
                  <Button onClick={close}>네</Button>
                </DialogActions>
              </Dialog>
            );
          });
        }}
      >
        Alert Dialog 열기
      </button>
    </>
  );
}

export default Example2;
