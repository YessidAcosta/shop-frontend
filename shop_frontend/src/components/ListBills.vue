<template>
    <div class="greetings">
        <h2>List Of Bills</h2>
        <table  class="customers" style="margin: 0 auto;">
            <tr>
                <th>Id</th>
                <th>Bill Date</th>
                <th>Total</th>
                <th>Detail</th>
            </tr>
            <tr v-for="bill in bills" v-bind:key="bill">
                <td>{{bill.id}}</td>
                <td>{{dateFormat(bill.bill_date)}}</td>
                <td>{{numberFormat(bill.total)}}</td>
                <td><button v-on:click="loadDetailBill(bill.id)"> Detail </button></td>
            </tr>
            <br>
            <tr>
                <td></td>
                <td></td>
                <td><button class="customers" style="margin: 0 auto;" v-on:click="loadCreateBill"> Create Bill </button></td>
                <td></td>
            </tr>
        </table>
    </div>

</template>


<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
    name:"Bills",

    data: function(){
        return {
              bills: [],
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

        loadDetailBill: function(ide){
            let data = {
                fact : ide
            }
            //alert("listBuills ID: " + data.id)
            this.$emit('completedDetailBills', data.fact)
            //alert("complement ID: " + data.id)
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
        text-align: left;
        background-color: #283747;
        color: white;
    }
</style>