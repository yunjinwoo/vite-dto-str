import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { overlay } from "overlay-kit";

// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// // import DialogContent from "@mui/material/DialogContent";
// // import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

/**3. 사용자가 클릭한 버튼 결과 처리하기
이제 사용자가 어떤 버튼을 클릭했는지 알고 싶어요. overlay-kit은 Promise와 함께 사용할 수 있기 때문에 쉽게 오버레이로부터 결과를 얻어올 수 있죠. 다음과 같이 boolean 값을 가지는 Promise로 감싸면 돼요.
 */
function Example3() {
  return (
    <button
      onClick={async () => {
        const agreed = await new Promise<boolean>((resolve) => {
          overlay.open(({ isOpen, close }) => {
            const agree = () => {
              resolve(true);
              close();
            };

            const cancel = () => {
              resolve(false);
              close();
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

        console.log("agreed - ", agreed);
        /*
         * 사용자가 "네"를 눌렀다면, `agreed` 는 `true`가 돼요.
         * 아니면, `agreed`는 `false`예요.
         */
      }}
    >
      Alert Dialog 열기
    </button>
  );
}

export default Example3;
