import React, { Component } from "react";
import styled from "styled-components";
import Canvas from "./components/Module2/Canvas";
import Template from "./components/Module2/template";
import StyledButton from "./components/utils/StyledButton";

const CANVAS_WIDTH = 7;

const Module2Div = styled.div`
  display: flex;
  height: 100%;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

const Col = styled.div`
  flex: 1;
  display: flex;
  white-space: pre-wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

class Module2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      cells: Array.from({ length: CANVAS_WIDTH * CANVAS_WIDTH }, () => 0)
    };
    this.setCells = this.setCells.bind(this);
  }

  setCells(cells) {
    this.setState({
      cells
    });
  }

  resetCells = () => {
    this.setState({
      cells: Array.from({ length: CANVAS_WIDTH * CANVAS_WIDTH }, () => 0)
    });
  };

  componentDidMount() {}

  validateDrawing = () => {
    if (JSON.stringify(this.state.cells) === JSON.stringify(Template)) {
      this.setState({ result: "Oui" });
    } else {
      this.setState({ result: "Non" });
    }
  };

  render() {
    return (
      <Module2Div>
        <Col>
          {/* <img src={imagePixel} alt="Pixels" style={{width:'70%'}} className="noAntialias"/> */}
          <Canvas cells={Template} width={CANVAS_WIDTH} locked={true} />
        </Col>
        <Col>
          <Canvas
            cells={this.state.cells}
            setCells={this.setCells}
            width={CANVAS_WIDTH}
          />
          <StyledButton
            onClick={this.resetCells}
            intent={"danger"}
            style={{ width: "30vmin", marginTop: "5px" }}
          >
            Effacer
          </StyledButton>
          <StyledButton
            style={{ width: "30vmin", marginTop: "5px" }}
            intent={"success"}
            onClick={this.validateDrawing}
          >
            Valider
          </StyledButton>
          <br />
          <strong>{this.state.result}</strong>
        </Col>
      </Module2Div>
    );
  }
}

export default Module2;
