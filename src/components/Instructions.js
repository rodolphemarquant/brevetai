import React from "react";
import styled, { withTheme } from "styled-components";
import ChatBox from "./utils/ChatBox";
import mascotte from "../public/mascotte.png";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const InstructionsDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  padding: 10px;
  overflow: auto;
  font-family: Changa-Light, Roboto, serif !important;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Mascotte = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 120px;
  bottom: 0;

  @media only screen and (max-width: 900px) {
    width: 80px;
  }
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

function Instructions(props) {
  return (
    <Container>
      <InstructionsDiv>
        <TransitionGroup
          style={{
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {props.logs.map((log, index) => {
            let opacity = props.logs[index + 2]
              ? 0.6
              : props.logs[index + 1]
              ? 0.8
              : 1;
            return (
              <CSSTransition
                style={{ alignItems: "flex-start" }}
                in={true}
                // nodeRef={someRef}
                key={index}
                timeout={1500}
                classNames="item"
              >
                <ChatBox text={log} opacity={opacity} key={index} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </InstructionsDiv>
      <Mascotte
        src={mascotte}
        style={{ mixBlendMode: "multiply" }}
        alt={"Mascotte"}
      />
    </Container>
  );
}

export default withTheme(Instructions);
