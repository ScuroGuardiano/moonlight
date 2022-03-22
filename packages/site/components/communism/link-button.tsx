import styled, { css } from 'styled-components'

export enum LinkButtonSize {
  SMALL = "small",
  NORMAL = "normal",
  MIGHTY = "mighty"
}

export interface LinkButtonProps {
  bordered?: boolean;
  size?: LinkButtonSize;
}

const LinkButton = styled.a`
  display: inline-block;
  background-color: red;
  color: yellow;
  text-align: center;
  padding: 1rem;
  transition-duration: .5s;
  cursor: pointer;

  &:hover {
    color: red;
    background-color: yellow;
    text-decoration: none;
  }

  ${(props: LinkButtonProps) => {
    const size = props.size ?? LinkButtonSize.NORMAL;
    const borderWidth = size === LinkButtonSize.MIGHTY ? 2 : 1;
    const bolder = size === LinkButtonSize.MIGHTY;
    const padding = {
      [LinkButtonSize.SMALL]: ".25rem",
      [LinkButtonSize.NORMAL]: ".5rem",
      [LinkButtonSize.MIGHTY]: "1rem"
    };

    return css`
      ${props.bordered && `border: solid ${borderWidth}px`};
      ${bolder && `font-weight: bolder`};
      padding: ${padding[size]};
    `
  }};
`;

export default LinkButton;
