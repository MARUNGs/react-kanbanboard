import ReactDOM from "react-dom/client";
import App from "./app";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "./styles/app-styled";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
