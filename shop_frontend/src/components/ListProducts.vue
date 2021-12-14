<template>
    <div class="greetings">
        <h2>List Of Products</h2>
        <table  class="customers" style="margin: 0 auto;">
            <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            <tr v-for="product in products" v-bind:key="product">
                <td>{{product.id}}</td>
                <td>{{product.description}}</td>
                <td>{{numberFormat(product.price)}}</td>
                <td>{{product.inventory}}</td>
                <td><button v-on:click="loadUpdateProduct(product.id)"> Update </button></td>
                <td><button v-on:click="loadDeleteProduct(product.id)"> Delete </button></td>
            </tr>
            <br>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><button class="customers" style="margin: 0 auto;" v-on:click="loadCreateProduct"> Create Product </button></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <br>
         
    </div>

</template>


<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
    name:"ListProducts",

    data: function(){
        return {
              products: [],
              prod: {
                  id:"",
                  description:"",
                  price:"",
                  inventory:"",
              }
        }
    },

    methods: {
        getData: async function () {

            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
			}

            await this.verifyToken();
            
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();
            
            axios.get(`http://localhost:8000/products/list/`)
                .then((result) => {
                    this.products = result.data;
                    })
                .catch(() => {
                    this.$emit('logOut');
                });
        },

        verifyToken: function () {
            return axios.post("http://localhost:8000/refresh/", {refresh: localStorage.getItem("token_refresh")}, {headers: {}})
				.then((result) => {
					localStorage.setItem("token_access", result.data.access);		
				})
				.catch(() => {
					this.$emit('logOut');
				});
        },

       numberFormat(value) {
        const formatter = new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        });

        return formatter.format(value);
        },

        dateFormat(date) {
        return new Date(date).toLocaleDateString();
        }, 

        loadUpdateProduct: function(ide){
            axios.get("http://127.0.0.1:8000/product/" + ide + "/")
                .then((result) => {
                    let dataUpdateProduct = {
                        id: result.data.id,
                        description: result.data.description,
                        price: result.data.price,
                        inventory: result.data.inventory,
                    }   

                    this.$emit('completedUpdateProduct', dataUpdateProduct)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Update Failed.");  
                });
        },

        loadDeleteProduct: function(ide){
            axios.get("http://127.0.0.1:8000/product/" + ide + "/")
                .then((result) => {
                    let dataDeleteProduct = {
                        id: result.data.id,
                        description: result.data.description,
                        price: result.data.price,
                        inventory: result.data.inventory,
                    }   

                    this.$emit('completedDeleteProduct', dataDeleteProduct)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Update Failed.");  
                });
        },

        loadCreateProduct: function(){
            this.$emit('createProduct')
        }
    },

    created: async function(){
        this.getData();
    },
};
</script>


<style>

    .customers tr:nth-child(even){background-color: #f2f2f2;}

    .customers tr:hover {background-color: #ddd;}

    .customers th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        justify-content: center;
        background-color: #283747;
        color: white;
    }

    .customers button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
    }

    .customers button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>