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
function Example4() {
  return (
    <button
      onClick={async () => {
        const agreed = await new Promise<boolean>((resolve) => {
          overlay.open(({ isOpen, close, unmount }) => {
            const agree = () => {
              resolve(true);
              close();
              setTimeout(unmount, 150); // 애니메이션 지속 시간에 맞춰서 설정하세요.
            };

            const cancel = () => {
              resolve(false);
              close();
              setTimeout(unmount, 150); // 애니메이션 지속 시간에 맞춰서 설정하세요.
            };

            return (
              <Dialog open={isOpen} onClose={cancel}>
                <DialogTitle>정말 계속하시겠어요?</DialogTitle>
                <DialogActions>
                  <Button onClick={cancel}>아니요</Button>
                  <Button onClick={agree}>네</Button>
                </DialogActions>
              </Dialog>
            );
          });
        });

        /*
         * 사용자가 "네"를 눌렀다면, `agreed` 는 `true`가 돼요.
         * 아니면, `agreed`는 `false`예요.
         */
      }}
    >
      Alert Dialog 열기
      <Box>
        4. 오버레이 닫기와 메모리 관리 오버레이가 닫힐 때 메모리 누수를 피하려면
        오버레이를 닫은 뒤 Unmount까지 해야 합니다. 오버레이를 닫으면 화면에서는
        오버레이가 사라진 것처럼 보이지만 메모리와 React 요소 트리에는 남아있기
        때문이에요. 자세한 내용은 메모리 관리 문서를 참고하세요. 사용자가 "네"
        또는 "아니요" 버튼을 클릭한 후, 오버레이가 닫히는 애니메이션이 끝나면
        오버레이를 Unmount하여 메모리 누수를 방지하는 코드를 추가해 볼게요.
      </Box>
    </button>
  );
}

export default Example4;
