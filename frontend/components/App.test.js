import server from './../../backend/mock-server'
import React from 'react'
import AppFunctional from './AppFunctional'
import AppClass from './AppClass'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


// Write your tests here

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}


[AppFunctional, AppClass].forEach((Component, idx) => {
  const label = idx === 0 ? 'FUNCTIONAL' : 'CLASS-BASED'

  describe(`${label}`, () => {
    beforeAll(() => { server.listen() })
    afterAll(() => { server.close() })
    beforeEach(() => {
      render(<Component />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
    })
    afterEach(() => {
      server.resetHandlers()
      document.body.innerHTML = ''
    })

    test("renders the header", async() => {
      const header = screen.getByText(/This is the Header!/i)
      expect(header).toBeInTheDocument()
    });

    test("checks for correct index based on square clicks", async() => {

    }
})
})
