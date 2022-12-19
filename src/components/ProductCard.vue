<script>
import ProductRating from "./ProductRating.vue";

export default {
  props: {
    product: Object,
  },
  components: { ProductRating },
};
</script>
<template>
  <div class="w-full max-w-sm bg-white rounded-lg shadow-md">
    <a href="#">
      <img
        class="p-8 rounded-t-lg object-contain h-56 object-center w-full"
        :src="product.thumbnail"
        :alt="product.title"
      />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900">
          {{ product.title }}
        </h5>
      </a>
      <div class="flex items-center mt-2.5 mb-5">
        <ProductRating :rating="product.rating" />
        <span
          class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3"
          >{{ product.rating }}</span
        >
      </div>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900"
          >${{ product.price }}</span
        >
        <a
          href="#"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >Add to cart</a
        >
      </div>
    </div>
  </div>
</template>
