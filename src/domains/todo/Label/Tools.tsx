import React from 'react';
import styled from 'styled-components';
import { IoIosArchive, IoIosTrash } from 'react-icons/io';

interface Props {
  onRemoveRequest: () => void;
  onArchiveRequest: () => void;
}

export function Tools(props: Props) {
  return (
    <Holder>
      <SingleToolHolder onClick={props.onRemoveRequest} style={{ color: '#EE6352' }}>
        <IoIosTrash />
      </SingleToolHolder>
      <SingleToolHolder onClick={props.onArchiveRequest}>
        <IoIosArchive />
      </SingleToolHolder>
    </Holder>
  );
}

const TOOLS_SPACING = 15;

const Holder = styled.div`
  font-size: 18px;
  display: flex;
  margin: 0 -${TOOLS_SPACING / 2}px;
`;
const SingleToolHolder = styled.div`
  display: flex;
  cursor: pointer;
  padding: 0 ${TOOLS_SPACING / 2}px;
`;
