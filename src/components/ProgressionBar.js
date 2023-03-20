import React from "react";
import styled from "styled-components";
import { ProgressBar } from "@blueprintjs/core";

const ProgressionBarDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 8%;
  margin-right: 8%;
`;

const StyledProgressBar = styled(ProgressBar)``;

export default function ProgressionBar(props) {
  return (
    <ProgressionBarDiv>
      <StyledProgressBar value={props.progress || 0} stripes={false} />
    </ProgressionBarDiv>
  );
}
