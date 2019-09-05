import React from "react";

import StyledFlex, { viewportSizes } from "./Flex.styles";

// types
export type textAlignments = "left" | "center" | "right" | "justify";
export type itemAlignments =
  | "baseline"
  | "start"
  | "center"
  | "stretch"
  | "end";
export type contentJustifications =
  | "start"
  | "end"
  | "center"
  | "around"
  | "between";
export type flexDirections =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";

export interface ItemAlignmentObject {
  align: itemAlignments;
  size: viewportSizes;
}

export interface JustificationObject {
  justify: contentJustifications;
  size: viewportSizes;
}

export interface FlexBaseProps extends React.HTMLAttributes<HTMLElement> {
  /** make the flexbox inline */
  inlineFlex?: boolean | viewportSizes;
  /** align items along cross axis */
  alignItems?: itemAlignments | ItemAlignmentObject[];
  /** justify content along main axis */
  justifyContent?: contentJustifications | JustificationObject[];
  /** horizontally align text within a DOM element */
  textAlign?: textAlignments;
  /** specifies the direction of the flexible items */
  flexDirection?: flexDirections;
  /** use to get a reference to the DOM input (for things like focus management). */
  innerRef?: React.RefObject<any>;
  /** tag to be rendered to the DOM */
  tag?: React.ReactType;
  /** specifies whether the flexible items should wrap or not */
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
}

// actual flex component
const Flex: React.SFC<FlexBaseProps> = ({
  innerRef,
  tag,
  ...props
}: FlexBaseProps) => (
  <StyledFlex {...props} as={tag} ref={innerRef} data-ut="flex" />
);

Flex.defaultProps = {
  alignItems: "baseline",
  tag: "div",
  textAlign: "left"
};

export default Flex;
