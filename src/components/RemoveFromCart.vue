<template>
  <button @click="removeEmployeeByObject(product)" class="button is-danger">
    Remove from Cart
  </button>
</template>

<script>
export default {
  props: {
    product: {
      required: true,
    },
  },
  methods: {
    removeEmployeeByObject: function (emp) {
      if (confirm("Do you really want to delete?")) {
        // var oldPara
        var cartData = JSON.parse(localStorage.getItem("cart"));
        var filtersList = cartData.filter(function (elem) {
          if (elem.code !== emp.code) {
            return elem;
          } else {
            return false;
          }

          // if(elem.name == that.coupon) return elem.name;
        });
        // const filtersList = cartData.filter(element => element !== emp)
        console.log(filtersList);
        cartData = filtersList;
        localStorage.setItem("cart", JSON.stringify(cartData));

        this.$root.$emit("itemAdded");
        this.$root.$emit("itemRemove", emp.id);        
      } else {
        return false;
      }
    },
  },
};
</script>
