<template>
<!-- div for debug -->
<div style="background-color: green">
  
  <p>{{ name }} ({{ getTodos(id, "completed").length }}/{{ getTodos(id).length}})</p>
  
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'


export default defineComponent({
  name: 'SidebarItem',
  props: {
    id: {
      type: Number,
      defualt: 0
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('todolist', ['getTodos'])
  },
})

</script>
