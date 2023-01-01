import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


*,
    *::after,
    *::before {
        box-sizing: border-box;
        margin: 0;
    }

    body {
        background: rgb(243, 243, 243);
        color: rgb(51, 51, 51);
        font-family: 'Karla', 'Times New Roman', Times, serif !important;
        letter-spacing: .6px;
    }

`;

export default GlobalStyle;
