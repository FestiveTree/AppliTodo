<template>
<!-- div for debug -->
<div class="flex px-2 bg-black border-gray-700 mx-8 rounded-md hover:bg-orange-700 hover:border-orange-500 cursor-pointer border-b-4 my-1">
  
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
