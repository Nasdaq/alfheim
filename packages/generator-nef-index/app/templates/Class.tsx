import React, { Component } from "react";
import styled from "styled-components";

export interface <%= name %>Props extends React.HTMLAttributes<HTMLElement> {} 

export const Styled<%= name %> = styled.div<<%= name %>Props>``;

class <%= name %> extends Component<<%= name %>Props> {
  public render() {
    return <Styled<%= name %> {...this.props} />;
  }
}

export default <%= name %>;
