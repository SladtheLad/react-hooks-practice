import React, { useEffect, useReducer, useMemo } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import List from './List'
import { useFormInput } from '../hooks/forms'

const Button = styled.button`
  margin: auto;
  font-size: 32px;
  width: 5em;
  height: 2em;
  border-radius: 0.3em;
`

const Input = styled.input`
  ::placeholder {
    color: black;
  }
  ${props =>
    props.inputValidity
      ? `
  background-color: #d6d8cd;
  color: black`
      : `
  background-color: #ea1263;
  color: black`};
`

const Todo = props => {
  // useState can only be used at the top level of the functional component, never in nested blocks.
  // const [todoName, setTodoName] = useState('')
  // const [submittedTodo, setSubmittedTodo] = useState(null)
  // const [todoList, setTodoList] = useState([])

  // const [inputValidity, setInputValidity] = useState(false)

  // const todoInputRef = useRef()
  const todoInput = useFormInput()

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload)
      case 'SET':
        return action.payload
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload)
      default:
        return state
    }
  }

  const [todoList, dispatch] = useReducer(todoListReducer, [])

  useEffect(() => {
    axios
      .get('https://react-hooks-practice-47cf4.firebaseio.com/todos.json')
      .then(response => {
        const todoData = response.data
        const todos = []
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name })
        }
        dispatch({ type: 'SET', payload: todos })
      })
    return () => {
      console.log('cleanup')
    }
  }, [])

  // useEffect(
  //   todoList => {
  //     if (submittedTodo) {
  //       dispatch({ type: 'ADD', payload: submittedTodo })
  //     }
  //   },
  //   [submittedTodo]
  // )

  // const inputChangeHandler = event => {
  //   setTodoName(event.target.value)
  // }

  const todoAddHandler = () => {
    const todoName = todoInput.value

    axios
      .post('https://react-hooks-practice-47cf4.firebaseio.com/todos.json', {
        name: todoName
      })
      .then(response => {
        const todoItem = {
          id: response.data.name,
          name: todoName
        }
        dispatch({ type: 'ADD', payload: todoItem })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const onKeyDownHandler = event => {
    const todoName = todoInput.value

    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      axios
        .post('https://react-hooks-practice-47cf4.firebaseio.com/todos.json', {
          name: todoName
        })
        .then(response => {
          const todoItem = {
            id: response.data.name,
            name: todoName
          }
          dispatch({ type: 'ADD', payload: todoItem })
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      return
    }
  }

  const todoRemoveHandler = todoId => {
    axios
      .delete(
        `https://react-hooks-practice-47cf4.firebaseio.com/todos/${todoId}.json`
      )
      .then(response => {
        dispatch({ type: 'REMOVE', payload: todoId })
      })
      .catch(error => {
        console.log(error)
      })
  }

  // const inputValidationHandler = event => {
  //   if (event.target.value.trim() === '') {
  //     setInputValidity(false)
  //   } else {
  //     setInputValidity(true)
  //   }
  // }

  return (
    <React.Fragment>
      <Input
        type="text"
        placeholder="Todo"
        onKeyDown={onKeyDownHandler}
        onChange={todoInput.onChange}
        value={todoInput.value}
        inputValidity={todoInput.inputValidity}
        // style={{backgroundColor: inputValidity ? 'transparent' : 'red'}}
      />
      <Button type="submit" onClick={todoAddHandler}>
        Add
      </Button>

      {/* useMemo for helping prevent unnecessary re-renders */}
      {useMemo(
        () => (
          <List todoList={todoList} onClick={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </React.Fragment>
  )
}

export default Todo
