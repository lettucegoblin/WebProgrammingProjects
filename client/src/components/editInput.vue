<template>
  <textarea v-if="multiLine" v-on:input="toggleInputAnimation" v-model="value" class="editinput" type="text"></textarea>
  <input v-else v-on:input="toggleInputAnimation" v-model="value" class="editinput" type="text">
</template>

<script setup lang="ts">
import { User } from '@/components/User';
import { computed, type PropType, ref } from 'vue';
const toggleInputAnimation = (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.classList.remove("animate-save");
  target.offsetWidth;
  target.classList.add("animate-save");
  updateModelValue(event);
}
const props = defineProps({
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  multiLine: {
    type: Boolean,
    default: false,
  },
});

const value = computed(() => {
  // check type of modelValue
  if (typeof props.modelValue == "number") {
    return props.modelValue.toString();
  } else {
    return props.modelValue;
  }
});

const emit = defineEmits(['update:modelValue']);

const updateModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (typeof props.modelValue == "string") {
    emit('update:modelValue', target.value);
  } else if (typeof props.modelValue == "number") {
    emit('update:modelValue', parseInt(target.value));
  } else { // default to string
    emit('update:modelValue', target.value);
  }
}

</script>

<style scoped>
textarea{
  max-width: max-content;
}
.editinput {
  background-color: white;
  transition: background-color 1s;
}
.editinput.animate-save {
  animation: animate-save 2s;
}

@keyframes animate-save {
  0% {
    background-color: white;
  }
  20% {
    background-color: rgb(160, 239, 160);
  }
  100% {
    background-color: white;
  }
}
</style>