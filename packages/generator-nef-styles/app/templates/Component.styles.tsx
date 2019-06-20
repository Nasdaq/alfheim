// todo: delete file if not needed
<% if (enableJsx) { -%>
import React from "react";
<% } -%>
import styled from "styled-components";

<% if (enableJsx) { -%>
const Styled<%= name %> = styled(({ ...props }) => <div {...props} />)``;
<% } else { -%>
const Styled<%= name %> = styled.div``;
<% } -%>

export default Styled<%= name %>;
