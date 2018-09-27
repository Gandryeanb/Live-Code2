<template>
    <div class="ui segment form">
        <input type="text" placeholder="Search" v-model="query">
        <button class="ui button"> Search </button>
    </div>
</template>

<script>
import axios from 'axios'
import config from '../config.js'

export default {
  name: 'search',
  data () {
    return {
      query: ''
    }
  },
  watch: {
    query () {
      if (this.query !== '') {
        this.$emit('query', this.query)
      }
    }
  }
}
</script>

<style>

</style>
