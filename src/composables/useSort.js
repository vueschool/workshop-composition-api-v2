import { computed } from "vue";
export const useSort = (array, key, desc = true) => {
  const sorted = computed(() => {
    const cloned = JSON.parse(JSON.stringify(array.value));
    return cloned.sort((a, b) => {
      return desc.value
        ? b[key.value] - a[key.value]
        : a[key.value] - b[key.value];
    });
  });
  return { sorted };
};
