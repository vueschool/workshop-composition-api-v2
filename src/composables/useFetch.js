import { isRef, watch, computed, reactive, toRefs } from "vue";
export const useFetch = (url) => {
  // handle a reactive ref or a string
  const URL = computed(() => {
    return isRef(url) ? url.value : url;
  });

  const state = reactive({
    loading: true,
    data: null,
  });

  // wrap request in function to call right away
  // and whenever URL changes
  function makeRequest() {
    state.loading = true;
    fetch(URL.value).then(async (res) => {
      state.data = await res.json();
      state.loading = false;
    });
  }

  makeRequest();

  // watch URL for changes and make request
  watch(URL, makeRequest);
  return toRefs(state);
};
