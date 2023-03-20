import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export default function Main(props) {
  return <MainDiv>{props.content || ""}</MainDiv>;
}
