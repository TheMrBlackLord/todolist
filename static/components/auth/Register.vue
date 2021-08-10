<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div class="alert alert-danger"
              style="display: flex; justify-content: space-between;"
              v-for="(error, index) in errors" :key="index">
              {{error}}
              <span @click="removeError(index)">&times;</span>
            </div>
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="username">User name</label>
                <input type="text" class="form-control" id="username" placeholder="Enter username" v-model.trim="form.username">
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control"
                  id="email" placeholder="Enter email"
                  v-model.trim="form.email" autocomplete="email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control"
                  id="password" placeholder="Password"
                  v-model="form.password" autocomplete="current-password">
              </div>
              <button type="submit" class="btn btn-primary" :disabled="isLoading">
                Register
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: ""
      },
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['errors'])
  },
  methods: {
    ...mapMutations(['addError', 'removeError']),
    async submit() {
      if (this.form.username && this.form.email && this.form.password) {
        this.isLoading = true
        await this.$store.dispatch('registerUser', this.form)
        this.isLoading = false
      } else {
        this.addError('Fill all necessary fields')
      }
    },
  }
}
</script>