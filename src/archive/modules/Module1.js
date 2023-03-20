import * as React from "react";
import Maze from "./Maze";
import Canvas from "./Draw/Canvas";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import { Button } from "@blueprintjs/core";

import imagePixelBase64 from "./Draw/imagePixelBase64.png";

/* export default function Module1() {
  return(
    <div className="ScormModule">
      <div className="LeftPanel">
        Gauche
      </div>
      <div className="RightPanel">
        Gauche
      </div>
    </div>
  );
} */

class Module1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      textarea: "",
      aiResult: "",
      cells: Array.from({ length: 25 }, () => 0)
    };
    this.setCells = this.setCells.bind(this);
  }

  setCells(cells) {
    this.setState({
      cells
    });
  }

  componentDidMount() {
    let deck = new Reveal({
      plugins: [Markdown]
    });
    this.setState({ deck });
    deck.initialize({ controls: true, transition: "fade" });

    let c = document.getElementById("pixelsCanva");
    let ctx = c.getContext("2d");

    let image = new Image();
    //image.src = imagePixel;
    image.src = imagePixelBase64;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, c.width, c.height);
      ctx.imageSmoothingEnabled = false;
    };
  }

  handleClick = () => {
    console.log("Test");
    this.state.deck.next();
  };

  handleChange = (event) => {
    this.setState({ textarea: event.target.value });
  };

  valider = () => {
    let result = this.state.textarea.toUpperCase();
    console.log(result);
    this.setState({ aiResult: result });
  };

  resetCells = () => {
    this.setState({
      cells: Array.from({ length: 25 }, () => 0)
    });
  };

  validateDrawing = () => {
    let c = document.getElementById("pixelsCanva");
    let ctx = c.getContext("2d");
    let imageData = ctx.getImageData(0, 0, c.width, c.height);
    let startPixelsMatch = this.findPattern(this.state.cells, imageData);
    console.log(startPixelsMatch);
    this.drawResult(startPixelsMatch);
    //console.log(imageData);
    //console.log(this.state.cells);
  };

  drawResult = (pixels) => {
    let c = document.getElementById("pixelsCanva");
    let width = c.width;
    let ctx = c.getContext("2d");
    ctx.fillStyle = "blue";
    pixels.forEach(function (pixel, i) {
      let x = Math.floor(pixel) % width;
      let y = Math.floor(pixel / width);
      console.log(y);
      ctx.fillRect(x, y, 1, 1);
    });
  };

  pixelToXY = (pixel, width) => {
    let x = (pixel / 4) % width;
    var y = Math.floor(pixel / 4 / width);
    return [x, y];
  };

  findPattern = (patternPixels, target) => {
    let patternWidth = 5;
    let targetWidth = target.width;
    let targetPixels = target.data.filter((_, i) => i % 4 === 0);
    targetPixels.forEach(function (item, i) {
      if (item === 0) targetPixels[i] = 1;
      else targetPixels[i] = 0;
    });

    let matchingPixels = [];
    let maxPixelToSearch = targetWidth * (targetWidth - 4) - 1; // remove last 4 rows

    targetPixels.forEach(function (itemTarget, iTarget) {
      if (iTarget > maxPixelToSearch) return false;
      else if ((iTarget % targetWidth) + patternWidth - 1 >= targetWidth)
        // remove last 4 columns
        return false;

      patternPixels.every(function (itemPattern, iPattern) {
        let iTargetToCompare =
          iTarget +
          (iPattern % patternWidth) +
          target.width * Math.trunc(iPattern / patternWidth);
        if (targetPixels[iTargetToCompare] === itemPattern) {
          if (iPattern === 24) {
            matchingPixels.push(iTarget);
          }
          return true;
        } else {
          return false;
        }
      });
    });
    return matchingPixels;
  };

  render() {
    return (
      <div className="reveal">
        {/* Any section element inside of this container is displayed as a slide */}
        <div className="slides">
          <section>
            <div className="container">
              <div
                className="col"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Canvas cells={this.state.cells} setCells={this.setCells} />
                <Button
                  intent="danger"
                  text="Effacer"
                  onClick={this.resetCells}
                  style={{ width: "30vmin" }}
                />
                <Button
                  intent="success"
                  text="Valider"
                  onClick={this.validateDrawing}
                  style={{ width: "30vmin" }}
                />
              </div>
              <div className="col">
                {/* <img src={imagePixel} alt="Pixels" style={{width:'70%'}} className="noAntialias"/> */}
                <canvas
                  id="pixelsCanva"
                  width="30"
                  height="30"
                  style={{ width: "300px" }}
                  className="noAntialias"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="col">{this.state.aiResult}</div>

              <div
                className="col"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <textarea
                  rows="17"
                  cols="43"
                  style={{ flex: 1 }}
                  value={this.state.textarea}
                  onChange={this.handleChange}
                ></textarea>
                <Button
                  intent="success"
                  text="Valider"
                  onClick={this.valider}
                />
              </div>
            </div>
          </section>

          <section>
            <h2>Marvelous List</h2>
            <ul>
              <li>No order here</li>
              <li>Or here</li>
              <li>Or here</li>
              <li className="fragment">Or here</li>
            </ul>
          </section>

          <section>
            <h2>Fantastic Ordered List</h2>
            <ol>
              <li>One is smaller than...</li>
              <li>Two is smaller than...</li>
              <li>Three!</li>
            </ol>
          </section>
        </div>
      </div>
    );
  }
}

export default Module1;
