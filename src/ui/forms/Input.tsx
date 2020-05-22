import styled from 'styled-components';

export const Input = styled.input`
  font: inherit;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 100%;
  height: 2.5rem;
  padding: 0 10px;
  line-height: 2rem;
  outline: none;
  transition: 0.3s all;
  font-weight: 500;

  &:focus {
    border-color: #3b88fd;
  }
`;
