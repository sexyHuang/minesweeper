import styled from 'styled-components';

export const BoardBase = styled.div<{
  columns: number;
}>`
  display: inline-grid;
  gap: 0;
  ${({ columns }) => `grid-template-columns: repeat(${columns}, 1fr);`};
  border: 6px solid;
  border-left-color: #808080;
  border-top-color: #808080;
  border-right-color: #e6e6e6;
  border-bottom-color: #e6e6e6;
`;
