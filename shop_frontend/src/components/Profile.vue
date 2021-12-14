<template>

    <div v-if="loaded" class="profile">
        <h2><span>{{type}}</span></h2>
        <h2>{{email}}</h2>
        <h2>{{name}}</h2>
    </div>

</template>


<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';

export default {
    name: "Profile",

    data: function(){
        return {
            username:"",
            name: "",
            email: "",
            type: 0,
            loaded: false,
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
            
            axios.get(`http://localhost:8000/user/${userId}/`, {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    this.type = result.data.type;
                    this.username = result.data.username;
                    this.name = result.data.name;
                    this.email = result.data.email;	
                    this.loaded = true;
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
        }
    },

    created: async function(){
        this.getData();
    },
}
</script>


<style>
    .profile{
        margin: 0;
        padding: 0%;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;    
        align-items: center;
    }

    .profile h1{
        font-size: 60px;
        color: #0f1316;
    }

    .profile h2{
        font-size: 40px;
        color: #283747;
    }

    .profile span{
        color: crimson;
        font-weight: bold;
    }
</style>