import React from 'react';
import styled from 'styled-components';
import { TodoList } from './TodoList';
import { useActiveTodos, useTodosManager } from './useTodos';

import { NewTodoForm } from './NewTodoForm';

export function ActiveTodos() {
  const activeTodos = useActiveTodos();
  const { createTodo, updateTodo } = useTodosManager();

  return (
    <Holder>
      <TodoListHolder>
        <TodoList todos={activeTodos} onTodoUpdateRequest={updateTodo} />
      </TodoListHolder>
      <NewTodoFormHolder>
        <NewTodoForm onCreateRequest={createTodo} />
      </NewTodoFormHolder>
    </Holder>
  );
}

const Holder = styled.div``;
const TodoListHolder = styled.div`
  margin-bottom: 20px;
`;
const NewTodoFormHolder = styled.div`
  margin-bottom: 40px;
`;
