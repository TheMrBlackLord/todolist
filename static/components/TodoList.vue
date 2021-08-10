<template>
   <div class="row justify-content-center my-5">
      <div class="col-6">
         <div class="card text-center">
         <div class="card-header"><strong>List</strong></div>
         <div class="card-body">
            <div class="section">
               <h5 class="title">Add task</h5>
               <div class="content">
                  <form class="form-inline add-task-form" @submit.prevent="addTask" @keypress.enter.prevent="addTask">
                     <input class="form-control" type="text" :disabled="!user" v-model="form.title" placeholder="Your task">
                     <button class="btn btn-outline-success" type="submit" :disabled="!form.title || !user">Add task</button>
                  </form>
               </div>
            </div>
            <div v-if="isLoading && user" class="d-flex justify-content-center align-items-center">
               <span class="spinner-border text-dark" role="status"></span>
            </div>
            <div v-else-if="user">
               <div class="section">
                  <h5 class="title">To Do</h5>
                  <div class="content">
                     <div v-if="notComplited.length">
                        <TodoItem v-for="todo in notComplited" :key="todo.id" :todo="todo"
                        @click.native.prevent="todoClicked($event, {
                           id: todo.id,
                           completed: true
                        })"/>
                     </div>
                     <p v-else class="text-muted">No tasks yet.</p>
                  </div>
               </div>
               <div class="section">
                  <h5 class="title">Completed</h5>
                  <div class="content">
                     <div v-if="completed.length">
                        <TodoItem v-for="todo in completed" :key="todo.id" :todo="todo"
                        @click.native.prevent="todoClicked($event, {
                           id: todo.id,
                           completed: false
                        })"/>
                     </div>
                     <p v-else class="text-muted">No tasks yet.</p>
                  </div>
               </div>
            </div>
            <p v-else class="text-center text-muted">Login or register please.</p>
         </div>
      </div>
      </div>
   </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
   components: {
      TodoItem
   },
   data() {
      return {
         isLoading: true,
         form: {
            title: ''
         }
      }
   },
   async mounted() {
      await this.getTodos()
      this.isLoading = false 
   },
   methods: {
      ...mapActions(['getTodos', 'createTodo', 'changeTodoComplete']),
      addTask() {
         if (this.form.title && this.user) {
            this.createTodo(this.form.title)
            
            this.form.title = ''
         }
      },
      // complete || uncomplete todo
      todoClicked(e, payload) {
         if (e.target.classList.contains('todo-item'))
            this.changeTodoComplete(payload)
      }
   },
   computed: {
      ...mapGetters(['todos', 'user']),
      notComplited() {
         return this.todos.filter(todo => !todo.completed)
      },
      completed() {
         return this.todos.filter(todo => todo.completed)
      }
   }
}
</script>
