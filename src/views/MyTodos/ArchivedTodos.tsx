import React from 'react';
import styled from 'styled-components';
import { TodoList } from './TodoList';
import { useArchivedTodos, useTodosManager } from './useTodos';

export function ArchivedTodos() {
  const archivedTodos = useArchivedTodos();
  const { updateTodo } = useTodosManager();

  if (!archivedTodos.length) {
    return null;
  }

  console.log('arch render');

  return (
    <Holder>
      <TitleHolder>Archived Todos</TitleHolder>
      <TodoListHolder>
        <TodoList todos={archivedTodos} onTodoUpdateRequest={updateTodo} />
      </TodoListHolder>
    </Holder>
  );
}

const Holder = styled.div``;
const TodoListHolder = styled.div`
  margin-bottom: 20px;
`;
const TitleHolder = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
