<template>
  <div class="ui form">
    <textarea  rows="5" v-model="descriptionVal"></textarea>
    <button class="ui button" @click="createStatus">create status</button>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config.js'
export default {
  name: 'createStatus',
  data () {
    return {
      descriptionVal: ''
    }
  },
  methods: {
    createStatus () {
      axios({
        url: `${config.host}/status`,
        method: 'post',
        data: {
          description: this.descriptionVal
        },
        headers : {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$emit('load','1')
        })
        .catch(response => {
          console.log(response)
        })
    }
  }
}
</script>

<style>

</style>
