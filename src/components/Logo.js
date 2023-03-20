import React from "react";
import styled from "styled-components";
import logo from "../logo_brevet_ia.png";

const LogoDiv = styled.div``;
const LogoImg = styled.img``;

export function Logo() {
  return (
    <LogoDiv>
      <LogoImg src={logo} alt={"Logo"} />
    </LogoDiv>
  );
}
