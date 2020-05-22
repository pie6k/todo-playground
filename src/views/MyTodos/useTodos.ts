import { Todo, TodoInput, TodoUpdateInput, useTodosStore } from 'data';
import { StateUpdater, updateState } from 'services/updateState';
import { generateId } from './createId';

export function useTodo(todoId: string) {
  const [todo, updateStore] = useTodosStore((store) => {
    return store.find((todo) => todo.id === todoId) ?? null;
  });

  function update(data: TodoUpdateInput) {
    updateStore((todos) => {
      return todos.map((existingTodo) => {
        if (existingTodo.id !== todoId) {
          return existingTodo;
        }

        return { ...existingTodo, ...data };
      });
    });
  }

  function remove() {
    updateStore((currentTodos) => {
      return currentTodos.filter((existingTodo) => {
        return existingTodo.id !== todoId;
      });
    });
  }

  return {
    todo,
    update,
    remove,
  };
}

export function useTodosManager() {
  const [, updateTodos] = useTodosStore((store) => null);

  function removeTodo(id: string) {
    updateTodos((currentTodos) => {
      return currentTodos.filter((existingTodo) => {
        return existingTodo.id !== id;
      });
    });
  }

  function updateTodo(id: string, updater: StateUpdater<TodoUpdateInput>) {
    updateTodos((currentTodos) => {
      return currentTodos.map((existingTodo) => {
        if (existingTodo.id !== id) {
          return existingTodo;
        }

        return updateState(existingTodo, updater);
      });
    });
  }

  function createTodo(input: TodoInput) {
    const newTodo: Todo = {
      id: generateId(),
      ...input,
    };
    updateTodos((currentTodos) => {
      return [...currentTodos, newTodo];
    });
  }

  return {
    removeTodo,
    createTodo,
    updateTodo,
  };
}

function getIsTodoActive(todo: Todo) {
  if (todo.isArchived || todo.isRemoved) {
    return false;
  }

  return true;
}

export function useActiveTodos() {
  const [activeTodos] = useTodosStore((allTodos) => {
    return allTodos.filter(getIsTodoActive);
  });

  return activeTodos;
}

export function useArchivedTodos() {
  const [archivedTodos] = useTodosStore((allTodos) => {
    return allTodos.filter((todo) => {
      return todo.isArchived;
    });
  });

  return archivedTodos;
}
