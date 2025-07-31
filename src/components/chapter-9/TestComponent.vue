<script setup lang="ts">
import { additionNumber } from '@/utils/chapter-9/test';

const isClicked = ref(false);

// 外部に定義された関数を関節的に呼び出す
const handleClick01 = () => {
  additionNumber(1, 2);
};

// コンポーネント内に定義された関数を呼び出す
const handleClick02 = () => {
  isClicked.value = !isClicked.value;
};
</script>
<template>
  <button data-testid="button01" @click="handleClick01">Button</button>
  <button data-testid="button02" @click="additionNumber(3, 3)">Button</button>
  <button data-testid="button03" @click="handleClick02">Button</button>
</template>
