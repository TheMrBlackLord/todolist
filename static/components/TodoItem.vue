<template>
   <div class="todo-item"
   v-b-tooltip.left.hover
   :title="`Click to ${todo.completed ? 'un' : ''}complete`"
   >
      <p class="todo-title" v-if="!isModifying" :class="{completed: todo.completed}">
         {{ todo.title }}
         <span class="todo-date text-muted">({{ date }})</span>
      </p>
      <input v-else type="text" class="form-control w-50" v-model="title">
      <div class="controls">
         <div class="default" v-if="!isModifying">
            <button class="btn btn-outline-primary" @click.prevent="isModifying = true" type="button"><i class="far fa-edit"></i></button>
            <button class="btn btn-outline-danger" @click.prevent="deleteTodo(todo.id)" type="button"><i class="far fa-trash-alt"></i></button>
         </div>
         <div class="modifying" v-else>
            <button class="btn btn-outline-danger" @click.prevent="isModifying = false" type="button"><i class="fas fa-times"></i></button>
            <button class="btn btn-outline-success" @click.prevent="confirmModifying" type="button"><i class="fas fa-check"></i></button>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
   props: {
      todo: {type: Object, required: true}
   },
   data() {
      return {
         isModifying: false,
         title: ''
      }
   },
   mounted() {
      this.title = this.todo.title
   },
   methods: {
      ...mapActions(['deleteTodo', 'editTodoTitle']),
      confirmModifying() {
         if (this.title) {
            this.editTodoTitle({
               id: this.todo.id,
               title: this.title
            })
            this.isModifying = false
         }
      }
   },
   computed: {
      date() {
         const todoDate = new Date(this.todo.date)
         const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(todoDate);
         const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(todoDate);
         const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(todoDate);
         return `${day} ${month} ${year}`
      }
   }
}
</script>