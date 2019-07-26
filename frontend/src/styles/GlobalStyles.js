import {createGlobalStyle} from 'styled-components';
import {colors} from './Colors';
import {Font} from './Font';
import {CSSReset} from './CSSReset';

export const GlobalStyle = createGlobalStyle`
	${CSSReset}

	* {
		box-sizing: border-box;
	}

	html {
		font-size: 62.5%;
		line-height: 190%;
		scroll-behavior: smooth;
	}

	body {
		font-size: 1.6rem;
		font-family: ${Font};
		background-color: ${colors.background};
        line-height: 170%;
        color: ${colors.textOnBG}
    }

    button {
        font-size: 1.6rem;
        font: ${Font};
        background-color: ${colors.background};
        border: none;
        text-decoration: underline;
        transition: all .2s;

        &:hover{
            color: ${colors.hoverColor};
        }
        &:active{
            color: ${colors.active};
        }
    }

	h1{
		font-weight: bold;
	}

	h2 {
		font-weight: bold;
		font-size: 2rem;
		color: ${colors.textOnBG};
	}

	h3 {
		font-weight: bold;
		font-size: 1.6rem;
		color: ${colors.textOnBG};
	}
`;
