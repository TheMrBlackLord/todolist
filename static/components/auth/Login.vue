<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div class="alert alert-danger"
              style="display: flex; justify-content: space-between;"
              v-for="(error, index) in errors" :key="index">
              {{error}}
              <span @click="removeError(index)">&times;</span>
            </div>
            <form @submit.prevent="submit">
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
                Login
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
      if (this.form.email && this.form.password) {
        this.isLoading = true
        await this.$store.dispatch('loginUser', this.form)
        this.isLoading = false
      } else {
        this.addError('Fill all necessary fields')
      }
    },
  }
}
</script>