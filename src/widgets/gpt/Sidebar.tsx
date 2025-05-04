import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { uiElements } from "@features/gpt/uiElements";
import { Alert } from "@mui/material";

const UI_LIST = [
  "11. 피드 (Feed)",
  "12. 폼 (Form)",
  "13. 햄버거 메뉴 (Hamberger Menu)",
  "14. 아이콘 (Icon)",
  "15. 인풋 필드 (Input Field)",
  "16. 케밥 메뉴 (Kebab Menu)",
  "17. 로더 (Loader)",
  "18. 미트볼 메뉴 (Meatballs Menu)",
  "19. 모달 (Modal)",
  "20. 뱃지 (Badge)",
  "21. 페이지네이션 (Pagenation)",
  "22. 픽커 (Picker)",
  "23. 프로그레스 바 (Progress Bar)",
  "24. 라디오 버튼 (Radio Buttons)",
  "25. 서치 필드 (Search Field)",
  "26. 사이드바 (Sidebar)",
  "27. 슬라이더 컨트롤 (Slider Controls)",
  "28. 스텝퍼 (Stepper)",
  "29. 태그 (Tag)",
  "30. 탭 바 (Tab Bar)",
  "31. 툴팁 (Tooltip)",
  "32. 토글 (Toggle)",
];
const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Components</h2>
      <h4>
        <a
          href="https://velog.io/@oneook/프론트엔드-개발자라면-반드시-알아두어야-할-32가지의-UI-요소-번역"
          target="_blank"
        >
          [참고링크]
        </a>
      </h4>
      <ol>
        {uiElements.map((element) => (
          <li key={element.path}>
            <NavLink to={element.path}>{element.name}</NavLink>
          </li>
        ))}
      </ol>

      <Alert>32중 여기까지...</Alert>
      <ul>
        {UI_LIST.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
