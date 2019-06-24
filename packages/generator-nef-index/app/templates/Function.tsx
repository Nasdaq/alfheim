import React from "react";

import Styled<%= name %> from "./<%= name %>.styles";

export interface <%= name %>Props extends React.HTMLAttributes<HTMLElement> {}

const <%= name %>: React.SFC<<%= name %>Props> = (props: <%= name %>Props) => (
  <Styled<%= name %> {...props} />
);

export default <%= name %>;
