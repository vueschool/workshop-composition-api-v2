<script>
import { ref, computed } from "vue";
import ProductCard from "./components/ProductCard.vue";
export default {
  components: { ProductCard },
  setup() {
    const loading = ref(true);
    const products = ref([]);
    const numberOfProducts = computed(() => products.value.length);
    async function fetchProducts() {
      const res = await fetch("https://dummyjson.com/products?limit=10000");
      const data = await res.json();
      products.value = data.products;
    }
    fetchProducts().then(() => {
      loading.value = false;
    });
    return { loading, products, numberOfProducts, fetchProducts };
  },
};
</script>

<template>
  <div v-if="loading">loading...</div>
  <div v-else>
    <h1 class="text-2xl mb-5">Products ({{ numberOfProducts }})</h1>
    <ul class="flex gap-4 flex-wrap flex-grow justify-center">
      <ProductCard
        v-for="product in products"
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
