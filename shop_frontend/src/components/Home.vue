<template>

    <div class="greetings">
        <h1>¡Welcome  <span> {{username}} </span>!</h1>
        <img src="@/assets/shopping_cart.png" width="200" height="200"/>
        <h1>¡To MinTic-I3 Store!</h1>
    </div>



</template>


<script>

export default {
    name: "Home",

    data: function(){
        return {
                username: localStorage.getItem('username') || "none",
                token_refresh: localStorage.getItem('token_refresh') || "none"
        }
    },

    
}

</script>


<style>
    .greetings{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
    
        
        justify-content: center;
        text-align: center;
        align-items: center;
    }

    .greetings h1{
        font-size: 50px;
        color: #283747;
        text-align: center;
    }

    .greetings span{
        color: crimson;
        font-weight: bold;
    }
</style>