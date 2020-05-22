import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMethod } from 'services/useMethod';

interface Props {
  currentName: string;
  onNameChangeRequest: (newName: string) => void;
}

export function TodoName({ currentName, onNameChangeRequest }: Props) {
  const [editedName, setEditedName] = useState(currentName);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleSubmit = useMethod(() => {
    setIsInEditMode(false);
    if (editedName === currentName) {
      return;
    }

    onNameChangeRequest(editedName);
  });

  useEffect(() => {
    setEditedName(currentName);
  }, [currentName]);

  useEffect(() => {
    if (!isInEditMode) {
      handleSubmit();
    }
  }, [isInEditMode, handleSubmit]);

  // TODO: Handle the case when user left the page somehow without blurring the input
  // currently it will cause new input not being saved

  return (
    <Holder>
      <NameInput
        onFocus={() => {
          setIsInEditMode(true);
        }}
        onBlur={() => {
          setIsInEditMode(false);
        }}
        value={editedName}
        onChange={(event) => {
          setEditedName(event.target.value);
        }}
      />
    </Holder>
  );
}

const Holder = styled.div``;

const NameInput = styled.input`
  font: inherit;
  border: none;
  outline: none;
  width: 100%;
`;
