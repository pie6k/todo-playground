import React from 'react';
import './App.css';

import { MyTodos } from './views';
import styled from 'styled-components';

function App() {
  return (
    <AppHolder>
      <Wrapper>
        <MyTodos />
      </Wrapper>
    </AppHolder>
  );
}

export default App;

const AppHolder = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 500px;
`;
