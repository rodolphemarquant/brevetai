import React from "react";
import styled, { withTheme } from "styled-components";

// update dangerouslySetInnerHTML to DOMPurify package
const fontSizes = {
  "1": "80%",
  "2": "110%",
  "3": "145%"
};

const ChatBoxDiv = styled.div`
  background-color: white;
  height: max-content;
  min-width: 80px;
  flex-flow: column wrap;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  position: relative;
  transition: 0.2s linear;

  &:before {
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    border-color: rgba(37, 45, 49, 0);
    border-top-color: white;
    border-width: 20px;
    left: 25px;
    bottom: -39px;
    transform: scale(0.5, 1);
  }
`;

function ChatBox(props) {
  return (
    <ChatBoxDiv
      style={{
        opacity: props.opacity,
        fontSize: fontSizes[props.theme.fontSize]
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </ChatBoxDiv>
  );
}

export default withTheme(ChatBox);
