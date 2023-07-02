// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};
import 'jest-preset-angular/setup-jest';

const intersectionObserverMock = (callback: (d: any[]) => any) => ({
  observe: () =>
    callback([
      { isIntersecting: true, target: { classList: { toggle: () => '' } } },
    ]),
  unobserve: () => null,
});
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);
