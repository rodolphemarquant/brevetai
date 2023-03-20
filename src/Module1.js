import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Map from "./components/Module1/Map";
import ArrowBottom from "./public/arrow_bottom.png";
import ArrowLeft from "./public/arrow_left.png";
import ArrowRight from "./public/arrow_right.png";
import ArrowUp from "./public/arrow_up.png";
import Template from "./components/Module1/template";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const WIDTH = 17;
const HEIGHT = 9;
const START_X = 5;
const START_Y = 8;

const MAX_ITEMS = 30;

const MazeDiv = styled.div`
  display: grid;
  height: 100%;
  margin: 0;
  grid-template-columns: 0.6fr 0.4fr;
  grid-template-rows: 1fr 0.7fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "ContentA ContentA"
    "ContentC ContentB";

  @media only screen and (min-width: 600px) {
    grid-template-columns: 4fr 1fr;
    grid-template-rows: 2fr 0.6fr;
    grid-template-areas:
      "ContentA ContentB"
      "ContentC ContentC";
  }
`;

const ContentA = styled.div`
  grid-area: ContentA;
  min-height: 0;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ContentB = styled.div`
  grid-area: ContentB;
  display: flex;
  align-items: center;
  min-height: 0;
`;

const ContentC = styled.div`
  grid-area: ContentC;
  display: flex;
  align-items: stretch;
  min-height: 0;
