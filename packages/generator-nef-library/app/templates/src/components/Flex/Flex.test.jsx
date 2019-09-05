import React from "react";
import { shallow } from "enzyme";
import faker from "faker";

import StyledFlex from "./Flex.styles";

import Flex from ".";

describe("Flex", () => {
  let props;
  let shallowFlex;

  const shallowTestComponent = () => {
    if (!shallowFlex) {
      shallowFlex = shallow(<Flex {...props} />);
    }
    return shallowFlex;
  };

  beforeEach(() => {
    props = {
      alignItems: "center",
      children: faker.random.word(),
      className: faker.random.word(),
      inline: undefined,
      justifyContent: "center",
      tag: "span",
      textAlign: "center"
    };
    shallowFlex = undefined;
  });

  // Shallow / unit tests begin here
  it(`should always render a 'StyledFlex' component`, () => {
    expect(shallowTestComponent().find(StyledFlex).length).toBe(1);
  });

  it(`should always pass all its props, including 'tag' as 'as', to the 'StyledFlex' component`, () => {
    const { tag: as, ...rest } = props;

    expect(
      shallowTestComponent()
        .find(StyledFlex)
        .props()
    ).toMatchObject({
      ...rest,
      as
    });
  });

  // Render / mount / integration tests begin here
});
