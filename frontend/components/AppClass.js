import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = "lady@gaga.com"
const initialSteps = 0
const initialIndex = 4
const board = ["", "", "", "", "", "", "", "", ""]
 // the index the "B" is at

const initialState = {
  letterB: "B",
  currentIndex: "",
  message: initialMessage,
  email: "",
  index: initialIndex,
  cordString: "2, 2",
  coordinates: [2, 2],
  movesX: 0,
  movesY: 0,
  steps: initialSteps,
  board: ["", "", "", "", "", "", "", "", ""],
  url: "http://localhost:9000/api/result"
}


export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  state = initialState;


  getXY = (index) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    var coordinates = []
    if (index === 0) {
      coordinates = [ 1, 1 ]
    } else if(index === 1) {
      coordinates = [ 2, 1 ]
    } else if(index === 2) {
      coordinates = [ 3, 1 ]
    } else if(index === 3) {
      coordinates = [ 1, 2 ]
    } else if(index === 4) {
      coordinates = [ 2, 2 ]
    } else if(index === 5) {
      coordinates = [ 3, 2 ]
    } else if(index === 6) {
      coordinates = [ 1, 3 ]
    } else if(index === 7) {
      coordinates = [ 2, 3 ]
    } else if(index === 8) {
      coordinates = [ 3, 3 ]
    }
    const string = `${coordinates[0]}, ${coordinates[1]}`
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
  if(direction === 'right' && this.state.index === 2) return "You can't go right"
  if(direction === 'right' && this.state.index === 5) return "You can't go right"
  if(direction === 'right' && this.state.index === 8) return "You can't go right"

  if(direction === 'left' && this.state.index === 0) return "You can't go left"
  if(direction === 'left' && this.state.index === 3) return "You can't go left"
  if(direction === 'left' && this.state.index === 6) return "You can't go left"

  if(direction === 'up' && this.state.index === 0) return "You can't go up"
  if(direction === 'up' && this.state.index === 1) return "You can't go up"
  if(direction === 'up' && this.state.index === 2) return "You can't go up"

  if(direction === 'down' && this.state.index === 6) return "You can't go down"
  if(direction === 'down' && this.state.index === 7) return "You can't go down"
  if(direction === 'down' && this.state.index === 8) return "You can't go down"
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
  })
    // This event handler can use the helper above to
    //obtain a new index for the "B",
    // and change any states accordingly.
    //move(getNextIndex)
  }

  onChange = (event) => {
    const {value} = event.target
    this.setState({
      ...this.state,
      email: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const payload = {
       x: this.state.coordinates[0],
       y: this.state.coordinates[1],
       steps: this.state.steps,
       email: this.state.email }

    axios.post(this.state.url, payload)
      .then(res => {
        console.log(res.data.message)
        this.setState({
          ...this.state,
          message: [res.data.message],
          email: "",
        })
      })
      .catch(res => {
        this.setState({
          ...this.state,
          message: res.response.data.message,
        email: ""
      })
      })
  }

  render() {
    const { className } = this.props
    const { board, currentTurn, cordString, steps, message } = this.state
    const cords = this.getXY(this.state.index)

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">({cords})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? "time" : "times"}</h3>
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
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onClick={this.onSubmit}>
          <input value={this.state.email} onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
