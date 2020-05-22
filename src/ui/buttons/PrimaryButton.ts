import styled, { css } from 'styled-components';

interface ButtonProps {
  isDisabled?: boolean;
}

export const PrimaryButton = styled.div<ButtonProps>`
  background-color: #3b88fd;
  height: 2.5rem;
  border-radius: 8px;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  font-weight: bold;
  cursor: pointer;

  ${(props) => {
    if (props.isDisabled) {
      return css`
        opacity: 0.3;
        pointer-events: none;
      `;
    }
  }}
`;
