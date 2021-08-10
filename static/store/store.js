import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import router from '../vue-router.js'

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      todos: [],
      errors: [],
      token: null,
      user: null
   },
   getters: {
      todos(state) {
         return state.todos
      },
      errors(state) {
         return state.errors
      },
      token(state) {
         return state.token
      },
      user(state) {
         return state.user
      }
   },
   mutations: {
      setTodos(state, todos) {
         state.todos = todos
      },
      pushTodo(state, todo) {
         state.todos.push(todo)
      },
      addError(state, error) {
         state.errors = state.errors.concat(error)
      },
      removeError(state, index) {
         state.errors = state.errors.filter((error, idx) => idx !== index)
      },
      setToken(state, token) {
         localStorage.setItem('token', token)
         state.token = token
      },
      removeToken(state) {
         localStorage.removeItem('token')
         state.token = null
      },
      setUser(state, user) {
         state.user = user
      },
      removeUser(state) {
         state.user = null
      },
      changeTodoComplete(state, { id, completed }) {
         const todo = state.todos.find(t => t.id === id)
         todo.completed = completed
      },
      deleteTodo(state, id) {
         state.todos = state.todos.filter(todo => todo.id !== id)
      },
      editTodoTitle(state, { id, title }) {
         const todo = state.todos.find(t => t.id === id)
         todo.title = title
      }
   },
   actions: {
      async getTodos({ commit, state }) {
         const token = state.token || localStorage.getItem('token')
         try {
            const response = await axios.get('/api/getTodos', {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               }
            })
            commit('setTodos', response.data)
         } catch (e) {
            console.error(e.message)
         }
      },
      async createTodo({ commit, state }, title) {
         const token = state.token || localStorage.getItem('token')
         try {
            const response = await axios('/api/createTodo', {
               method: 'post',
               data: {title},
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               }
            })
            commit('pushTodo', response.data)
         } catch (e) {
            console.error(e.message)
         }
      },
      async registerUser({ commit, dispatch }, formData) {
         try {
            const response = await axios({
               method: 'post',
               url: '/auth/register',
               data: formData,
               headers: {'Content-Type': 'application/json'}
            })
            commit('setToken', response.data.token)
            dispatch('getUser')
            router.push({name: 'home'})
        } catch (e) {
            commit('addError', e.response?.data?.message || 'Something went wrong')
        }
      },
      async loginUser({ commit, dispatch }, formData) {
         try {
            const response = await axios({
               method: 'post',
               url: '/auth/login',
               data: formData,
               headers: {'Content-Type': 'application/json'}
            })
            commit('setToken', response.data.token)
            await dispatch('getUser')
            router.push({name: 'home'})
        } catch (e) {
            commit('addError', e.response?.data?.message || 'Something went wrong')
        }
      },
      async getUser({ commit, state }) {
         const token = state.token || localStorage.getItem('token')
         if (token) {
            try {
               const response = await axios('/api/getUser', {
                  method: 'get',
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                  }
               })
               commit('setUser', response.data)
            } catch(e) {
               console.error(e.message)
            }
         }
      },
      logout({ commit }) {
         commit('removeToken')
         commit('removeUser')
      },
      async changeTodoComplete({ commit, state }, { id, completed }) {
         const token = state.token || localStorage.getItem('token')
         try {
               const response = await axios('/api/changeTodoComplete', {
                  method: 'patch',
                  data: {id, completed},
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                  }
               })
               commit('changeTodoComplete', {
                  id,
                  completed: response.data.completed
               })
         } catch(e) {
            console.error(e.message)
         }
         
      },
      async deleteTodo({ commit, state }, id) {
         const token = state.token || localStorage.getItem('token')
         try {
               const response = await axios('/api/deleteTodo', {
                  method: 'delete',
                  data: {id},
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                  }
               })
               if (response.data.isDeleted)
                  commit('deleteTodo', id)
         } catch(e) {
            console.error(e.message)
         }
      },
      async editTodoTitle({ commit, state }, { id, title }) {
         const token = state.token || localStorage.getItem('token')
         try {
               const response = await axios('/api/editTodoTitle', {
                  method: 'patch',
                  data: {id, title},
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                  }
               })
               commit('editTodoTitle', {
                  id, 
                  title: response.data.title
               })
         } catch(e) {
            console.error(e.message)
         }
      }
   }
})

export default store