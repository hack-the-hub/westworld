import React from "react";
import css from "styled-jsx/css";
import { resolveScopedStyles } from "utils/styles";

export const linkStyles = resolveScopedStyles(
  <scope>
    <style jsx>{`
      .navigation-link {
        color: #dae1e7;
      }
      .navigation-link:hover{
        color: white;
      }
    `}</style>
  </scope>
);

export default css`
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0.25rem 0.25rem 0 1.25rem;
  }

  li {
    top: 0.22rem;
    position: relative;
    margin-right: 1.25rem;
  }
  
`;
