import React from "react";
import styled from "styled-components";

const ControlsDiv = styled.div`
  bottom: 0;
  right: 10px;
  position: absolute;
  height: 55px;
`;

const Arrow = styled.button`
  background-color: white;
  color: black;
  border-radius: 50%;
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  border: 2px solid #e3ecff;
  margin: 3px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #638bff;
    color: white;
  }
`;

export default function Controls(props) {
  return (
    <ControlsDiv>
      <Arrow onClick={props.previous}>&#8249;</Arrow>
      <Arrow onClick={props.next}>&#8250;</Arrow>
    </ControlsDiv>
  );
}
