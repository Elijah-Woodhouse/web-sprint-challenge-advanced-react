import React, {setState, useState} from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = 'lady@gaga.com'
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
  board: ["", "", "", "", "", "", "", "", ""],
  url: "http://localhost:9000/api/result"
}


export default function AppFunctional(props){
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [state, setState] = useState(initialState);


  const getXY = (index) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    // ```js
    //   (1, 1) (2, 1) (3, 1)
    //   (1, 2) (2, 2) (3, 2)
    //   (1, 3) (2, 3) (3, 3)
    // ```
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

  const reset = () => {
    setState(initialState)
  }

  const getNextIndex = (direction) => {
    //const array = [0, 1, 2,
                  // 3, 4, 5,
                   //6, 7, 8]

    // This helper takes a direction ("left", "up", etc) and
    // calculates what the next index
    // of the "B" would be. If the move is
    //impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //const cords = this.state.coordinates;


    if(direction === 'right' && state.index === 2 ) return state.index
    if(direction === 'right' && state.index === 5 ) return state.index
    if(direction === 'right' && state.index === 8 ) return state.index

    if(direction === 'left' && state.index === 0 ) return state.index
    if(direction === 'left' && state.index === 3 ) return state.index
    if(direction === 'left' && state.index === 6 ) return state.index

    if(direction === 'up' && state.index === 0 ) return state.index
    if(direction === 'up' && state.index === 1 ) return state.index
    if(direction === 'up' && state.index === 2 ) return state.index

    if(direction === 'down' && state.index === 6 ) return state.index
    if(direction === 'down' && state.index === 7 ) return state.index
    if(direction === 'down' && state.index === 8 ) return state.index

    if(direction === 'right') return state.index + 1
    if(direction === 'left') return state.index - 1
    if(direction === 'up') return state.index - 3
    if(direction === 'down') return state.index + 3


}


//This handles all the error messages when a user tries to
//move the box further than it can go.
const errors = (direction) => {
  if(direction === 'right' && state.index === 2) return "You can't go right"
  if(direction === 'right' && state.index === 5) return "You can't go right"
  if(direction === 'right' && state.index === 8) return "You can't go right"

  if(direction === 'left' && state.index === 0) return "You can't go left"
  if(direction === 'left' && state.index === 3) return "You can't go left"
  if(direction === 'left' && state.index === 6) return "You can't go left"

  if(direction === 'up' && state.index === 0) return "You can't go up"
  if(direction === 'up' && state.index === 1) return "You can't go up"
  if(direction === 'up' && state.index === 2) return "You can't go up"

  if(direction === 'down' && state.index === 6) return "You can't go down"
  if(direction === 'down' && state.index === 7) return "You can't go down"
  if(direction === 'down' && state.index === 8) return "You can't go down"
}


const increaseSteps = (direction) => {
    if(direction === 'right' && state.index === 0) return state.steps + 1
    if(direction === 'right' && state.index === 3) return state.steps + 1
    if(direction === 'right' && state.index === 6) return state.steps + 1
    if(direction === 'right' && state.index === 1) return state.steps + 1
    if(direction === 'right' && state.index === 4) return state.steps + 1
    if(direction === 'right' && state.index === 7) return state.steps + 1

    if(direction === 'left' && state.index === 1) return state.steps + 1
    if(direction === 'left' && state.index === 4) return state.steps + 1
    if(direction === 'left' && state.index === 7) return state.steps + 1
    if(direction === 'left' && state.index === 2) return state.steps + 1
    if(direction === 'left' && state.index === 5) return state.steps + 1
    if(direction === 'left' && state.index === 8) return state.steps + 1

    if(direction === 'up' && state.index === 3) return state.steps + 1
    if(direction === 'up' && state.index === 4) return state.steps + 1
    if(direction === 'up' && state.index === 5) return state.steps + 1
    if(direction === 'up' && state.index === 6) return state.steps + 1
    if(direction === 'up' && state.index === 7) return state.steps + 1
    if(direction === 'up' && state.index === 8) return state.steps + 1

    if(direction === 'down' && state.index === 0) return state.steps + 1
    if(direction === 'down' && state.index === 1) return state.steps + 1
    if(direction === 'down' && state.index === 2) return state.steps + 1
    if(direction === 'down' && state.index === 3) return state.steps + 1
    if(direction === 'down' && state.index === 4) return state.steps + 1
    if(direction === 'down' && state.index === 5) return state.steps + 1

    else return state.steps
}



  const move = (event) => {
    setState({...state,
    index: getNextIndex(event.target.id),
    steps: increaseSteps(event.target.id),
    message: errors(event.target.id),
  })
    // This event handler can use the helper above to
    //obtain a new index for the "B",
    // and change any states accordingly.
    //move(getNextIndex)
    console.log(state.message)
  }

  const onChange = (event) => {
    setState({
      ...state,
      email: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const payload = {
       x: state.coordinates[0],
       y: state.coordinates[1],
       steps: state.steps,
       email: state.email }

    axios.get(state.url, payload)
      .then(res => {
        console.log(res.data.message)
        setState({...state, message: [res.data.message], email: ""})
      })
      .catch(res => {
        setState({...state, message: res.response.data.message})
      })
      .finally(res => {
        setState({...this.state, message: ""})
      })
  }

  return (

    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({getXY(state.index)})</h3>
        <h3 id="steps">You moved {state.steps} {state.steps < 2 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
              {idx === state.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email"></input>
        <input onChange={onChange} id="submit" type="submit"></input>
      </form>
    </div>
  )
}
