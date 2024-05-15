import styled, { css } from 'styled-components';

export const Button = styled.div<{
  active: boolean;
}>`
  cursor: pointer;
  ${({ active }) =>
    active
      ? css`
          font-weight: 600;
        `
      : css`
          color: #337ab7;
        `}
`;

export const Group = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px 8px 28px;
`;
