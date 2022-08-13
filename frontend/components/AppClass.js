import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4
const board = ["", "", "", "", "", "", "", "", ""]
 // the index the "B" is at

const initialState = {
  letterB: "B",
  currentIndex: "",
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  cordString: "2, 2",
  coordinates: [2, 2],
  movesX: 0,
  movesY: 0,
  steps: initialSteps,
  board: ["", "", "", "", "", "", "", "", ""]
}


export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  state = initialState;

  handleTurn = (index) => {
    console.log(index);
    const message = this.getXYMessage(index)
    const coordinates = this.getXY(index)
    const newBoard = [ ...this.state.board];
    newBoard[index] = this.state.currentIndex;
    this.setState({
      ...this.state,
      board: newBoard,
      currentIndex: this.move(this.state.currentIndex),
      steps: this.state.steps + 1,
      cordString: message,
      coordinates: coordinates,
      index: index,
    })
    console.log(coordinates)
    console.log(message)

    //return message
  }

  getXY = (index) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    var coordinates = []
    if (index === 0) {
      coordinates = [ 1, 1 ]
    } else if(index === 1) {
      coordinates = [ 1, 2 ]
    } else if(index === 2) {
      coordinates = [ 1, 3 ]
    } else if(index === 3) {
      coordinates = [ 2, 1 ]
    } else if(index === 4) {
      coordinates = [ 2, 2 ]
    } else if(index === 5) {
      coordinates = [ 2, 3 ]
    } else if(index === 6) {
      coordinates = [ 3, 1 ]
    } else if(index === 7) {
      coordinates = [ 3, 2 ]
    } else if(index === 8) {
      coordinates = [ 3, 3 ]
    }
    return coordinates
  }

  getXYMessage = (idx) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const cords = this.getXY(idx)
    const string = `${cords[0]}, ${cords[1]}`
    return string

  }

  reset = () => {
    this.setState(initialState)
  }

  getNextIndex = (direction) => {
    //const array = [0, 1, 2,
                  // 3, 4, 5,
                   //6, 7, 8]

    // This helper takes a direction ("left", "up", etc) and
    // calculates what the next index
    // of the "B" would be. If the move is
    //impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //const cords = this.state.coordinates;
    // ```js
    //   (1, 1) (2, 1) (3, 1)
    //   (1, 2) (2, 2) (3, 2)
    //   (1, 3) (2, 3) (3, 3)
    // ```


    if(direction === 'right' && this.state.index === 2 ) return this.state.index
    if(direction === 'right' && this.state.index === 5 ) return this.state.index
    if(direction === 'right' && this.state.index === 8 ) return this.state.index

    if(direction === 'left' && this.state.index === 0 ) return this.state.index
    if(direction === 'left' && this.state.index === 3 ) return this.state.index
    if(direction === 'left' && this.state.index === 6 ) return this.state.index

    if(direction === 'up' && this.state.index === 0 ) return this.state.index
    if(direction === 'up' && this.state.index === 1 ) return this.state.index
    if(direction === 'up' && this.state.index === 2 ) return this.state.index

    if(direction === 'down' && this.state.index === 6 ) return this.state.index
    if(direction === 'down' && this.state.index === 7 ) return this.state.index
    if(direction === 'down' && this.state.index === 8 ) return this.state.index

    if(direction === 'right') return this.state.index + 1
    if(direction === 'left') return this.state.index - 1
    if(direction === 'up') return this.state.index - 3
    if(direction === 'down') return this.state.index + 3
}


//This handles all the error messages when a user tries to
//move the box further than it can go.
errors = (direction) => {
  if(direction === 'right' && this.state.index === 2) return "You can't move right"
  if(direction === 'right' && this.state.index === 5) return "You can't move right"
  if(direction === 'right' && this.state.index === 8) return "You can't move right"

  if(direction === 'left' && this.state.index === 0) return "You can't move left"
  if(direction === 'left' && this.state.index === 3) return "You can't move left"
  if(direction === 'left' && this.state.index === 6) return "You can't move left"

  if(direction === 'up' && this.state.index === 0) return "You can't move up"
  if(direction === 'up' && this.state.index === 1) return "You can't move up"
  if(direction === 'up' && this.state.index === 2) return "You can't move up"

  if(direction === 'down' && this.state.index === 6) return "You can't move down"
  if(direction === 'down' && this.state.index === 7) return "You can't move down"
  if(direction === 'down' && this.state.index === 8) return "You can't move down"
}


increaseSteps = (direction) => {
    if(direction === 'right' && this.state.index === 0) return this.state.steps + 1
    if(direction === 'right' && this.state.index === 3) return this.state.steps + 1
    if(direction === 'right' && this.state.index === 6) return this.state.steps + 1
    if(direction === 'right' && this.state.index === 1) return this.state.steps + 1
    if(direction === 'right' && this.state.index === 4) return this.state.steps + 1
    if(direction === 'right' && this.state.index === 7) return this.state.steps + 1

    if(direction === 'left' && this.state.index === 1) return this.state.steps + 1
    if(direction === 'left' && this.state.index === 4) return this.state.steps + 1
    if(direction === 'left' && this.state.index === 7) return this.state.steps + 1
    if(direction === 'left' && this.state.index === 2) return this.state.steps + 1
    if(direction === 'left' && this.state.index === 5) return this.state.steps + 1
    if(direction === 'left' && this.state.index === 8) return this.state.steps + 1

    if(direction === 'up' && this.state.index === 3) return this.state.steps + 1
    if(direction === 'up' && this.state.index === 4) return this.state.steps + 1
    if(direction === 'up' && this.state.index === 5) return this.state.steps + 1
    if(direction === 'up' && this.state.index === 6) return this.state.steps + 1
    if(direction === 'up' && this.state.index === 7) return this.state.steps + 1
    if(direction === 'up' && this.state.index === 8) return this.state.steps + 1

    if(direction === 'down' && this.state.index === 0) return this.state.steps + 1
    if(direction === 'down' && this.state.index === 1) return this.state.steps + 1
    if(direction === 'down' && this.state.index === 2) return this.state.steps + 1
    if(direction === 'down' && this.state.index === 3) return this.state.steps + 1
    if(direction === 'down' && this.state.index === 4) return this.state.steps + 1
    if(direction === 'down' && this.state.index === 5) return this.state.steps + 1

    else return this.state.steps
}



  move = (event) => {
    this.setState({...this.state,
    index: this.getNextIndex(event.target.id),
    steps: this.increaseSteps(event.target.id),
    message: this.errors(event.target.id),
    coordinates: this.getXY(this.state.index),
  })
    // This event handler can use the helper above to
    //obtain a new index for the "B",
    // and change any states accordingly.
    //move(getNextIndex)
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    const { board, currentTurn, cordString, steps } = this.state

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{cordString}</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? "B" : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={() => this.reset()} id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
