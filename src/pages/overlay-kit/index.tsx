import { Box, Typography } from "@mui/material";
import Layout from "@widgets/Layout";
import { OverlayProvider } from "overlay-kit";
import Example2 from "./Example2";
import Example3 from "./Example3";
import Example4 from "./Example4";

/***
 * https://overlay-kit.slash.page/ko/quickstart.html
 * 1. 오버레이 추가하기
overlay-kit으로 오버레이를 열려면 먼저 오버레이가 렌더링될 곳을 지정해야 해요. 일반적으로 애플리케이션 루트에 오버레이를 렌더링합니다. 다른 요소들 위에 오버레이가 보이도록 말이죠.

<OverlayProvider /> 컴포넌트를 사용하면 됩니다. 애플리케이션 루트에 <OverlayProvider />를 추가해 볼게요.
 */

const Index = () => (
  <Layout title="overlay-kit">
    <Box>
      <Typography>https://overlay-kit.slash.page/ko/quickstart.html</Typography>
      <pre>
        소개 overlay-kit은 React로 웹 서비스를 개발할 때 자주 사용되는
        오버레이를 쉽게 관리할 수 있도록 도와주는 라이브러리입니다. 오버레이를
        열고 닫는 동작을 선언적으로 다루기 때문에 코드 가독성과 유지보수성이
        높아져요.
      </pre>

      <OverlayProvider>
        <Box>test11</Box>
      </OverlayProvider>
    </Box>
    <Box>
      <Typography># Example2</Typography>
      <Example2 />
    </Box>
    <Box>
      <Typography># Example3</Typography>
      <Example3 />
    </Box>
    <Box>
      <Typography># Example4</Typography>
      <Example4 />
    </Box>
    {/*  <Example5 /> */}
  </Layout>
);

export default Index;
