import { Todo, TodoUpdateInput } from 'data';
import React, { useState } from 'react';
import styled from 'styled-components';
import { TodoName } from './Name';
import { Tools } from './Tools';

interface Props {
  todo: Todo;
  onUpdateRequest: (input: TodoUpdateInput) => void;
  onRemoveToggleRequest: () => void;
  onArchiveToggleRequest: () => void;
}

export function TodoLabel({
  todo,
  onUpdateRequest,
  onArchiveToggleRequest,
  onRemoveToggleRequest,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <UIHolder
      isFocused={isFocused}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <UICheckHolder>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(event) => {
            onUpdateRequest({ isCompleted: event.target.checked });
          }}
        />
      </UICheckHolder>
      <UIInfoHolder>
        <TodoName
          currentName={todo.name}
          onNameChangeRequest={(newName) => {
            onUpdateRequest({ name: newName });
          }}
        />
      </UIInfoHolder>
      {isFocused && (
        <ToolsHolder>
          <ToolsPopoverBody>
            <Tools
              onArchiveRequest={onArchiveToggleRequest}
              onRemoveRequest={onRemoveToggleRequest}
            />
          </ToolsPopoverBody>
        </ToolsHolder>
      )}
    </UIHolder>
  );
}

const UIHolder = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: ${(props) => (props.isFocused ? 2 : 1)};
`;
const UICheckHolder = styled.div`
  margin-right: 5px;
`;
const UIInfoHolder = styled.div`
  flex: 1;
`;

const ToolsHolder = styled.div``;

const ToolsPopoverBody = styled.div``;
