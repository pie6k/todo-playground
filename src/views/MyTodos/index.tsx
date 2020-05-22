import React from 'react';
import styled from 'styled-components';
import { TodoList } from './TodoList';
import { useActiveTodos, useTodosManager } from './useTodos';
import { ArchivedTodos } from './ArchivedTodos';

import { NewTodoForm } from './NewTodoForm';

export function MyTodos() {
  const activeTodos = useActiveTodos();
  const { createTodo, updateTodo } = useTodosManager();

  return (
    <UIHolder>
      <TodoListHolder>
        <TodoList todos={activeTodos} onTodoUpdateRequest={updateTodo} />
      </TodoListHolder>
      <NewTodoFormHolder>
        <NewTodoForm onCreateRequest={createTodo} />
      </NewTodoFormHolder>
      <ArchivedTodos />
    </UIHolder>
  );
}

const UIHolder = styled.div``;
const TodoListHolder = styled.div`
  margin-bottom: 20px;
`;
const NewTodoFormHolder = styled.div`
  margin-bottom: 40px;
`;
