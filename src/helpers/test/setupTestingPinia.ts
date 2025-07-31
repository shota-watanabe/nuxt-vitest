import { createTestingPinia, type TestingPinia } from '@pinia/testing';
import { vi } from 'vitest';
import type { StateTree } from 'pinia';

export const setupTestingPinia = (initialState: StateTree = {}): TestingPinia => {
  const testingPinia = createTestingPinia({
    stubActions: false,
    createSpy: vi.fn,
    initialState,
  });
  return testingPinia;
};