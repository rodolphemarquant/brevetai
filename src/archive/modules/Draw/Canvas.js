//https://morioh.com/p/826d81652448
import * as React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.width || 5}, 1fr);
  grid-template-columns: repeat(${(props) => props.width || 5}, 1fr);
  width: 40vmin;
  height: 40vmin;
  border: 2px solid #c9d9f5;
  border-radius: 20px;
  overflow: hidden;
`;

const Cell = styled.div`
  cursor: pointer;
  border: 1px solid #c9d9f5;
  background: white;
  transition: all 200ms linear;
`;

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("Cells" + this.props.cells);
  }

  updateCell = (i) => (e) => {
    e.preventDefault();
    if (this.props.locked) return;
    // if left or right click is pressed
    if (e.buttons === 1 || e.buttons === 2) {
      this.props.setCells(
        this.props.cells.map((cell, cellIndex) => {
          if (cellIndex === i) {
            if (e.buttons === 1) {
              return 1;
            }
            return 0;
          }
          return cell;
        })
      );
    }
  };

  render() {
    return (
      <Grid {...this.props}>
        {this.props.cells.map((cell, i) => (
          <Cell
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{
              background: cell
                ? this.props.locked
                  ? "#170F7C"
                  : "#FF8E7B"
                : "#ffffff"
            }}
            //className={classes.cell}
            onMouseOver={this.updateCell(i)}
            onMouseDown={this.updateCell(i)}
            onContextMenu={(e) => e.preventDefault()}
          />
        ))}
      </Grid>
    );
  }
}

export default Canvas;
