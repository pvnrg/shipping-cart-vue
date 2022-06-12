<template>
    <div class="container">
        <h1 class="title has-text-centered">Your Cart</h1>
        <div class="row">
            <div class="col-md-8">
                <div v-if="Object.keys(cart).length > 0">
                <table  class="table responsive" style="width:100%">
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>          
                    <tr v-for="product in cart" :key="product.id">
                        <td>
                            <img :src="product.image" style="height: 50px;width: 50px;"/>
                        </td>
                        <td>{{product.name}}</td>
                        <td>{{product.price}}€</td>
                    </tr>  
                </table>
            </div>
                <div v-else>
                    <h2>Your cart is empty</h2>
                </div>                
            </div>
            <div class="col-md-4">
                <h3>Apply Voucher</h3>
                <input type="text" name="coupon" v-model="coupon"> <input type="submit" name="apply" 
                value="Apply Voucher" @click="applyCoupon()">
                <h3>Cart Totals</h3>
                <ul>
                    <li>Subtotal: {{subtotal}}€</li>
                    <li>Discount: {{discount}}€</li>
                    <li>Total: {{total}}€</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from '@/axios'
// import removeFromCart from '@/components/RemoveFromCart'

export default {
    data () {
        return {
            cart: {},
            subtotal:0,
            discount:0,
            total:0,
            coupon:'',
            valVoucherV:parseFloat(localStorage.getItem("voucherV") || 0),
            valVoucherR:parseFloat(localStorage.getItem("voucherR") || 0),
            valVoucherS:parseFloat(localStorage.getItem("voucherS") || 0),
        }
    },
    components: {
        // 'remove-from-cart': removeFromCart
    },
    methods: {
        getCart() {
            let that=this;
            this.cart = JSON.parse(localStorage.getItem("cart") || '[]')

            // calculating the total, subtotal and discount value from cart data
            this.subtotal = 0;
            this.cart.forEach(element=> {
                that.subtotal += parseFloat(element.price);
            });  
            this.discount = this.valVoucherV + this.valVoucherR + this.valVoucherS; 
            that.total = that.subtotal - that.discount;    
        },
        applyCoupon(){
            if(this.coupon == ''){
                alert('Please enter voucher');
                return false;
            }
            var getVoucher = localStorage.getItem('Vouchers');    
            var vouchers = JSON.parse(getVoucher);
            
            // check for valid voucher from voucher list
            let that=this;
            var validVoucher = vouchers.filter(function(elem){
                if(elem.name == that.coupon) return elem.name;
            });

            // callback this function if valid coupon
            if(validVoucher.length > 0){
                // console.log('tset +'+validVoucher[0]);
                this.setVoucherValue(validVoucher[0]);
            }else{
                alert('Invalid voucher');
            }
        },

        setVoucherValue(voucher){
            // check for voucher R
            this.cart = JSON.parse(localStorage.getItem("cart") || '[]')            
            if(voucher.name == 'Voucher V'){
                this.setVoucherV(voucher)
            }else if(voucher.name == 'Voucher R'){
                this.setVoucherR(voucher)
            }else if(voucher.name == 'Voucher S'){
                this.setVoucherS(voucher)
            }
        },
        setVoucherV(voucher){
            var productA = this.cart.filter(function(p_cart){
                if(p_cart.name == 'Product A' && voucher.name == 'Voucher V'){
                    return voucher;                    
                }
            });
            // callback this function if valid coupon
            if(productA.length > 1){
                if(this.valVoucherV == 0){
                    var discount =  (voucher.price * productA[0].price) /100;   
                    // var discount = parseFloat(productA[0].price - discountVal);
                    // this.discount += discount;
                    localStorage.setItem("voucherV", discount);
                    this.valVoucherV =discount;
                    this.getCart();                    
                }else{
                    alert('Voucher already applied!')
                }
            }else{
                alert('Error! cant apply Voucher V, cart need second unit to Product A');
            }
        },
        setVoucherR(voucher){
            var productA = this.cart.filter(function(p_cart){
                if(p_cart.name == 'Product B' && voucher.name == 'Voucher R'){
                    return voucher;                    
                }
            });
            console.log(productA[0]);
            // callback this function if valid coupon
            if(productA.length > 0){
                if(this.valVoucherR == 0){
                    var discount = parseFloat(productA[0].price - voucher.price);
                    this.discount += discount;
                    localStorage.setItem("voucherR", discount);
                    this.valVoucherR =discount;
                    this.getCart();                    
                }else{
                    alert('Voucher already applied!')
                }
            }else{
                alert('Error! cant apply Voucher R, cart has not Product B');
            }
        },
        setVoucherS(voucher){
            if(this.subtotal > 40){
                var discount =  parseFloat((voucher.price * this.subtotal) /100);
                localStorage.setItem("voucherS", discount);
                this.valVoucherS =discount;
                this.getCart();                    
            }else{
                alert('Error! cant apply Voucher S, cart value should be over 40€');
            }
        },        
    },
    created () {
        this.getCart()
    }
}
</script>
