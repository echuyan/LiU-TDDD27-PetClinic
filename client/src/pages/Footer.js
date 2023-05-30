import React, { useState } from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles.js";

function Footer() {
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const getContent = () => {
    if (selectedLink === "address") {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    } else if (selectedLink === "mission") {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    } else if (selectedLink === "prices") {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    } else if (selectedLink === "hours") {
      return "Working hours: 8-17 each weekday. National holidays apply.";
    }
    return "";
  };

  return (
    <Box>
      <h1
        style={{
          color: "lightgrey",
          textAlign: "center",
          marginTop: "-50px",
          fontStyle: "italic",
        }}
      >
        We care. We cure.
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#" onClick={() => handleLinkClick("address")}>
              Address
            </FooterLink>
            <FooterLink href="#" onClick={() => handleLinkClick("mission")}>
              Our mission
            </FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#" onClick={() => handleLinkClick("prices")}>
              Prices
            </FooterLink>
            <FooterLink href="#" onClick={() => handleLinkClick("hours")}>
              Working hours
            </FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {selectedLink && <div>{getContent()}</div>}
      </div>
    </Box>
  );
}

export default Footer;
