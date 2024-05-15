import styled, { css } from "styled-components";
import BG from "../../../../public/nums_background.svg";
import * as RATIO from "./constants";
import Image from "next/image";

export const Box = styled.div<{
  size: string;
}>`
  aspect-ratio: ${RATIO.BOX_RATIO};
  height: auto;
  background-image: url("${BG.src}");
  background-size: 100%;
  display: flex;
  ${({ size }) => {
    return css`
      width: ${size};
      gap: calc(${size} * ${RATIO.GAP_RATIO});
      box-sizing: border-box;
      padding: 0 calc(${size} * ${RATIO.PADDING_RATIO});
    `;
  }}
`;

export const CellImage = styled(Image)<{
  size: string;
}>`
  aspect-ratio: ${RATIO.CELL_RATIO};
  height: auto;
  width: ${({ size }) => size};
`;
