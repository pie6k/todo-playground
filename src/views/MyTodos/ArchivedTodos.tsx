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

  return (
    <UIHolder>
      <TitleHolder>Archived Todos</TitleHolder>
      <TodoListHolder>
        <TodoList todos={archivedTodos} onTodoUpdateRequest={updateTodo} />
      </TodoListHolder>
    </UIHolder>
  );
}

const UIHolder = styled.div``;
const TodoListHolder = styled.div`
  margin-bottom: 20px;
`;
const TitleHolder = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
