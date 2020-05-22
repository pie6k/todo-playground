import { createStore } from 'services/store';

export type TodoState = 'completed' | 'active' | 'archived';

export interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
  isArchived: boolean;
  isRemoved: boolean;
}

export type TodoInput = Omit<Todo, 'id'>;
export type TodoUpdateInput = Partial<TodoInput>;

export const todosDb: Todo[] = [
  {
    id: '1',
    name: 'Clean car',
    isRemoved: false,
    isCompleted: false,
    isArchived: false,
  },
  {
    id: '2',
    name: 'Call',
    isRemoved: false,
    isCompleted: false,
    isArchived: false,
  },
];

export const [useTodosStore] = createStore<Todo[]>({
  initialValue: todosDb,
  persistanceKey: 'todos',
});
