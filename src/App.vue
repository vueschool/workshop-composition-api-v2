<script setup>
import { ref, computed } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { useFetch } from "./composables/useFetch";

// loading products
const numberOfProducts = computed(() => products.value.length);

const query = ref("");
const url = computed(
  () => `https://dummyjson.com/products/search?limit=10000&q=${query.value}`
);
const { data, loading } = useFetch(url);
const products = computed(() => data.value?.products || []);

// ordering products
const orderBy = ref("price");
const desc = ref(false);
const orderedProducts = computed(() => {
  const cloned = JSON.parse(JSON.stringify(products.value));
  return cloned.sort((a, b) => {
    return desc.value
      ? b[orderBy.value] - a[orderBy.value]
      : a[orderBy.value] - b[orderBy.value];
  });
});
</script>

<template>
  <div>
    <h1 class="text-2xl mb-5">Products ({{ numberOfProducts }})</h1>
    <label class="w-1/3"
      >Order by
      <select
        class="border-2 border-gray-300 rounded w-1/3 p-2"
        v-model="orderBy"
      >
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
      <input
        type="text"
        class="border-2 border-gray-300 rounded ml-2 p-2"
        placeholder="Search"
        v-model="query"
      />
      <label class="pl-3 w-1/3">
        <input type="checkbox" v-model="desc" />
        Descending
      </label>
    </label>

    <div v-if="loading">loading...</div>
    <ul v-else class="flex gap-4 flex-wrap flex-grow justify-center">
      <ProductCard
        v-for="product in orderedProducts"
        :key="product.id"
        :product="product"
        class="w-80"
      />
    </ul>
  </div>
</template>

<style>
body {
  padding: 30px;
}
</style>
