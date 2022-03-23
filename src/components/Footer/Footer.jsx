import "./Footer.css";

import { Container } from "react-bootstrap";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="footer">
      <Container>
        {/* <h3>TheCurrent</h3> */}
        {/* Built by{" "}
        <a
          href="https://github.com/allwells"
          target="_blank"
          rel="noopener noreferrer"
        >
          Allwell Onen
        </a> */}
        <a className="footerLogoLink" href="/">
          TheCurrent
        </a>
        , Anchor University © {currentYear}.
      </Container>
    </footer>
  );
}
