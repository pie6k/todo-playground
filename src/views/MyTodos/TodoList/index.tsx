import React from 'react';
import { Todo, TodoUpdateInput } from 'data';
import styled from 'styled-components';
import { TodoLabel } from 'domains/todo';
import { StateUpdater } from 'services/updateState';

interface Props {
  todos: Todo[];
  onTodoUpdateRequest: (todoId: string, input: StateUpdater<TodoUpdateInput>) => void;
}

export function TodoList({ todos, onTodoUpdateRequest }: Props) {
  return (
    <Holder>
      {todos.map((todo) => {
        return (
          <SingleTodoHolder key={todo.id}>
            <TodoLabel
              todo={todo}
              onArchiveToggleRequest={() => {
                onTodoUpdateRequest(todo.id, (oldTodo) => {
                  oldTodo.isArchived = !oldTodo.isArchived;
                });
              }}
              onRemoveToggleRequest={() => {
                onTodoUpdateRequest(todo.id, { isRemoved: true });
              }}
              onUpdateRequest={(todoUpdateInput) => {
                onTodoUpdateRequest(todo.id, todoUpdateInput);
              }}
            />
          </SingleTodoHolder>
        );
      })}
    </Holder>
  );
}

const Holder = styled.div``;
const SingleTodoHolder = styled.div`
  margin-bottom: 10px;
`;
