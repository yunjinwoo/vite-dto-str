import React from "react";
import { ListAlt, Settings, Notifications, BorderTop, BorderOuter, DriveFileMove, Menu, RemoveCircle, Reorder } from "@mui/icons-material";
import Ui from "@features/gpt";
import CommentComponent from "./Comment/Comment";
import DonerMenu from "./DonerMenu/DonerMenu";

export interface UIElement {
  name: string;
  path: string;
  component: React.ReactNode;
  icon: React.ReactNode;
}

export const uiElements: UIElement[] = [
  {
    name: "아코디언 (Accordion)",
    path: "accordion",
    component: <Ui.AccordionSample />,
    icon: <BorderTop />,
  },
  {
    name: "벤토 메뉴 (Bento Menu)",
    path: "BentoMenu",
    component: <Ui.BentoMenuSample />,
    icon: <BorderOuter />,
  },
  {
    name: "브레드크럼 (Breadcrumb)",
    path: "breadcrumb",
    component: <Ui.Breadcrumb />,
    icon: <DriveFileMove />,
  },
  
  {
    name: "버튼 (Button)",
    path: "button",
    component: (
      <>
        <Ui.Button
          label="Test Button"
          onClick={() => alert("Button clicked!")}
        />
        <Ui.ButtonShowcase />
      </>
    ),
    icon: <Notifications />,
  },
  
  {
    name: "카드 (Card)",
    path: "card",
    component: <Ui.CardShowcase />,
    icon: <Menu />,
  },
  {
    name: "캐러셀 (Carousel)",
    path: "carousel",
    component: <Ui.CarouselShowcase  />,
    icon: <ListAlt />,
  },
  {
    name: "체크박스 (Checkbox-Mui)",
    path: "checkbox",
    component: <Ui.MuiForm  />,
    icon: <RemoveCircle />,
  },
  {
    name: "코멘트 (Comment)",
    path: "comment",
    component: <CommentComponent  />,
    icon: <RemoveCircle />,
  },
  {
    name: "도너 메뉴 (Doner Menu)",
    path: "donerMenu",
    component: <DonerMenu />,
    icon: <Reorder />,
  },
  {
    name: "Dropdown Showcase",
    path: "DropdownShowcase",
    component: <Ui.DropdownShowcase />,
    icon: <ListAlt />,
  },
  
  {
    name: "Modal",
    path: "modal",
    component: <Ui.ModalTest />,
    icon: <Settings />,
  },
  // 추가적인 UI 요소들을 여기에 추가합니다
];
