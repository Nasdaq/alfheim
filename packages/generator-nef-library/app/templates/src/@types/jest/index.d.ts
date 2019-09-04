// / <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toContainObject: (object) => R;
  }
}
