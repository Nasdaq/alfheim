"use strict";

import testTemplate from "../test_file";

import { FileType } from "@alfheim/utils";

import faker from "faker";

describe(`Stories file template`, () => {
  let shallow;
  let render;
  let mount;
  let fn = () => testTemplate.makeFile(shallow, render, mount);

  it(`should be an instance of 'FileType'`, () => {
    expect(testTemplate instanceof FileType).toBe(true);
  });

  describe(`when 'componentName' is specified 
            and the 'makeFile' method is called`, () => {
    const componentName = faker.random.word();
    let result;

    beforeEach(() => {
      testTemplate.setProps({ componentName });
      result = testTemplate.makeFile();
    });

    it(`should return a result that contains the string:
        'import {componentName} from "./";'`, () => {
      expect(result).toContain(`import ${componentName} from "./";`);
    });

    describe(`when 'shallow' is defined`, () => {
      beforeEach(() => {
        shallow = true;
        result = fn();
      });

      it(`should return a result that contains the string:
          'let shallow{componentName};'`, () => {
        expect(result).toContain(`let shallow${componentName};`);
      });

      it(`should return a result that contains the string:
          'const shallowTestComponent = () => {'`, () => {
        expect(result).toContain("const shallowTestComponent = () => {");
      });

      it(`should return a result that contains the string:
          'shallow{componentName} = shallow(<{componentName} {...props} />).dive();'`, () => {
        expect(result).toContain(
          `shallow${componentName} = shallow(<${componentName} {...props} />).dive();`
        );
      });

      describe(`when 'render' is defined`, () => {
        beforeEach(() => {
          render = true;
          result = fn();
        });

        it(`should return a result that contains the string:
            'let render{componentName};'`, () => {
          expect(result).toContain(`let render${componentName};`);
        });

        it(`should return a result that contains the string:
          'const renderTestComponent = () => {'`, () => {
          expect(result).toContain("const renderTestComponent = () => {");
        });

        it(`should return a result that contains the string:
          'render{componentName} = render(<{componentName} {...props} />);'`, () => {
          expect(result).toContain(
            `render${componentName} = render(<${componentName} {...props} />);`
          );
        });

        describe(`when 'mount' is defined`, () => {
          beforeEach(() => {
            mount = true;
            result = fn();
          });

          it(`should return a result that contains the string:
            'import { mount, render, shallow } from "enzyme";'`, () => {
            expect(result).toContain(
              'import { mount, render, shallow } from "enzyme";'
            );
          });

          it(`should return a result that contains the string:
              'let mount{componentName};'`, () => {
            expect(result).toContain(`let mount${componentName};`);
          });

          it(`should return a result that contains the string:
            'let mount{componentName};'`, () => {
            expect(result).toContain(`let mount${componentName};`);
          });

          it(`should return a result that contains the string:
          'const mountTestComponent = () => {'`, () => {
            expect(result).toContain("const mountTestComponent = () => {");
          });

          it(`should return a result that contains the string:
          'mount{componentName} = mount(<{componentName} {...props} />);'`, () => {
            expect(result).toContain(
              `mount${componentName} = mount(<${componentName} {...props} />);`
            );
          });
        });

        describe(`when 'mount' is NOT defined`, () => {
          beforeEach(() => {
            mount = false;
            result = fn();
          });

          it(`should return a result that contains the string:
            'import { render, shallow } from "enzyme";'`, () => {
            expect(result).toContain(
              'import { render, shallow } from "enzyme";'
            );
          });

          it(`should return a result that does NOT contain the string:
              'let mount{componentName};'`, () => {
            expect(result).not.toContain(`let mount${componentName};`);
          });

          it(`should return a result that does NOT contain the string:
            'let mount{componentName};'`, () => {
            expect(result).not.toContain(`let mount${componentName};`);
          });

          it(`should return a result that does NOT contain the string:
          'const mountTestComponent = () => {'`, () => {
            expect(result).not.toContain("const mountTestComponent = () => {");
          });

          it(`should return a result that does NOT contain the string:
          'mount{componentName} = mount(<{componentName} {...props} />);'`, () => {
            expect(result).not.toContain(
              `mount${componentName} = mount(<${componentName} {...props} />);`
            );
          });
        });
      });

      describe(`when 'render' is NOT defined`, () => {
        beforeEach(() => {
          render = false;
          result = fn();
        });

        it(`should return a result that does NOT contain the string:
            'let render{componentName};'`, () => {
          expect(result).not.toContain(`let render${componentName};`);
        });

        it(`should return a result that does NOT contain the string:
          'const renderTestComponent = () => {'`, () => {
          expect(result).not.toContain("const renderTestComponent = () => {");
        });

        it(`should return a result that does NOT contain the string:
          'render{componentName} = render(<{componentName} {...props} />);'`, () => {
          expect(result).not.toContain(
            `render${componentName} = render(<${componentName} {...props} />);`
          );
        });

        describe(`when 'mount' is defined`, () => {
          beforeEach(() => {
            mount = true;
            result = fn();
          });

          it(`should return a result that contains the string:
            'import { mount, shallow } from "enzyme";'`, () => {
            expect(result).toContain(
              'import { mount, shallow } from "enzyme";'
            );
          });

          it(`should return a result that contains the string:
              'let mount{componentName};'`, () => {
            expect(result).toContain(`let mount${componentName};`);
          });

          it(`should return a result that contains the string:
            'let mount{componentName};'`, () => {
            expect(result).toContain(`let mount${componentName};`);
          });

          it(`should return a result that contains the string:
          'const mountTestComponent = () => {'`, () => {
            expect(result).toContain("const mountTestComponent = () => {");
          });

          it(`should return a result that contains the string:
          'mount{componentName} = mount(<{componentName} {...props} />);'`, () => {
            expect(result).toContain(
              `mount${componentName} = mount(<${componentName} {...props} />);`
            );
          });
        });

        describe(`when 'mount' is NOT defined`, () => {
          beforeEach(() => {
            mount = false;
            result = fn();
          });

          it(`should return a result that contains the string:
            'import { shallow } from "enzyme";'`, () => {
            expect(result).toContain('import { shallow } from "enzyme";');
          });

          it(`should return a result that does NOT contain the string:
              'let mount{componentName};'`, () => {
            expect(result).not.toContain(`let mount${componentName};`);
          });

          it(`should return a result that does NOT contain the string:
            'let mount{componentName};'`, () => {
            expect(result).not.toContain(`let mount${componentName};`);
          });

          it(`should return a result that does NOT contain the string:
          'const mountTestComponent = () => {'`, () => {
            expect(result).not.toContain("const mountTestComponent = () => {");
          });

          it(`should return a result that does NOT contain the string:
          'mount{componentName} = mount(<{componentName} {...props} />);'`, () => {
            expect(result).not.toContain(
              `mount${componentName} = mount(<${componentName} {...props} />);`
            );
          });
        });
      });
    });

    describe(`when 'shallow' is NOT defined`, () => {
      beforeEach(() => {
        shallow = false;
        result = fn();
      });

      it(`should return a result that does NOT contain the string:
          'let shallow{componentName};'`, () => {
        expect(result).not.toContain(`let shallow${componentName};`);
      });

      it(`should return a result that does NOT contain the string:
          'const shallowTestComponent = () => {'`, () => {
        expect(result).not.toContain("const shallowTestComponent = () => {");
      });

      it(`should return a result that does NOT contain the string:
          'shallow{componentName} = shallow(<{componentName} {...props} />).dive();'`, () => {
        expect(result).not.toContain(
          `shallow${componentName} = shallow(<${componentName} {...props} />).dive();`
        );
      });

      describe(`when 'render' is defined`, () => {
        beforeEach(() => {
          render = true;
          result = fn();
        });

        it(`should return a result that contains the string:
            'let render{componentName};'`, () => {
          expect(result).toContain(`let render${componentName};`);
        });

        it(`should return a result that contains the string:
          'const renderTestComponent = () => {'`, () => {
          expect(result).toContain("const renderTestComponent = () => {");
        });

        it(`should return a result that contains the string:
          'render{componentName} = render(<{componentName} {...props} />);'`, () => {
          expect(result).toContain(
            `render${componentName} = render(<${componentName} {...props} />);`
          );
        });

        describe(`when 'mount' is defined`, () => {
          beforeEach(() => {
            mount = true;
            result = fn();
          });

          it(`should return a result that contains the string:
            'import { mount, render } from "enzyme";'`, () => {
            expect(result).toContain('import { mount, render } from "enzyme";');
          });

          it(`should return a result that contains the string:
              'let mount{componentName};'`, () => {
            expect(result).toContain(`let mount${componentName};`);
          });

          it(`should return a result that contains the string:
            'let mount{componentName};'`, () => {
            expect(result).toContain(`let mount${componentName};`);
          });

          it(`should return a result that contains the string:
          'const mountTestComponent = () => {'`, () => {
            expect(result).toContain("const mountTestComponent = () => {");
          });

          it(`should return a result that contains the string:
          'mount{componentName} = mount(<{componentName} {...props} />);'`, () => {
            expect(result).toContain(
              `mount${componentName} = mount(<${componentName} {...props} />);`
            );
          });
        });

        describe(`when 'mount' is NOT defined`, () => {
          beforeEach(() => {
            mount = false;
            result = fn();
          });

          it(`should return a result that contains the string:
            'import { render } from "enzyme";'`, () => {
            expect(result).toContain('import { render } from "enzyme";');
          });

          it(`should return a result that does NOT contain the string:
              'let mount{componentName};'`, () => {
            expect(result).not.toContain(`let mount${componentName};`);
          });

          it(`should return a result that does NOT contain the string:
            'let mount{componentName};'`, () => {
            expect(result).not.toContain(`let mount${componentName};`);
          });

          it(`should return a result that does NOT contain the string:
          'const mountTestComponent = () => {'`, () => {
            expect(result).not.toContain("const mountTestComponent = () => {");
          });

          it(`should return a result that does NOT contain the string:
          'mount{componentName} = mount(<{componentName} {...props} />);'`, () => {
            expect(result).not.toContain(
              `mount${componentName} = mount(<${componentName} {...props} />);`
            );
          });
        });
      });

      describe(`when 'render' is NOT defined`, () => {
        beforeEach(() => {
          render = false;
          result = fn();
        });

        it(`should return a result that does NOT contain the string:
            'let render{componentName};'`, () => {
          expect(result).not.toContain(`let render${componentName};`);
        });

        it(`should return a result that does NOT contain the string:
          'const renderTestComponent = () => {'`, () => {
          expect(result).not.toContain("const renderTestComponent = () => {");
        });

        it(`should return a result that does NOT contain the string:
          'render{componentName} = render(<{componentName} {...props} />);'`, () => {
          expect(result).not.toContain(
            `render${componentName} = render(<${componentName} {...props} />);`
          );
        });

        describe(`when 'mount' is defined`, () => {
          beforeEach(() => {
            mount = true;
            result = fn();
          });

          it(`should return a result that contains the string:
            'import { mount } from "enzyme";'`, () => {
            expect(result).toContain('import { mount } from "enzyme";');
          });

          it(`should return a result that contains the string:
              'let mount{componentName};'`, () => {
            expect(result).toContain(`let mount${componentName};`);
          });

          it(`should return a result that contains the string:
            'let mount{componentName};'`, () => {
            expect(result).toContain(`let mount${componentName};`);
          });

          it(`should return a result that contains the string:
          'const mountTestComponent = () => {'`, () => {
            expect(result).toContain("const mountTestComponent = () => {");
          });

          it(`should return a result that contains the string:
          'mount{componentName} = mount(<{componentName} {...props} />);'`, () => {
            expect(result).toContain(
              `mount${componentName} = mount(<${componentName} {...props} />);`
            );
          });
        });

        describe(`when 'mount' is NOT defined`, () => {
          beforeEach(() => {
            mount = false;
            result = fn();
          });

          it(`should return a result that contains the string:
            'import {  } from "enzyme";'`, () => {
            expect(result).toContain('import {  } from "enzyme";');
          });

          it(`should return a result that does NOT contain the string:
              'let mount{componentName};'`, () => {
            expect(result).not.toContain(`let mount${componentName};`);
          });

          it(`should return a result that does NOT contain the string:
            'let mount{componentName};'`, () => {
            expect(result).not.toContain(`let mount${componentName};`);
          });

          it(`should return a result that does NOT contain the string:
          'const mountTestComponent = () => {'`, () => {
            expect(result).not.toContain("const mountTestComponent = () => {");
          });

          it(`should return a result that does NOT contain the string:
          'mount{componentName} = mount(<{componentName} {...props} />);'`, () => {
            expect(result).not.toContain(
              `mount${componentName} = mount(<${componentName} {...props} />);`
            );
          });
        });
      });
    });
  });
});
