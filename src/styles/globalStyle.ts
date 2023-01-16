import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,
    *::after,
    *::before {
        box-sizing: border-box;
        margin: 0;
    }

    body {
        font-family: 'Karla', 'Times New Roman', Times, serif !important;
        letter-spacing: .6px;
    }

`;

export default GlobalStyle;
