import { describe, expect, test } from 'vitest';
import TestComponent from '@/components/chapter-4/TestComponent.vue';
import { mountComponent } from '@/helpers/test';

describe('src/components/chapter-4/TestComponent.vue', () => {
  test('必要な要素がレンダリングされているか', () => {
    // テスト対象のコンポーネントをマウント（レンダリング）
    const wrapper = mountComponent(TestComponent);

    // コンポーネント自体が正しくマウントされているか確認
    expect(wrapper.exists()).toBe(true);
    // 特定のdata-testid属性を持つ要素が存在するか確認
    // find()メソッドでDOM要素を検索し、exists()でその存在を確認
    expect(wrapper.find('[data-testid="chapter-4"]').exists()).toBe(true);
  });
});