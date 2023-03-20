import React, { useState } from "react";
import styled from "styled-components";

const ImageModel = styled.img`
  cursor: pointer;
  max-width: 26%;
  height: auto;
  ${(props) =>
    props.isSelected
      ? "box-shadow: 0px 0px 9px 1px rgba(255, 142, 123, 0.68)"
      : ""};
`;

export default function Model(props) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <ImageModel
      src={props.src}
      isSelected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
      {...props}
    />
  );
}
