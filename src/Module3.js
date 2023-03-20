import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "./components/utils/StyledButton";
import Spinner from "./components/utils/Spinner";
import Model from "./components/Module3/Model";

const Module3Div = styled.div`
  display: flex;
  height: 100%;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2%;
  align-items: center;
  justify-content: center;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2%;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  padding-left: 10%;
  padding-right: 10%;
  gap: 15px;
`;

const Image = styled.img`
  width: 100%;
`;

function Module3() {
  const [displaySpinner, setDisplaySpinner] = useState(false);

  const validate = () => {
    setDisplaySpinner(true);
    setTimeout(function () {
      setDisplaySpinner(false);
    }, 2000);
  };
  return (
    <Module3Div>
      <LeftDiv>
        <Image src={"https://placehold.co/600x600"} alt={"Template"} />
      </LeftDiv>
      <RightDiv>
        <Model src={"https://placehold.co/200x200"} alt={"image"} active />
        <Model src={"https://placehold.co/200x200"} alt={"image"} />
        <Model src={"https://placehold.co/200x200"} alt={"image"} />

        <Model src={"https://placehold.co/200x200"} alt={"image"} />
        <Model src={"https://placehold.co/200x200"} alt={"image"} />
        <Model src={"https://placehold.co/200x200"} alt={"image"} />

        <Model src={"https://placehold.co/200x200"} alt={"image"} />
        <Model src={"https://placehold.co/200x200"} alt={"image"} />
        <Model src={"https://placehold.co/200x200"} alt={"image"} />

        <StyledButton onClick={validate} style={{ marginTop: "30px" }}>
          Valider
        </StyledButton>
      </RightDiv>
      {displaySpinner && <Spinner />}
    </Module3Div>
  );
}

export default Module3;
