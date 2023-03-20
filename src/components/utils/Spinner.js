import React, { useEffect } from "react";
import styled from "styled-components";

const SpinnerDiv = styled.div`
  background-color: rgba(227, 236, 255, 0.6);
  z-index: 100;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerElement = styled.div`
      display: block;
      opacity: 0.9;
      width: 120px;
      height: 120px;
      border: 25px solid #628bff;
      border-radius: 50%;
      border-top-color: #ff8e7b;
      animation: spin 1s ease infinite;
      margin-left:auto;
      margin-right:auto;
    }

    @keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }

`;

export default function Spinner(props) {
  const [showElement, setShowElement] = React.useState(true);
  useEffect(() => {
    if (props.disappearAfter) {
      setTimeout(function () {
        setShowElement(false);
      }, props.disappearAfter);
    }
  }, [props.disappearAfter]);

  return (
    <>
      {showElement ? (
        <SpinnerDiv {...props}>
          <SpinnerElement />
        </SpinnerDiv>
      ) : (
        ""
      )}
    </>
  );
}
