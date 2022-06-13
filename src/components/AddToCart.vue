<template>
  <button @click="addToCart()" class="button is-primary">Add to Cart</button>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cartData: JSON.parse(localStorage.getItem("cart") || "[]"),
    };
  },

  methods: {
    addToCart() {
      this.product.code = new Date().getTime();
      this.cartData = this.cartData.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          code: index + "" + new Date().getTime(),
        };
      });
      this.cartData.push(this.product);
      localStorage.setItem("cart", JSON.stringify(this.cartData));
      this.$root.$emit("itemAdded");
      alert("Product added to cart!");
    },
  },
};
</script>
