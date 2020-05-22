import { TodoInput } from 'data';
import React, { useRef } from 'react';
import { useNeededState } from 'services/useNeededState';
import styled from 'styled-components';
import { PrimaryButton } from 'ui/buttons';
import { Input } from 'ui/forms';

interface Props {
  onCreateRequest: (input: TodoInput) => void;
}

function getInitialInput(): TodoInput {
  return {
    isArchived: false,
    isCompleted: false,
    isRemoved: false,
    name: '',
  };
}

function getIsTodoInputValid(todoInput: TodoInput) {
  if (!todoInput.name.trim()) {
    return false;
  }

  return true;
}

export function NewTodoForm(props: Props) {
  const [currentInput, setCurrentInput] = useNeededState(getInitialInput);
  const inputRef = useRef<HTMLInputElement>(null);

  const isInputValid = getIsTodoInputValid(currentInput);

  function handleSubmit() {
    if (!getIsTodoInputValid(currentInput)) {
      // TODO: Show feedback to user
      return;
    }

    props.onCreateRequest(currentInput);
    setCurrentInput(getInitialInput());

    inputRef.current?.focus();
  }

  return (
    <Holder
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <InputHolder>
        <Input
          ref={inputRef}
          placeholder="Todo name..."
          value={currentInput.name}
          onChange={(event) => {
            setCurrentInput({ name: event.target.value });
          }}
        />
      </InputHolder>
      <CTAHolder>
        <PrimaryButton onClick={handleSubmit} isDisabled={!isInputValid}>
          Create
        </PrimaryButton>
      </CTAHolder>
    </Holder>
  );
}

const Holder = styled.form`
  display: flex;
`;
const InputHolder = styled.div`
  flex: 1;
`;
const CTAHolder = styled.div`
  padding-left: 5px;
`;
