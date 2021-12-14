<template>

    <div class="update_Product">
        <div class="container_update_Product">
            <h2>Update Product</h2>
            <br>
            <form v-on:submit.prevent="processUpdateProduct(id)" >
                <input type="text" v-model="id" placeholder="Id" hidden>
                
                <input type="text" v-model="product.description" placeholder="Description">
                <br>
                
                <input type="number" v-model="product.price" placeholder="Price">
                <br>

                <input type="number" v-model="product.inventory" placeholder="Inventory">
                <br>

                <button type="submit">Update</button>
            </form>
        </div>

    </div>

</template>

<script>

import axios from "axios";

export default {
    name: "UpdateProduct",

    data: function(){
        return {
            id: localStorage.getItem('id') || "none",
            product: {
                description: localStorage.getItem('description') || "none",
                price: localStorage.getItem('price') || "none",
                inventory: localStorage.getItem('inventory') || "none"
            },
            message : "",
        }
    },

    methods: {
        processUpdateProduct: function(ide){
            //alert("http://127.0.0.1:8000/product/"+ ide + "/");
            axios.put(
                "http://127.0.0.1:8000/product/"+ ide + "/", 
                this.product,  
                {headers: {}}
                )
                .then((result) => {
                    alert(result.data.message) 
                    this.$emit('finalUpdateProduct')
                })
                .catch((error) => {
                    
                    if (error.response.status == "401")
                        alert("ERROR 401: Incorrect credentials.");
                    
                });
        }
    }

    
}

</script>

<style>

    .update_Product{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
    
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container_update_Product {
        border: 3px solid  #283747;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .update_Product h2{
        color: #283747;

    }

    .update_Product form{
        width: 70%;
        
    }

    .update_Product input{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #283747;
    }

    .update_Product select{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #283747;
    }

    .update_Product button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }

    .update_Product button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

</style>