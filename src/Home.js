import * as React from "react";
import { ThemeProvider } from "styled-components";

import Instructions from "./components/Instructions";
import Menu from "./components/Menu";
import Controls from "./components/Controls";
import ProgressionBar from "./components/ProgressionBar";
import Main from "./components/Main";
import logo from "./public/logo_brevet_ia.png";

import Module1 from "./Module1";
import Module2 from "./Module2";
import Module3 from "./Module3";

const LightTheme = {
  background: "#e3ecff",
  titleColor: "#dc658b",
  tagLineColor: "black"
};

const DarkTheme = {
  background: "#170F7C",
  titleColor: "lightpink",
  tagLineColor: "lavender"
};

const themes = {
  light: LightTheme,
  dark: DarkTheme
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
      fontSize: "2",
      main: <Module3 />,
      instructions: "Lorem Ipsum",
      step: 3,
      logs: [
        "Lorem <b>ipsum</b>",
        "Mauris non imperdiet erat. In accumsan libero ac metus elementum gravida.",
        "Test",
        "Mauris non imperdiet erat. In accumsan libero ac metus elementum gravida.",
        "Lorem ipsum",
        "Mauris non imperdiet erat. In accumsan libero ac metus elementum gravida."
      ]
    };
    this.changeTheme = this.changeTheme.bind(this);
    this.changeFontSize = this.changeFontSize.bind(this);
  }

  changeTheme = () => {
    console.log(this.state.theme);
    this.setState((prevState) => ({
      theme: prevState.theme === "dark" ? "light" : "dark"
    }));
  };

  changeFontSize = (fontSize) => {
    this.setState(() => ({
      fontSize: fontSize
    }));
  };

  componentDidMount() {}

  previous = () => {
    this.setState((prevState, props) => ({
      step: prevState.step - 1
    }));
  };

  next = () => {
    let string = "Lorem Ipsum ".repeat(Math.floor(Math.random() * 7 + 1));
    console.log(new Date().getDay());
    this.setState((prevState) => ({
      logs: [...this.state.logs, string]
    }));
  };

  changeMain = (component) => {
    this.setState({ main: component });
  };

  changeInstructions = (text) => {
    this.setState({ instructions: text });
  };

  changeModule = () => {
    this.setState((prevState) => ({
      main: prevState.main.type.name === "Module1" ? <Module2 /> : <Module1 />
    }));
  };

  render() {
    return (
      <ThemeProvider
        theme={{
          mode: themes[this.state.theme],
          fontSize: this.state.fontSize
        }}
      >
        <div
          id="Application"
          style={{ backgroundColor: themes[this.state.theme].background }}
        >
          <div id="Menu">
            <Menu
              theme={this.state.theme}
              changeTheme={this.changeTheme}
              fontSize={this.state.fontSize}
              changeFontSize={this.changeFontSize}
            />
          </div>
          <div id="Logo" onClick={this.changeModule}>
            <img
              src={logo}
              alt={"Logo"}
              style={{
                maxWidth: "200px",
                maxHeight: "100%",
                mixBlendMode: "multiply"
              }}
            />
          </div>
          <div id="Content">
            <div id="Main">
              <Main content={this.state.main} />
            </div>
            <div id="Instructions">
              {/*<Instructions text={this.state.logs[this.state.step % 3]} /> */}
              <Instructions logs={this.state.logs} />
              <Controls previous={this.previous} next={this.next} />
            </div>
            <div id="ProgressionBar">
              <ProgressionBar progress={this.state.step / 10} />
            </div>
          </div>{" "}
        </div>
      </ThemeProvider>
    );
  }
}

export default Home;
