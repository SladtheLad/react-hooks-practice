import React, { useContext } from 'react'
import styled from 'styled-components'

import AuthContext from '../auth-context'

const StyledHeader = styled.header`
  font-size: 32px;
`

const Button = styled.button`
  margin: auto;
  font-size: 32px;
  width: 5em;
  height: 2em;
  border-radius: 0.3em;
`

const Header = props => {
  const auth = useContext(AuthContext)
  return (
    <StyledHeader>
      {auth.status ? (
        <Button onClick={props.onLoadTodos}>Todo list</Button>
      ) : null}{' '}
      |<Button onClick={props.onLoadAuth}>Auth</Button>
    </StyledHeader>
  )
}

export default Header
