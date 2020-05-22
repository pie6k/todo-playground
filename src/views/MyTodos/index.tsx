import React from 'react';
import styled from 'styled-components';
import { ArchivedTodos } from './ArchivedTodos';
import { ActiveTodos } from './ActiveTodos';

export function MyTodos() {
  return (
    <Holder>
      <ActiveTodosHolder>
        <ActiveTodos />
      </ActiveTodosHolder>
      <ArchivedTodos />
    </Holder>
  );
}

const Holder = styled.div``;
const ActiveTodosHolder = styled.div`
  margin-bottom: 20px;
`;
