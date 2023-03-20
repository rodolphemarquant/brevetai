import React, { useState } from "react";
import styled from "styled-components";
import settings from "../public/settings.svg";
import user from "../public/user.svg";

import {
  Dialog,
  DialogBody,
  Radio,
  RadioGroup,
  Switch
} from "@blueprintjs/core";

const MenuDiv = styled.div`
  width: min-content;
  display: flex;
  border-radius: 15px;
  background-color: white;
  padding: 4px 10px 0px 10px;
  margin: 8px 20px;

  @media only screen and (max-width: 600px) {
    margin: 3px;
    background-color: transparent;
  }
`;
const MenuButton = styled.button`
  all: unset;
  cursor: pointer;
`;

export default function Menu(props) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState("2");
  const [justification, setJustification] = useState("1");

  const searchClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsModalOpen(false);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
    props.changeFontSize(event.target.value);
  };

  const hanldeJustificationChange = (event) => {
    setJustification(event.target.value);
  };

  return (
    <MenuDiv>
      <MenuButton onClick={searchClick}>
        <img src={settings} width={50} height={50} alt={"Rechercher"} />
      </MenuButton>
      <MenuButton>
        <img src={user} width={50} height={50} alt={"Rechercher"} />
      </MenuButton>
      <Dialog
        title="Paramètres"
        icon="settings"
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettings}
      >
        <DialogBody useOverflowScrollContainer={true}>
          <RadioGroup
            inline={true}
            label="Taille du texte"
            name="fontSize"
            onChange={handleFontSizeChange}
            selectedValue={fontSize}
          >
            <Radio label="Petit" value={"1"} />
            <Radio label="Moyen" value={"2"} />
            <Radio label="Grand" value={"3"} />
          </RadioGroup>
          <br />
          <RadioGroup
            inline={true}
            label="Justification"
            name="justification"
            onChange={hanldeJustificationChange}
            selectedValue={justification}
          >
            <Radio label="Défaut" value="1" />
            <Radio label="Supprimer" value="2" />
          </RadioGroup>
          <br />
          <br />
          <Switch
            checked={props.theme === "dark"}
            label="Thème sombre"
            onChange={props.changeTheme}
          />
        </DialogBody>
      </Dialog>
    </MenuDiv>
  );
}
