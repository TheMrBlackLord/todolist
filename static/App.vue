<template>
   <div>
      <div class="container-fluid">
         <Navbar/>
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
   components: {
      Navbar
   },
   mounted() {
      this.$store.dispatch('getUser')
   }
}
</script>