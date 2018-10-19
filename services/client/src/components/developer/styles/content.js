import css from "styled-jsx/css";

export default css`
  .developer-content {
    font-size: 1rem;
    font-weight: 200;
    margin-bottom: 0.5rem;
  }

  .developer-content span {
    font-size: 0.75rem;
    font-weight: 200;
    color: black;
    padding-bottom: 0.5rem;
    padding-right: 15px;
  }

  .developer-title a {
    text-decoration: none;
  }

  .developer-bio {
    font-size: 0.75rem;
    font-weight: 100;
    padding-bottom: 0.5rem;
    color: rgb(152, 159, 165);
  }

  @media (max-width: 576px) {
    .developer-content span {
      display: block;
    }
  }
`;
