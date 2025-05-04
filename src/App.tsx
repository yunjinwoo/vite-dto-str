/**
 * https://dev.to/franciscomendes10866/file-based-routing-using-vite-and-react-router-3fdo
 * https://velog.io/@developer-sora/TIL-React-Vite에서-next.js처럼-라우팅하기feat.typescript
 * //import "./App.css";
 * */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WordGameRoutes from "./pages/word";
import GptComponents from "@pages/gpt";
import Community from "@pages/gpt/community";
import Dashboard from "@pages";
import Sudoku from "@pages/sudoku";
import SweetAlert2 from "@pages/sweetalert2";
import OverlayKit from "@pages/overlay-kit";
import StrRegExp from "@pages/StrRegExp";
import GanttChart from "@pages/gantt";
import FrappeGanttChart from "@pages/gantt/FrappeGanttChart";
import Layout from "@widgets/Layout";

const ErrorBoundary = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">페이지를 찾을 수 없습니다.</p>
        <a href="/" className="text-blue-500 hover:underline">홈으로 돌아가기</a>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/word/*",
    element: <WordGameRoutes />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/gpt/*",
    element: <GptComponents />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/sudoku",
    element: <Sudoku />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/sweetalert2",
    element: <SweetAlert2 />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/overlay-kit",
    element: <OverlayKit />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/StrRegExp",
    element: <StrRegExp />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/gantt",
    element: <Layout title="Gantt Chart"><GanttChart /></Layout>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/gantt/frappe",
    element: <FrappeGanttChart />,
    errorElement: <ErrorBoundary />
  }
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
