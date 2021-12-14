<template>

    <div class="create_product">
        <div class="container_create_product">
            <h2>Create Product</h2>
            <br>
            <form v-on:submit.prevent="processCreateProduct" >

                <input type="text" v-model="product.description" placeholder="Description">
                <br>
                
                <input type="number" v-model="product.price" placeholder="Price">
                <br>

                <input type="number" v-model="product.inventory" placeholder="Inventory">
                <br>

                <button type="submit">Create</button>
            </form>
        </div>

    </div>

</template>

<script>

import axios from "axios";

export default {
    name: "CreateProduct",

    data: function(){
        return {
            product: {
                description: "",
                price: "",
                inventory: "",
            },
            message: "",
        }
    },

    methods: {
        processCreateProduct: function(){
            axios.post(
                "http://127.0.0.1:8000/product/create/", 
                this.product,  
                {headers: {}}
                )
                .then((result) => {
                    alert(result.data.message) 
                    this.$emit('completedCreateProduct')
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

    .create_product{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
    
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container_create_product {
        border: 3px solid  #283747;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .create_product h2{
        color: #283747;

    }

    .create_product form{
        width: 70%;
        
    }

    .create_product input{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #283747;
    }

    .create_product select{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #283747;
    }

    .create_product button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }

    .create_product button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

</style>