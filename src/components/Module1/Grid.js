import React from "react";
import styled from "styled-components";

import velo from "../../public/velo.png";

const SHOW_BORDER = false;
const WIDTH = 17;
const HEIGHT = 9;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  position: relative;
  height: 100%;
  grid-template-columns: repeat(${WIDTH}, 1fr);
  grid-template-rows: repeat(${HEIGHT}, 1fr);
`;

const Cell = styled.div`
  border: ${SHOW_BORDER ? 1 : 0}px solid black;
`;

const Character = styled.img`
  width: 5%;
  position: absolute;
  transition: 0.2s linear;
`;

function Grid(props) {
  const x = props.x || 0;
  const y = props.y || 0;
  // créer les cases de la grille
  const cells = [];
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      cells.push(<Cell key={`${i}-${j}`}></Cell>);
    }
  }
  return (
    <GridContainer>
      {cells}
      <Character
        src={velo}
        style={{
          left: "calc(100 / " + WIDTH + " * " + x + "% - 0%)",
          top: "calc(100 / " + HEIGHT + " * " + y + "% - 3%)",
          transform: "rotate(" + props.direction + "deg)"
        }}
      />
    </GridContainer>
  );
}

export default Grid;
