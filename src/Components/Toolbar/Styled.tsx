import styled from "styled-components/macro";

export const ConteneurGlobal = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Toolbar = styled.div`
  margin: 5px;
  margin-right: 20px;
  width: 53px;
  padding-top: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.38);
  background-color: #ffe0e0;
  border: 1px solid #ffbaba;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 767px) {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate3d(-50%, -50px, 0) rotate(-90deg);
  }
`;

interface ButtonToolI {
  selected: boolean;
}

export const ButtonTool = styled.button<ButtonToolI>`
  border-style: none;
  height: 43px;
  width: 43px;
  padding: 0px 0px;
  border-width: 0px;
  background-color: ${props =>
    props.selected ? "#ff5c00" : "rgba(255, 92, 0, 0.39)"};
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 4px;
  cursor: pointer;
  transition: transform 200ms cubic-bezier(0.17, 0.67, 0.51, 1.87),
    background-color 200ms;
  transform-box: fill-box;
  transform-origin: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.1);
  }

  & svg path {
    fill: ${props => (props.selected ? "white" : "")};
  }
  & svg rect {
    fill: ${props => (props.selected ? "white" : "")};
  }
  :focus {
    outline: none;
  }
`;
