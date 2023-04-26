import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles.js";

const Footer = () => {
return (
	<Box>
	<h1 style={{ color: "lightgrey",
				textAlign: "center",
				marginTop: "-50px",
				fontStyle: "italic"}}>
		We care. We cure.
	</h1>
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink href="#">Address</FooterLink>
			<FooterLink href="#">Our doctors</FooterLink>
			<FooterLink href="#">Our mission</FooterLink>
		</Column>
		<Column>
			<Heading>Services</Heading>
			<FooterLink href="#">Prices</FooterLink>
			<FooterLink href="#">Working hours</FooterLink>
		
		</Column>
	
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			
		</Column>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
