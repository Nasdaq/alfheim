import React from "react";
import styled from "styled-components";

export interface <%= name %>Props extends React.HTMLAttributes<HTMLElement> {}

export const Styled<%= name %> = styled.div<<%= name %>Props>``;

const <%= name %>: React.FC<<%= name %>Props> = (props: <%= name %>Props) => (
  <Styled<%= name %> {...props} />
);

export default <%= name %>;
