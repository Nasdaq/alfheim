import React from "react";
import styled, { css } from "styled-components";

export const viewportSizes = ["xs", "sm", "md", "lg", "xl"];

// viewport to pixel mapper
export const mapViewportSizeToPx = size => {
  switch (size) {
    case "xs":
      return "0px";
    case "sm":
      return "576px";
    case "md":
      return "768px";
    case "lg":
      return "992px";
    case "xl":
      return "1200px";
    default:
      return null;
  }
};

// display helper
const display = (type, size = "xs") => css`
  @media (min-width: ${mapViewportSizeToPx[size]}) {
    display: -ms- ${type}box !important;
    display: ${type} !important;
  }
`;

// wrap helper
const wrap = (type = "wrap", size = "xs") => css`
  @media (min-width: ${mapViewportSizeToPx[size]}) {
    -ms-flex-wrap: ${type};
    flex-wrap: ${type};
  }
`;

// align items helper
const alignItemsCssHelper = (oldProp, newProp) => css`
  -webkit-box-align: ${oldProp} !important;
  -ms-flex-align: ${oldProp} !important;
  align-items: ${newProp} !important;
`;

const alignItems = side => {
  switch (side) {
    case "start":
      return alignItemsCssHelper(side, `flex-${side}`);
    case "end":
      return alignItemsCssHelper(side, `flex-${side}`);
    default:
      return alignItemsCssHelper(side, side);
  }
};

const alignItemsStringHelper = css`
  ${props => alignItems(props.alignItems)};
`;

// justify content helper
const justifyContentCssHelper = (oldProp, newProp) => css`
  -webkit-box-pack: ${oldProp} !important;
  -ms-flex-pack: ${oldProp} !important;
  justify-content: ${newProp} !important;
`;

const justifyContent = side => {
  switch (side) {
    case "start":
      return justifyContentCssHelper(side, `flex-${side}`);
    case "end":
      return justifyContentCssHelper(side, `flex-${side}`);
    case "between":
      return justifyContentCssHelper("justify", "space-between");
    case "around":
      return justifyContentCssHelper("distribute", "space-around");
    default:
      return justifyContentCssHelper(side, side);
  }
};

const justifyContentStringHelper = css`
  ${props => justifyContent(props.justifyContent)};
`;

// flex direction helper
const directionCssHelper = (oldPropOrient, oldPropDirection, newProp) =>
  css`
    -webkit-box-orient: ${oldPropOrient};
    -webkit-box-direction: ${oldPropDirection};
    -ms-flex-direction: ${newProp};
    flex-direction: ${newProp};
  `;

const direction = dir => {
  switch (dir) {
    case "row":
      return directionCssHelper("horizontal", "normal", dir);
    case "row-reverse":
      return directionCssHelper("horizontal", "reverse", dir);
    case "column":
      return directionCssHelper("vertical", "normal", dir);
    case "column-reverse":
      return directionCssHelper("vertical", "reverse", dir);
    default:
      return null;
  }
};

// array helper
const mapArrayToMediaHelper = (array, contentFn, cssKey) => {
  return array.map(
    obj => css`
      @media (min-width: ${mapViewportSizeToPx(obj.size)}) {
        ${contentFn(obj[cssKey])};
      }
    `
  );
};

// styled component
const StyledFlex = styled(
  ({
    alignItems,
    flexDirection,
    inlineFlex,
    justifyContent,
    textAlign,
    ...props
  }) => <div {...props} />
)`
  ${props => display(props.inlineFlex ? "inline-flex" : "flex")};

  text-align: ${props => props.textAlign} !important;

  ${props =>
    Array.isArray(props.alignItems)
      ? mapArrayToMediaHelper(props.alignItems, alignItems, "align")
      : alignItemsStringHelper};

  ${props =>
    Array.isArray(props.justifyContent)
      ? mapArrayToMediaHelper(props.justifyContent, justifyContent, "justify")
      : justifyContentStringHelper};

  ${props => props.flexDirection && direction(props.flexDirection)};

  ${props => props.wrap && wrap(props.wrap)}
`;

export default StyledFlex;
