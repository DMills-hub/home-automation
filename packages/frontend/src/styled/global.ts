import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif; 
    }

    body,html {
        width: 100%;
        height: 100%;
    }

    #root{
        margin:0 auto;
        width: 100%;
        height: 100%;
    }
 `
