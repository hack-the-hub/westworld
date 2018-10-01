import React from "react";
import css from "styled-jsx/css";
import { resolveScopedStyles } from "utils/styles";

export const linkStyles = resolveScopedStyles(
  <scope>
    <style jsx>{`
      .header__title__link {
        color: #fff;
        text-decoration: none;
      }
    `}</style>
  </scope>
);

export const iconStyles = resolveScopedStyles(
  <scope>
    <style jsx>{`
      .homepage-icon {
        color: #fff;
        font-size: 1.5em;
        height: 30px;
      }
    `}</style>
  </scope>
);

export default css`
  .header {
    background-color: #3490dc;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    padding: 0.5rem;
    position: fixed;
    top: 0;
    width: 46rem;
  }

  @media (min-width: 992px) {
    .header {
      margin-top: 0rem;
    }
  }

  .header__title {
    margin-left: 0.5rem;
    margin-top: 0.25rem;
  }

  .homepage-title {
    font-size: 20px;
    left: 0.3rem;
    position: relative;
    top: -0.1rem;
  }
`;
