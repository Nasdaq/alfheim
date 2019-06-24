import { <%= enabled %> } from "enzyme";
import React from "react";
import faker from "faker";

import Styled<%= name %> from "./<%= name %>.styles";

import <%= name %> from ".";

describe("<%= name %>", () => {
  let props;
  <%_ if (mount) { -%>
  let mounted<%= name %>;
  <%_ } -%>
  <%_ if (render) { -%>
  let rendered<%= name -%>;
  <%_ } -%>
  <%_ if (shallow) { -%>
  let shallow<%= name -%>;
  <%_ } -%>

  <%_ if (mount) { -%>
  const mountTestComponent = () => {
    if (!mounted<%= name %>) {
      mounted<%= name %> = mount(<<%= name %> {...props} />);
    }
    return mounted<%= name %>;
  };
  <%_ } -%>

  <%_ if (render) { -%>
  const renderTestComponent = () => {
    if (!rendered<%= name %>) {
      rendered<%= name %> = render(<<%= name %> {...props} />);
    }
    return rendered<%= name %>;
  };
  <%_ } -%>

  <%_ if (shallow) { -%>
  const shallowTestComponent = () => {
    if (!shallow<%= name %>) {
      shallow<%= name %> = shallow(<<%= name %> {...props} />);
    }
    return shallow<%= name %>;
  };
  <%_ } -%>

  beforeEach(() => {
    props = {
      children: faker.lorem.paragraph(),
      className: faker.random.word(),
      id: faker.random.word(),
      name: faker.random.word(),
      style: { color: faker.internet.color() }
    };
    <%_ if (mount) { -%>
    mounted<%= name %> = undefined;
    <%_ } -%>
    <%_ if (render) { -%>
    rendered<%= name %> = undefined;
    <%_ } -%>
    <%_ if (shallow) { -%>
    shallow<%= name %> = undefined;
    <%_ } -%>
  });

  <%_ if (shallow) { -%>
  // Shallow / unit tests begin here
  it(`should always render a 'Styled<%= name %>' component`, () => {
    expect(shallowTestComponent().find(Styled<%= name %>).length).toBe(1);
  });

  it(`should always pass all its props to the 'Styled<%= name %>'`, () => {
    expect(
      shallowTestComponent()
        .find(Styled<%= name %>)
        .props()
    ).toMatchObject(props);
  });
  <%_ } -%>
 
  <%_ if (render || mount) { -%>
  // Render / mount / integration tests begin here
  <%_ } -%>
});
