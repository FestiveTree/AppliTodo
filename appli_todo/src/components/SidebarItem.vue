<template>
<!-- div for debug -->
<div style="background-color: green">
  
  <p>{{ name }}</p>
  
</div>
</template>

<script>
import { defineComponent } from 'vue'

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
  }
})

</script>
