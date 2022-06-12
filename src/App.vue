<template>
  <div id="app">
      <div class="level py-2 px-2 has-background-white-ter">
          <div class="level-left">
              <span class="title is-4">Cart Demo</span>
          </div>
          <div class="level-right">
              <router-link :to="{name: 'DemoProducts'}" class="level-left button mr-2">API Products</router-link>            
              <router-link :to="{name: 'Products'}" class="level-left button mr-2">View All Products</router-link>
              <cart-btn :count="cartLength" class="level-right"></cart-btn>
          </div>
      </div>
      <router-view/>
  </div>
</template>

<script>
import cartBtn from '@/components/CartButton.vue'

export default {
    data () {
        return {
            cart: []
        }
    },
    computed: {
        cartLength () {
            return this.cart.length
        }
    },
    components: {
        'cart-btn': cartBtn
    },
    methods: {
        getCart() {
            this.cart = JSON.parse(localStorage.getItem("cart") || '[]')            
        }
    },
    created() {
        // default when app loaded, will store all defined products to localStorage.

        this.getCart()
        var allProducts = [
            {
              id: "1", 
              name: "Product A", 
              price: "10",
              image: 'https://imaginer.ctrlshiftc.com/?text=A',
            },
            {
              id: "2", 
              name: "Product B", 
              price: "8",
              image: 'https://imaginer.ctrlshiftc.com/?text=B',
            },
            {
              id: "3", 
              name: "Product C", 
              price: "12",
              image: 'https://imaginer.ctrlshiftc.com/?text=C',
            } 
        ];

        var allVoucher = [
            {
              id: "1", 
              name: "Voucher V", 
              price: "10",
              type: 'percentage',
            },
            {
              id: "2", 
              name: "Voucher R", 
              price: "5",
              type: 'flat',
            },
            {
              id: "3", 
              name: "Voucher S", 
              price: "5",
              type: 'percentage',
            } 
        ];        
        localStorage.setItem('Products', JSON.stringify(allProducts));        
        localStorage.setItem('Vouchers', JSON.stringify(allVoucher));                

    }
}
</script>

<style>
.products {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.products .product {
    width: 20%;
    margin-bottom: 1.5rem;
}
</style>
