import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px;
  color: white;
  background-color: lightseagreen;
  border: 1px solid white;
  border-radius: 3px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &.delete {
    background-color: indianred;
  }
`;