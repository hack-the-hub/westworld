import css from "styled-jsx/css";

export default css`
  .loading-container {
    margin-top: 47.5%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 47.5%;
    width: 5em;
  }

  @media (min-width: 992px){
    .loading-container{
      margin-top: 21rem;
      margin-bottom: 24rem;
      padding-bottom: 40rem;
    }
  }
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #3490dc;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0.5, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 28px;
      left: 28px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 58px;
      height: 58px;
      opacity: 0;
    }
  }
`;
