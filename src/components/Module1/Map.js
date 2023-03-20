import React from "react";
import styled from "styled-components";
import map from "../../public/plan2.png";
import Grid from "./Grid";

const MapDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  display: flex;
`;

const MapImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export default function Map(props) {
  return (
    <MapDiv>
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <Grid x={props.x || 0} y={props.y || 0} direction={props.direction} />
      </div>
      <MapImg src={map} alt={"Map"} width={"900px"} />
    </MapDiv>
  );
}