`;

const MapImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  if (destination.length >= MAX_ITEMS) return destination;

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];
  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Item = styled.div`
  display: flex;
  width: 80px;
  flex-shrink: 0;
  height: 80px;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border-radius: 15px;
  background-size: contain;
  border: ${(props) =>
    props.isDragging ? "1px dashed #4099ff" : "1px solid #00659D"};

  @media only screen and (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

const List = styled.div`
  border: ${(props) =>
    props.isDraggingOver ? "0px dashed #000" : "0px solid #E3ECFF"};
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  box-sizing: border-bo;
  font-family: sans-serif;
`;

const Kiosk = styled(List)`
  width: 100px;
  align-self: center;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 600px) {
    top: 0;
    bottom: auto;
    width: 70px;
    margin-right: 0;
  }
`;

const Container = styled(List)`
  align-self: center;
  flex: 0.9;
  overflow-y: hidden;
  overflow-x: auto;
  margin-left: auto;
  margin-right: auto;
  background: #bed2fc;
  display: flex;
  height: calc(80px + 1rem);
  border-radius: 15px;

  @media only screen and (max-width: 600px) {
    height: 80%;
  }
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: DarkSlateGrey;
`;

const StyledButton = styled.button`
  background-color: white;
  padding: 3px;
  border-radius: 10px;
  font-size: 110%;
  color: #f09379;
  border: 2px solid #f09379;

  &:hover {
  }
  &:active {
    background-color: #f09379;
    color: white;
  }
`;

const ITEMS = [
  {
    id: uuid(),
    content: "Haut",
    image: ArrowUp
  },
  {
    id: uuid(),
    content: "Droite",
    image: ArrowRight
  },
  {
    id: uuid(),
    content: "Bas",
    image: ArrowBottom
  },
  {
    id: uuid(),
    content: "Gauche",
    image: ArrowLeft
  }
];

const KEYS = {
  38: 0, // up
  39: 1, // right
  40: 2, // down
  37: 3 // left
};

class Module1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      list: { steps: [] },
      x: START_X,
      y: START_Y,
      direction: 0
    };
  }

  componentDidMount() {
    this.onKeyPressed = this.onKeyPressed.bind(this);
    document.addEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed(e) {
    if (this.state.steps.length >= MAX_ITEMS) return;
    if ([37, 38, 39, 40].includes(e.keyCode)) {
      this.setState({
        steps: [...this.state.steps, { ...ITEMS[KEYS[e.keyCode]], id: uuid() }]
      });
    }
    if (e.keyCode === 13) {
      // enter
      this.validate();
    }
  }

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          )
        });
        break;
      case "ITEMS":
        this.setState({
          [destination.droppableId]: copy(
            ITEMS,
            this.state[destination.droppableId],
            source,
            destination
          )
        });
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };

  validate = () => {
    this.executeSteps();
  };

  isCellBlocked = (x, y, grid) => {
    // Vérifie si la case est hors de la grille
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
      return true;
    }

    // Vérifie si la case est bloquée
    return grid[y][x] === 0;
  };

  executeSteps = async () => {
    for (let step of this.state.steps) {
      let direction = 0;
      let newX = this.state.x;
      let newY = this.state.y;
      await sleep(500);
      switch (step.content) {
        case "Haut":
          newX = this.state.x;
          newY = this.state.y - 1;
          direction = 0;
          //this.setState((prevState, props) => ({ y: Math.max(prevState.y - 1, 0) }));
          break;
        case "Bas":
          newX = this.state.x;
          newY = this.state.y + 1;
          direction = 180;
          //this.setState((prevState, props) => ({ y: Math.min(prevState.y + 1, HEIGHT - 1) }));
          break;
        case "Gauche":
          newX = this.state.x - 1;
          newY = this.state.y;
          direction = 270;
          //this.setState((prevState, props) => ({ x: Math.max(prevState.x - 1, 0) }));
          break;
        case "Droite":
          newX = this.state.x + 1;
          newY = this.state.y;
          direction = 90;
          //this.setState((prevState, props) => ({ x: Math.min(prevState.x + 1, WIDTH - 1) }));
          break;
        default:
          break;
      }
      if (!this.isCellBlocked(newX, newY, Template)) {
        this.setState((prevState) => ({
          x: newX,
          y: newY,
          direction: direction
        }));
      }
      this.setState({ steps: this.state.steps.slice(1) });
    }
  };

  reset = () => {
    this.setState({ steps: [], x: START_X, y: START_Y });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <MazeDiv>
          <ContentA>
            <Map
              x={this.state.x}
              y={this.state.y}
              direction={this.state.direction}
            />
          </ContentA>
          <Droppable droppableId="ITEMS" isDropDisabled={true}>
            {(provided, snapshot) => (
              <ContentB>
                <Kiosk
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {ITEMS.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <React.Fragment>
                          <Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                          >
                            <img
                              src={item.image}
                              alt={item.content}
                              style={{ width: "100%" }}
                            />
                          </Item>
                          {snapshot.isDragging && (
                            <Clone>
                              <img
                                src={item.image}
                                alt={item.content}
                                style={{ width: "100%" }}
                              />
                            </Clone>
                          )}
                        </React.Fragment>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </Kiosk>
              </ContentB>
            )}
          </Droppable>
          <ContentC>
            {Object.keys(this.state.list).map((list, i) => {
              return (
                <Droppable key={list} droppableId={list} direction="horizontal">
                  {(provided, snapshot) => (
                    <Container
                      ref={provided.innerRef}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {this.state[list].length
                        ? this.state[list].map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Item
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  isDragging={snapshot.isDragging}
                                >
                                  <img
                                    src={item.image}
                                    alt={item.content}
                                    style={{ width: "100%" }}
                                  />
                                </Item>
                              )}
                            </Draggable>
                          ))
                        : !provided.placeholder && (
                            <Notice>Déposez les flèches ici</Notice>
                          )}
                      {provided.placeholder}
                      <StyledButton
                        onClick={this.validate}
                        style={{
                          position: "absolute",
                          width: "130px",
                          left: 0,
                          right: 0,
                          marginLeft: "auto",
                          marginRight: "auto",
                          bottom: 0
                        }}
                      >
                        Valider
                      </StyledButton>
                      <button
                        onClick={this.reset}
                        style={{
                          position: "absolute",
                          backgroundColor: "white",
                          border: "2px solid #BED2FC",
                          color: "#75A4EE",
                          borderRadius: "10px",
                          width: "80px",
                          left: "5%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          bottom: 0
                        }}
                      >
                        Reset
                      </button>
                    </Container>
                  )}
                </Droppable>
              );
            })}
          </ContentC>
        </MazeDiv>
      </DragDropContext>
    );
  }
}

export default Module1;
