import React from "react";
import styled, { keyframes } from "styled-components";
import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <Icon>
      <VscLoading />
    </Icon>
  );
};
const Rotate = keyframes`
from {
  transform: rotate(0deg)
}
to {
  transform: rotate(360deg)
}
`;
const Icon = styled.div`
  color: black;
  display: inline-block;
  font-size: 5rem;
  height: 80px;
  animation: ${Rotate} 2s steps(9) infinite;
`;
export default Loading;
