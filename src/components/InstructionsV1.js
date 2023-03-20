import React from "react";
import styled, { withTheme } from "styled-components";
import mascotte from "../public/mascotte.png";

const InstructionsDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  background-color: white;
  text-align: left;
  padding: 10px 20px;
  height: calc(100% - 10px);
  position: relative;
  font-weight: 400;
  border-radius: 30px;
  font-size: 15px;
  color: black;
  margin: 5px 15px;

  @media only screen and (min-width: 600px) {
    /* Desktop */
    margin: 2vh 10vw;
    font-size: 20px;
    height: calc(100% - 4vh);
    width: 75%;

    &:before {
      content: "";
      width: 0px;
      height: 0px;
      position: absolute;
      border-left: 10px solid transparent;
      border-right: 10px solid white;
      border-top: 10px solid transparent;
      border-bottom: 10px solid white;
      left: -19px;
      bottom: 19px;
    }
  }
`;

const Mascotte = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100px;
  position: absolute !important;
  bottom: 0;

  @media only screen and (max-width: 900px) {
    width: 80px;
  }
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const fontSizes = {
  "1": "70%",
  "2": "100%",
  "3": "140%"
};

class Instructions extends React.Component {
  render() {
    return (
      <InstructionsDiv>
        <Container>
          <div
            style={{
              overflow: "auto",
              maxHeight: "100%",
              fontSize: fontSizes[this.props.theme.fontSize]
            }}
          >
            {this.props.text || ""}
          </div>
        </Container>
        <Mascotte
          src={mascotte}
          style={{ mixBlendMode: "multiply" }}
          alt={"Mascotte"}
        />
      </InstructionsDiv>
    );
  }
}

export default withTheme(Instructions);
