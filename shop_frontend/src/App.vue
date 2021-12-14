<template>
    <div id="app" class="app">

    <div class="header">
      <nav>
        <button v-if="is_auth" v-on:click="loadHome"> Home </button>
        <button v-if="is_auth" v-on:click="loadProfile"> Profile </button>
        <button v-if="is_auth" v-on:click="loadProducts"> Products </button>
        <button v-if="is_auth" v-on:click="loadSales"> Generate Sales </button>
        <button v-if="is_auth" v-on:click="loadBills"> Bills </button>
        <button v-if="is_auth" v-on:click="logOut"> Sign Off </button>
        <button v-if="!is_auth" v-on:click="loadLogIn"> Log In </button>
        <button v-if="!is_auth" v-on:click="loadSignUp"> Sign Up </button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:createProduct="createProduct"
        v-on:completedUpdateProduct="completedUpdateProduct"
        v-on:completedDeleteProduct="completedDeleteProduct"
        v-on:finalUpdateProduct="finalUpdateProduct"
        v-on:finalDeleteProduct="finalDeleteProduct"
        v-on:completedDetailBills="completedDetailBills"
        v-on:logOut="logOut"
        v-on:completedCreateProduct="completedCreateProduct"
        v-on:finalCreateBill="finalCreateBill"
      >
      </router-view>
    </div>

    <div class="footer">
      <h2>© MinTic - I3 - Group #9</h2>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'App',

    data: function(){
      return {
        is_auth: false
      }
    },

    components:{
    },

    methods:{
      verifyAuth: function(){
        this.is_auth = localStorage.getItem("isAuth") || false;
		
        if (this.is_auth == false)
          this.$router.push({ name: "logIn" });
        else
          this.$router.push({ name: "home" });
      },

      loadLogIn: function(){
        this.$router.push({name: "logIn"})
      },

      loadSignUp: function(){
        this.$router.push({name: "signUp"})
      },
      
      completedLogIn: function(data){
        localStorage.setItem("isAuth", true);
        localStorage.setItem("username", data.username);
        localStorage.setItem("token_access", data.token_access);
        localStorage.setItem("token_refresh", data.token_refresh);
        alert("Successful Authentication.");
        this.verifyAuth();
      },
      
      completedSignUp: function(data){
        alert("Successful registration.");
			  this.completedLogIn(data);
      },

      loadHome: function() {
        this.$router.push({ name: "home" });
      },

      loadProfile: function() {
        this.$router.push({ name: "profile" });
      },

      loadProducts: function() {
        this.$router.push({ name: "listProducts" });
      },

      loadBills: function() {
        this.$router.push({ name: "listBills" });
      },

      completedDetailBills: function(dataBill) {
        localStorage.setItem("factura", dataBill)
        alert("APP ID:" + dataBill)
        this.$router.push({ name: "detailSale"});
      },

      loadSales: function() {
        this.$router.push({ name: "createSale" });
      },

      logOut: function () {
        localStorage.clear();
        alert("Closed session.");
        this.verifyAuth();
      },
      
      completedUpdateProduct: function(data_update_product){
        localStorage.setItem("id", data_update_product.id);
        localStorage.setItem("description", data_update_product.description);
        localStorage.setItem("price", data_update_product.price);
        localStorage.setItem("inventory", data_update_product.inventory);
        this.$router.push({ name: "updateProduct" });
      },

      finalUpdateProduct: function() {
        this.$router.push({ name: "listProducts" });
      },

      completedDeleteProduct: function(data_delete_product){
        localStorage.setItem("id", data_delete_product.id);
        localStorage.setItem("description", data_delete_product.description);
        localStorage.setItem("price", data_delete_product.price);
        localStorage.setItem("inventory", data_delete_product.inventory);
        this.$router.push({ name: "deleteProduct" });
      },

      finalDeleteProduct: function() {
        this.$router.push({ name: "listProducts" });
      },

      createProduct: function() {
        this.$router.push({ name: "productCreate" });
      },

      completedCreateProduct: function() {
        this.$router.push({ name: "listProducts" });
      },

      finalCreateBill: function(){
        this.$router.push({ name: "listBills" });
      }

    },

    created: function(){
      this.verifyAuth()
    }

  }
</script>

<style>

  body{
    margin: 0 0 0 0;
  }

  .header{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 2vh;
    min-height: 80px;

    background-color: #283747;
    color: #E5E7E9;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;
  }

  .header nav {
    height: 100%;
    width: 50%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
  }

  .header nav button{
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;

    border-radius: 5px;
    padding: 10px 20px;
  }

  .header nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }

  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;

    background: #FDFEFE;
  }

  .customers tr:nth-child(even){background-color: #f2f2f2;}

  .customers tr:hover {background-color: #ddd;}

  .customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;

      color: white;
      justify-content: space-between;
      align-items: center;
  }

  .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 5vh;
    min-height: 80px;

    background-color: #283747;
    color: #E5E7E9;
  }

  .footer h2{
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>