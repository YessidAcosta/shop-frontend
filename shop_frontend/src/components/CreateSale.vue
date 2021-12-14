<template>
    <div class="greetings">
        <div>
            <h2>Create Sale And Bill</h2>
            <br>
            <form v-on:submit.prevent="processCreateSaleAndBill(products,factura,data_bill)" >
            <table class="customers" style="margin: 0 auto;">
                <tr>
                    <td></td>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <td></td>
                </tr><br>   
                <tr v-for="product in products" v-bind:key="product">
                    <td><input type="text" v-model="product.id" placeholder="Id" hidden></td>
                    <td><input type="text" v-model="product.description" placeholder="Description" readonly></td>
                    <td><input id="price" type="number" v-model="product.price" placeholder="Price" readonly></td>
                    <td><input id="inventory" type="number" v-model="product.inventory" min = 0  placeholder="Inventory"></td>
                </tr>
                <td></td>
                <td></td>
                <button type="submit">Create Sale</button>
                <td></td>
            </table>
            </form>
        </div>
    </div>

</template>


<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
    name:"CreateSale",

    data: function(){
        return {
              products: [],
              bills: [],
              factura: 0,
              data_bill_v: (new Date()).toJSON().toString(),
              prod: {
                  id:"",
                  description:"",
                  price:"",
                  inventory:"",
              },
              totalv: 0,
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
            
            axios.get(`http://localhost:8000/bills/list/`)
                .then((result) => {
                        this.bills = result.data;
                        this.factura = this.bills.length + 1;
                    });

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

        loadCreateSale: function(){
            this.$emit('createProduct')
        },

        processCreateSaleAndBill: function(products,factura,data_bill){
            for (let index = 0; index < products.length; index++) {
                this.totalv = this.totalv + (products[index].price *  products[index].inventory);
            }
            let bill = {
                "data_bill" : this.data_bill_v,
                "total" : this.totalv
            }
            alert("Confimar su compra")
            axios.post(
                "http://127.0.0.1:8000/bill/create/", 
                bill,  
                {headers: {}}
                ).then((result) => {
                    alert(result.data.message) 
                    this.$emit('finalCreateBill')
                })
                .catch((error) => {
                    
                    if (error.response.status == "401")
                        alert("ERROR 401: Incorrect credentials.");
                    
                });
            /*
            axios.post(
                "http://127.0.0.1:8000/sale/create/", 
                this.bill,  
                {headers: {}}
                )
            
            alert("total: " + this.total);
            alert("factura: " + factura);
            alert("fecha: " + data_bill);
            for (let index = 0; index < products.length; index++) {
                alert("Producto: " + products[index].id +
                 "\n descripcion: " + products[index].description +
                 "\n price: " + products[index].price + 
                 "\n quantity: " + products[index].inventory);
            }
            */
            //this.$emit('completCreateBills',)
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

    .customers label {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        justify-content: center;
        background-color: #283747;
        color: white;
    }

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