<template>
   <div class="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
         <router-link class="navbar-brand" :to="{name: 'home'}">ToDo List</router-link>
         <div class="mr-auto my-2">
            <div v-if="user" class="d-flex align-items-center">
               <button class="btn btn-danger btn-sm mr-2" @click.prevent="logout">Logout</button>
               <p class="username">{{ user.username }}</p>
            </div>
            <div v-else class="auth">
               <router-link :to="{name: 'login'}">Login</router-link>
               <router-link :to="{name: 'register'}">Register</router-link>
            </div>
         </div>
      </nav>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
   computed: {
      ...mapGetters(['user'])
   },
   methods: {
      ...mapActions(['logout'])
   }
}
</script>