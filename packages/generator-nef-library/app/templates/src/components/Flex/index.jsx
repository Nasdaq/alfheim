import React from "react";
import PropTypes from "prop-types";

import StyledFlex, { viewportSizes } from "./Flex.styles";

// types
const textAlignments = ["left", "center", "right", "justify"];
const itemAlignments = ["baseline", "start", "center", "stretch", "end"];
const contentJustifications = ["start", "end", "center", "around", "between"];
const flexDirections = ["row", "column", "row-reverse", "column-reverse"];
const wrapStyles = ["wrap", "nowrap", "wrap-reverse"];

const Flex = ({ innerRef, tag, ...props }) => (
  <StyledFlex {...props} as={tag} ref={innerRef} data-ut="flex" />
);

Flex.propTypes = {
  /** make the flexbox inline */
  inlineFlex: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(viewportSizes)
  ]),
  /** align items along cross axis */
  alignItems: PropTypes.oneOfType([
    PropTypes.oneOf(PropTypes.oneOf(itemAlignments)),
    PropTypes.shape({
      align: PropTypes.oneOf(itemAlignments),
      size: PropTypes.oneOf(viewportSizes)
    })
  ]),
  /** justify content along main axis */
  justifyContent: PropTypes.oneOfType([
    PropTypes.oneOf(contentJustifications),
    PropTypes.shape({
      justify: PropTypes.oneOf(contentJustifications),
      size: PropTypes.oneOf(viewportSizes)
    })
  ]),
  /** horizontally align text within a DOM element */
  textAlign: PropTypes.oneOf(textAlignments),
  /** specifies the direction of the flexible items */
  flexDirection: PropTypes.oneOf(flexDirections),
  /** use to get a reference to the DOM input (for things like focus management). */
  innerRef: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  /** tag to be rendered to the DOM */
  tag: PropTypes.func,
  /** specifies whether the flexible items should wrap or not */
  wrap: PropTypes.oneOf(wrapStyles)
};

Flex.defaultProps = {
  alignItems: "baseline",
  tag: "div",
  textAlign: "left"
};

export default Flex;
