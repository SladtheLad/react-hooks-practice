import React from 'react'

import styled from 'styled-components'

const StyledList = styled.ul`
  font-size: 26px;
  margin: auto;
`

const List = props => {
  console.log('Rendering the list')

  const { todoList, onClick } = props

  return (
    <StyledList>
      {todoList.map(todoItem => (
        <li key={todoItem.id} onClick={onClick.bind(this, todoItem.id)}>
          {todoItem.name}
        </li>
      ))}
    </StyledList>
  )
}

export default List
