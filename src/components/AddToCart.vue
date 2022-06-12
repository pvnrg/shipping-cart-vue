<template>
    <button @click="addToCart()" class="button is-primary">Add to Cart</button>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
          cartData: JSON.parse(localStorage.getItem("cart") || '[]'),
        };
      },

    methods: {
        addToCart () {
            this.cartData.push(this.product)
            localStorage.setItem("cart", JSON.stringify(this.cartData));            
            alert('Product added to cart!')
        },
    },
}
</script>
