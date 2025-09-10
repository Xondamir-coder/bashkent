<template>
  <input v-if="!isTextArea" v-model="model" class="form-input" @input="checkInput" />
  <textarea v-else v-model="model" rows="5" class="form-input" @input="checkInput" />
</template>

<script setup>
const model = defineModel({
  type: String
});
const attrs = useAttrs();

defineProps({
  isTextArea: Boolean
});

const checkInput = () => {
  if (attrs.type === 'tel') {
    const value = model.value.replace(/[^+\d\s]/g, '');
    model.value = value;
  }
};
</script>

<style lang="scss" scoped>
.form-input {
  padding-block: max(1.9rem, 14px);
  padding-inline: max(2rem, 16px);
  border-radius: max(1.2rem, 8px);
  background-color: #ffffff;
  border: 1px solid #d6d7d7;
  &::placeholder {
    color: #b2b5b5;
    opacity: 1;
  }
  &:focus {
    border-color: vars.$teal;
  }
}
</style>
