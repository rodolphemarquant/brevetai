import React from "react";
import styled from "styled-components";

const COLORS = {
  danger: "#AC2F33",
  success: "#1C6E42"
};

const StyledButton2 = styled.button`
  cursor: pointer;
  min-width: 100px;

  background-color: ${(props) =>
    props.intent ? COLORS[props.intent] : "white"};
  padding: 3px;
  border-radius: 30px;
  font-size: 110%;
  color: ${(props) => (props.intent ? "white" : "#f09379")};
  border: 1px solid
    ${(props) => (props.intent ? COLORS[props.intent] : "#f09379")};

  -webkit-box-shadow: 0px 0px 11px 2px rgba(255, 142, 123, 0.68);
  box-shadow: 0px 0px 11px 2px rgba(255, 142, 123, 0.68);

  &:hover {
  }
  &:active {
    background-color: ${(props) => (props.intent ? "white" : "#f09379")};
    color: ${(props) => (props.intent ? COLORS[props.intent] : "white")};
  }
`;

export default function StyledButton(props) {
  return (
    <>
      <StyledButton2 {...props} />
    </>
  );
}
