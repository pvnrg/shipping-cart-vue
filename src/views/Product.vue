<template>
    <section class="section">
        <div class="container box" style="max-width: 500px">
            <figure class="image is-4by3 mb-5">
                <img :src="product.image"/>
            </figure>
            <h1 class="title mb-5">{{product.name}}</h1>
            <p class="subtitle has-text-weight-bold mb-4">{{product.price}}€</p>
            <add-to-cart :product="product"></add-to-cart>
        </div>
    </section>
</template>

<script>
// import axios from '@/axios'
import addToCart from '@/components/AddToCart'

export default {
    data () {
        return {
            product: {}
        }
    },
    components: {
        'add-to-cart': addToCart
    },
    props: {
        id: {
            type: Number
        }
    },
    methods: {
        getProduct(id) {
            var retrievedProducts = localStorage.getItem('Products');    
            var products = JSON.parse(retrievedProducts);
            products.forEach(element=> {
                if(element.id == id){
                    this.product = element;
                }
            });
        },
    },
    created () {
        this.getProduct(this.id);
    }
}
</script>
