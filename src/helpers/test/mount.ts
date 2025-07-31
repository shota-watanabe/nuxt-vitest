import { mountSuspended } from '@nuxt/test-utils/runtime';
import { mount, RouterLinkStub, type VueWrapper } from '@vue/test-utils';
import type { setupTestingPinia } from './setupTestingPinia';
import type { Component, ComponentPublicInstance, DefineComponent, Slots } from 'vue';

interface MountOptions {
  testingPinia?: ReturnType<typeof setupTestingPinia>;
  attachTo?: Element | string;
  props?: Record<string, unknown>;
  slots?: Record<string, () => VNode | VNode[] | string> | Slots;
  shallow?: boolean;
  stubs?: Record<string, Component | boolean>;
  mocks?: Record<string, unknown>;
  config?: Record<string, unknown>;
  options?: Record<string, unknown>;
}

const DEFAULT_STUBS = {
  NuxtLink: RouterLinkStub,
} as const;

const DEFAULT_OPTIONS = {
  testingPinia: undefined,
  attachTo: undefined,
  props: {},
  slots: {},
  shallow: false,
  stubs: DEFAULT_STUBS,
  mocks: {},
  config: {},
  options: {},
} as const satisfies MountOptions;

export const mountComponent = <VMValue>(
  component: Component,
  options: Partial<MountOptions> = DEFAULT_OPTIONS,
): VueWrapper<ComponentPublicInstance & VMValue & DefineComponent> => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    testingPinia,
    attachTo,
    props,
    slots,
    shallow,
    stubs,
    mocks,
    config,
    options: additionalOptions,
  } = mergedOptions;

  return mount(component, {
    ...additionalOptions,
    attachTo,
    props,
    slots,
    shallow,
    global: {
      plugins: testingPinia ? [testingPinia] : [],
      stubs: { ...DEFAULT_STUBS, ...stubs },
      mocks,
      config,
    },
  });
};

export const mountSuspendedComponent = async <VMValue>(
  component: Component,
  options: Partial<MountOptions> = DEFAULT_OPTIONS,
): Promise<VueWrapper<ComponentPublicInstance & VMValue & DefineComponent>> => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const {
    testingPinia,
    attachTo,
    props,
    slots,
    shallow,
    stubs,
    mocks,
    config,
    options: additionalOptions,
  } = mergedOptions;

  return await mountSuspended(component, {
    ...additionalOptions,
    attachTo,
    props,
    slots,
    shallow,
    global: {
      plugins: testingPinia ? [testingPinia] : [],
      stubs: { ...DEFAULT_STUBS, ...stubs },
      mocks,
      config,
    },
  });
};
