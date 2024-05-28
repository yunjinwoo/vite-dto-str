# chatgpt 에서 받은 코드 추가
```
//1. Documentation 페이지
npm install react-markdown remark remark-html
//2. Community 페이지 
npm install firebase
//3. Blog 페이지
npm install gatsby
```

my-ui-library/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   └── Button.test.tsx
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.css
│   │   │   └── Input.test.tsx
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   ├── Modal.css
│   │   │   └── Modal.test.tsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   ├── Home.css
│   │   │   └── ...
│   │   ├── Components/
│   │   │   ├── Components.tsx
│   │   │   ├── Components.css
│   │   │   └── ...
│   │   ├── Documentation/
│   │   │   ├── Documentation.tsx
│   │   │   ├── Documentation.css
│   │   │   └── ...
│   │   ├── Community/
│   │   │   ├── Community.tsx
│   │   │   ├── Community.css
│   │   │   └── ...
│   │   └── Blog/
│   │       ├── Blog.tsx
│   │       ├── Blog.css
│   │       └── ...
│   │
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
│
├── assets/
│   ├── images/
│   ├── fonts/
│   └── ...
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── documentation/
│   ├── Button.md
│   ├── Input.md
│   ├── Modal.md
│   └── ...
│
├── community/
│   ├── posts/
│   └── ...
│
└── blog/
    ├── post1.md
    ├── post2.md
    └── ...




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
vite-project
├─ .eslintrc.cjs
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ features
│  │  └─ StrRegExp
│  │     ├─ AppRefactor1.tsx
│  │     ├─ AppRefactor2.tsx
│  │     ├─ ButtonTestCode.tsx
│  │     └─ StrRegExp.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ gpt
│  │  │  ├─ Components.css
│  │  │  ├─ Components.tsx
│  │  │  ├─ Home.tsx
│  │  │  └─ index.tsx
│  │  ├─ index.tsx
│  │  └─ StrRegExp
│  │     ├─ AppRefactor1.tsx
│  │     ├─ AppRefactor2.tsx
│  │     └─ index.tsx
│  ├─ shared
│  │  ├─ gpt
│  │  │  ├─ Button
│  │  │  │  ├─ Button.css
│  │  │  │  └─ Button.tsx
│  │  │  └─ Modal
│  │  │     ├─ Modal.css
│  │  │     └─ Modal.tsx
│  │  └─ RouterButton.tsx
│  ├─ utils
│  │  ├─ navigatorClipboardWrite.ts
│  │  └─ Str.ts
│  ├─ vite-env.d.ts
│  └─ widgets
│     ├─ gpt
│     │  ├─ Layout.css
│     │  └─ LayoutGPT.tsx
│     ├─ Layout.tsx
│     └─ ListItem.tsx
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```