<script setup>
import { ref, computed } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { useFetch } from "./composables/useFetch";

// loading products
const numberOfProducts = computed(() => products.value.length);

const { data, loading } = useFetch(
  "https://dummyjson.com/products?limit=10000"
);
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
  <div v-if="loading">loading...</div>
  <div v-else>
    <h1 class="text-2xl mb-5">Products ({{ numberOfProducts }})</h1>
    <label class="w-1/3"
      >Order by
      <select class="border-2 border-gray-300 rounded w-1/3" v-model="orderBy">
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
      <label class="pl-3 w-1/3">
        <input type="checkbox" v-model="desc" />
        Descending
      </label>
    </label>

    <ul class="flex gap-4 flex-wrap flex-grow justify-center">
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
