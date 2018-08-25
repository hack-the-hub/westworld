import css from "styled-jsx/css";

export default css`
  .footer {
    position: fixed;
    margin-left: 0;
    width: 39rem;
    //^ comment above two lines out to stop the footer from staying in place
    bottom: 0;
    background-color: rgba(10, 20, 40, 0.5);
    padding: 0.5rem;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    font-size: 0.75rem;
    color: #fff;
  }

  @media (min-width: 992px) {
    .footer {
      //margin-bottom: 1rem;
      
    }
  }

  a {
    background-color: rgba(10, 20, 40, 0.5);
    color: #fff;
    border-radius: 0.25rem;
    text-decoration: none;
    padding: 0.25rem;
  }
`;
