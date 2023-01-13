import { ref } from "vue";
export const useFetch = (url) => {
  const loading = ref(true);
  const data = ref(null);

  function makeRequest() {
    loading.value = true;
    fetch(url).then(async (res) => {
      data.value = await res.json();
      loading.value = false;
    });
  }

  makeRequest();
  return { data, loading };
};
