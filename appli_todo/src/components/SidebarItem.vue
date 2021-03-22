<template>
<!-- div for debug -->
<div class="bg-gray-900 mx-8 rounded-md hover:bg-orange-700 cursor-pointer">
  
  <p class="font-medium p-1">{{ name }} ({{ getTodos(id, "completed").length }}/{{ getTodos(id).length}})</p>
  
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
