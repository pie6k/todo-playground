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
    <Holder
      isFocused={isFocused}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <CheckHolder>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(event) => {
            onUpdateRequest({ isCompleted: event.target.checked });
          }}
        />
      </CheckHolder>
      <InfoHolder>
        <TodoName
          currentName={todo.name}
          onNameChangeRequest={(newName) => {
            onUpdateRequest({ name: newName });
          }}
        />
      </InfoHolder>
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
    </Holder>
  );
}

const Holder = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: ${(props) => (props.isFocused ? 2 : 1)};
`;
const CheckHolder = styled.div`
  margin-right: 5px;
`;
const InfoHolder = styled.div`
  flex: 1;
`;

const ToolsHolder = styled.div``;

const ToolsPopoverBody = styled.div``;
