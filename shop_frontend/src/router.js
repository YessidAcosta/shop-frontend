import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import CreateProduct from './components/CreateProduct.vue'
import ListProducts from './components/ListProducts.vue'
import UpdateProduct from './components/UpdateProduct.vue'
import DeleteProduct from './components/DeleteProduct.vue'
import CreateSale from './components/CreateSale.vue'
import DetailSale from './components/DetailSale.vue'
import ListBills from './components/ListBills.vue'


const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/logIn',
    name: "logIn",
    component: LogIn
  },
  {
    path: '/user/signUp',
    name: "signUp",
    component: SignUp
  },
  {
    path: '/user/home',
    name: "home",
    component: Home
  },
  {
    path: '/user/profile/',
    name: "profile",
    component: Profile
  },
  {
    path: '/produc/create',
    name: "productCreate",
    component: CreateProduct
  },
  {
    path: '/product/list',
    name: "listProducts",
    component: ListProducts
  },
  {
    path: '/product/update',
    name: "updateProduct",
    component: UpdateProduct
  },
  {
    path: '/product/delete',
    name: "deleteProduct",
    component: DeleteProduct
  },
  {
    path: '/sales/create',
    name: "createSale",
    component: CreateSale
  },
  {
    path: '/sales/detail',
    name: "detailSale",
    component: DetailSale
  },
  {
    path: '/bills/list',
    name: "listBills",
    component: ListBills
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
