import { GameStatus } from "@/app/lib/MineBoard/constants";
import styled from "styled-components";
import face0 from "../../../../public/face_unpressed.svg";
import facePressed from "../../../../public/face_pressed.svg";
import faceWin from "../../../../public/face_win.svg";
import faceLose from "../../../../public/face_lose.svg";

export const FaceButton = styled.div<{
  status: GameStatus;
}>`
  background-size: 100%;
  width: 35px;
  aspect-ratio: 1;
  height: auto;
  cursor: pointer;
  ${({ status }) => {
    switch (status) {
      case GameStatus.WIN:
        return `background-image: url("${faceWin.src}");`;
      case GameStatus.LOSE:
        return `background-image: url("${faceLose.src}");`;
      default:
        return `background-image: url("${face0.src}");`;
    }
  }}

  &:active {
    background-image: url("${facePressed.src}");
  }
`;
