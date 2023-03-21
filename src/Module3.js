import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "./components/utils/StyledButton";
import Spinner from "./components/utils/Spinner";
import Model from "./components/Module3/Model";
import flowers34 from "./public/Module3/BRV_AI_Flowers-34.png";
import flowers35 from "./public/Module3/BRV_AI_Flowers-35.png";
import flowers36 from "./public/Module3/BRV_AI_Flowers-36.png";
import flowers37 from "./public/Module3/BRV_AI_Flowers-37.png";

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

const ModelFound = styled.img`
  width: 150px;
  -webkit-filter: drop-shadow(2px 1px 0 black) drop-shadow(-1px -1px 0 black);
  filter: drop-shadow(2px 1px 0 black) drop-shadow(-1px -1px 0 black);
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
        <ModelFound
          src={flowers37}
          alt={"image"}
          style={{ position: "absolute" }}
        />
      </LeftDiv>
      <RightDiv>
        <Model src={flowers34} alt={"image"} />
        <Model src={flowers35} alt={"image"} />
        <Model src={flowers36} alt={"image"} />

        <Model src={flowers37} alt={"image"} />
        <Model src={flowers34} alt={"image"} />
        <Model src={flowers35} alt={"image"} />

        <Model src={flowers36} alt={"image"} />
        <Model src={flowers37} alt={"image"} />
        <Model src={flowers34} alt={"image"} />

        <StyledButton onClick={validate} style={{ marginTop: "30px" }}>
          Valider
        </StyledButton>
      </RightDiv>
      {displaySpinner && <Spinner />}
    </Module3Div>
  );
}

export default Module3;
