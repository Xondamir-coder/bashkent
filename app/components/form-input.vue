<template>
  <input v-model="model" class="form-input" @input="checkInput" >
</template>

<script setup>
// eslint-disable-next-line vue/require-prop-types
const model = defineModel();
const attrs = useAttrs();

const checkInput = () => {
  if (attrs.type === 'tel') {
    const value = model.value.replace(/[^+\d\s]/g, '');
    model.value = value;
  }
};
</script>

<style lang="scss" scoped>
.form-input {
  padding-block: 1.9rem;
  border-radius: 1.2rem;
  padding-inline: 2rem;
  background-color: #ffffff;
  border: 1px solid #d6d7d7;
  font-weight: 400;
  &::placeholder {
    color: #b2b5b5;
    opacity: 1;
  }
  &:focus {
    border-color: vars.$teal;
  }
}
</style>
