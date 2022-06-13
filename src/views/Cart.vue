<template>
  <div class="container">
    <h1 class="title has-text-centered">Your Cart</h1>
    <div class="row">
      <div class="col-md-8">
        <div v-if="Object.keys(cart).length > 0">
          <table class="table responsive" style="width: 100%">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
            <tr v-for="product in cart" :key="product.code">
              <td>
                <img :src="product.image" style="height: 50px; width: 50px" />
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}€</td>
              <td><remove-from-cart :product="product"></remove-from-cart></td>
            </tr>
          </table>
        </div>
        <div v-else>
          <h2>Your cart is empty</h2>
        </div>
      </div>
      <div class="col-md-4">
        <h3>Apply Voucher</h3>
        <h5 v-for="voucher in vouchers" :key="voucher.id">
          <div v-if="voucher.name == 'Voucher V' && valVoucherV != 0">
            {{ voucher.name }} -
            <input type="hidden" name="coupon" v-model="coupon" />
            <input
              type="submit"
              name="apply"
              value="Remove"
              class="button is-danger"
              @click="removeVoucher('Voucher V')"
            />
          </div>
          <div v-else-if="voucher.name == 'Voucher R' && valVoucherR != 0">
            {{ voucher.name }} -
            <input type="hidden" name="coupon" v-model="coupon" />
            <input
              type="submit"
              name="apply"
              value="Remove"
              class="button is-danger"
              @click="removeVoucher('Voucher R')"
            />
          </div>
          <div v-else-if="voucher.name == 'Voucher S' && valVoucherS != 0">
            {{ voucher.name }} -
            <input type="hidden" name="coupon" v-model="coupon" />
            <input
              type="submit"
              name="apply"
              value="Remove"
              class="button is-danger"
              @click="removeVoucher('Voucher S')"
            />
          </div>
          <div v-else>
            {{ voucher.name }} -
            <input type="hidden" name="coupon" v-model="coupon" />
            <input
              type="submit"
              name="apply"
              value="Apply"
              @click="setVoucherValue(voucher)"
            />
          </div>
        </h5>
        <h3>Cart Totals</h3>
        <ul>
          <li>Subtotal: {{ subtotal }}€</li>
          <li>Discount: {{ discount }}€</li>
          <li>Total: {{ final_total }}€</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import removeFromCart from "@/components/RemoveFromCart";

export default {
  data() {
    return {
      cart: {},
      subtotal: 0,
      discount: 0,
      total: 0,
      coupon: "",
      valVoucherV: parseFloat(localStorage.getItem("Voucher V") || 0),
      valVoucherR: parseFloat(localStorage.getItem("Voucher R") || 0),
      valVoucherS: parseFloat(localStorage.getItem("Voucher S") || 0),
      vouchers: JSON.parse(localStorage.getItem("Vouchers") || []),
    };
  },
  components: {
    "remove-from-cart": removeFromCart,
  },
  computed:{
    final_total(){
      return parseFloat(this.total, 2).toFixed(2);
    }
  },
  methods: {
    getCart() {
      let that = this;
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // calculating the total, subtotal and discount value from cart data
      this.subtotal = 0;
      this.cart.forEach((element) => {
        that.subtotal += parseFloat(element.price);
      });
      this.discount = this.valVoucherV + this.valVoucherR + this.valVoucherS;
      that.total = that.subtotal - that.discount;

    },
    applyCoupon() {
      if (this.coupon == "") {
        alert("Please enter voucher");
        return false;
      }
      var getVoucher = localStorage.getItem("Vouchers");
      var vouchers = JSON.parse(getVoucher);

      // check for valid voucher from voucher list
      let that = this;
      var validVoucher = vouchers.filter(function (elem) {
        if (elem.name == that.coupon) return elem.name;
      });

      // callback this function if valid coupon
      if (validVoucher.length > 0) {
        // console.log('tset +'+validVoucher[0]);
        this.setVoucherValue(validVoucher[0]);
      } else {
        alert("Invalid voucher");
      }
    },

    setVoucherValue(voucher) {
      // check for voucher R
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (voucher.name == "Voucher V") {
        this.setVoucherV(voucher);
      } else if (voucher.name == "Voucher R") {
        this.setVoucherR(voucher);
      } else if (voucher.name == "Voucher S") {
        this.setVoucherS(voucher);
      }
    },
    setVoucherV(voucher) {
      var productA = this.cart.filter(function (p_cart) {
        if (p_cart.name == "Product A" && voucher.name == "Voucher V") {
          return voucher;
        }
      });
      // callback this function if valid coupon
      if (productA.length > 1) {
        if (this.valVoucherV == 0) {
          var discount = (voucher.price * productA[0].price) / 100;
          // var discount = parseFloat(productA[0].price - discountVal);
          // this.discount += discount;
          localStorage.setItem("Voucher V", discount);
          this.valVoucherV = discount;
          this.getCart();
          alert("Voucher applied!");
        } else {
          alert("Voucher already applied!");
        }
      } else {
        alert(
          "Error! cant apply Voucher V, cart need second unit to Product A"
        );
      }
    },
    setVoucherR(voucher) {
      var productA = this.cart.filter(function (p_cart) {
        if (p_cart.name == "Product B" && voucher.name == "Voucher R") {
          return voucher;
        }
      });
      console.log(productA[0]);
      // callback this function if valid coupon
      if (productA.length > 0) {
        if (this.valVoucherR == 0) {
          var discount = parseFloat(voucher.price);
          this.discount += discount;
          localStorage.setItem("Voucher R", discount);
          this.valVoucherR = discount;
          this.getCart();
          alert("Voucher applied!");
        } else {
          alert("Voucher already applied!");
        }
      } else {
        alert("Error! cant apply Voucher R, cart has not Product B");
      }
    },
    setVoucherS(voucher) {
      if (this.total > 40) {
        var discount = parseFloat((voucher.price * this.total) / 100);
        localStorage.setItem("Voucher S", discount);
        this.valVoucherS = discount;
        this.getCart();
        alert("Voucher applied!");
      } else {
        alert("Error! cant apply Voucher S, cart value should be over 40€");
      }
    },
    removeVoucher(voucherName) {
      this.discount -= parseFloat(localStorage.getItem(voucherName));
      localStorage.setItem(voucherName, 0);
      if (voucherName == "Voucher V") {
        this.valVoucherV = 0;
      } else if (voucherName == "Voucher R") {
        this.valVoucherR = 0;
      } else if (voucherName == "Voucher S") {
        this.valVoucherS = 0;
      }
      localStorage.setItem(voucherName, 0);
      this.getCart();
      alert("Voucher removed!");
    },
    removeProductA(){
      var removeProductA = this.cart.filter(function (elem) {
        if (elem.id == 1) return elem.name;
      });
      if (removeProductA.length < 2) {
        this.removeVoucher('Voucher V');
      }      
    },
    removeProductB(){
      var removeProductB = this.cart.filter(function (elem) {
        if (elem.id == 2) return elem.name;
      });
      if (removeProductB.length == 0) {
        this.removeVoucher('Voucher R');
      }            
    }
  },
  created() {
    this.getCart();
  },
  mounted() {
    this.$root.$on("itemAdded", () => {
      this.getCart();
      // this.reCalcuate();
    });
    this.$root.$on("itemRemove", (id) => {
      this.getCart();
      if(id == 1){
        this.removeProductA();
      }else if(id == 2){
        this.removeProductB();        
      }
    });    



  },
};
</script>
