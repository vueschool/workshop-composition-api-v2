import { ref, isRef, watch, computed } from "vue";
export const useFetch = (url) => {
  // handle a reactive ref or a string
  const URL = computed(() => {
    return isRef(url) ? url.value : url;
  });
  const loading = ref(true);
  const data = ref(null);

  // wrap request in function to call right away
  // and whenever URL changes
  function makeRequest() {
    loading.value = true;
    fetch(URL.value).then(async (res) => {
      data.value = await res.json();
      loading.value = false;
    });
  }

  makeRequest();

  // watch URL for changes and make request
  watch(URL, makeRequest);
  return { data, loading };
};
