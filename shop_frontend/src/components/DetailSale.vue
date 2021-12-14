<template>
    <div class="greetings">
        <h2>Detail Invoice Number {{factura}}</h2>
        <table  class="customers" style="margin: 0 auto;">
            <tr>
                <!--<th>id</th>
                <th>factura</th>-->
                <th>product</th>
                <th>quantity</th>
                <th>unit price</th>
                <th>subtotal</th>
            </tr>
            <tr v-for="sale in sales" v-bind:key="sale">
                <!--<td v-if="sale.bill.id==factura">{{sale.id}}</td>
                <td v-if="sale.bill.id==factura">{{sale.bill.id}}</td>-->
                <td v-if="sale.bill.id==factura">{{sale.product.description}}</td>
                <td v-if="sale.bill.id==factura">{{sale.quantity}}</td>
                <td v-if="sale.bill.id==factura">{{sale.product.price}}</td>
                <td v-if="sale.bill.id==factura">{{numberFormat(sale.product.price * sale.quantity)}}</td>
            </tr>
            <!--<br>
            <tr>
                <td></td>
                <td></td>
                <td><button class="customers" style="margin: 0 auto;" v-on:click="loadListBills"> To Get Back </button></td>
                <td></td>
            </tr>-->           
        </table>
    </div>
</template>


<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
    name:"DetailSale",

    data: function(){
        return {
              sales: [],
              factura: localStorage.getItem('factura') || "none",
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
            
            axios.get(`http://localhost:8000/sales/list/`)
                .then((result) => {
                    this.sales = result.data;
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

        /*loadListBills: function(){
            this.$emit('loadBills')
        }*/

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
        text-align: left;
        background-color: #283747;
        color: white;
    }
</style>