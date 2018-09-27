<template>
    <div class="ui container">
      <div class="ui fluid card" v-for="(status, index) in allStatus" :key="index">
        <div class="content">
            <div class="header">{{status.userId.name}}</div>
            <p>{{status.description}}</p>
        </div>
    </div>
    </div>
</template>

<script>
import config from '../config'
import axios from 'axios'

export default {
  name: 'listStatus',
  data () {
    return {
      allStatus: []
    }
  },
  props: ['listData', 'query', 'refresh'],
  created () {
    this.getData()
  },
  watch: {
    refresh () {
      this.getData()
      this.$emit('doneRefresh', '0')
    },
    query () {
      if (this.query !== '') {
        this.getNewData()
      } else {
        this.getData()      
      }
    }
  },
  methods: {
    getData () {
      let self = this
      axios({
        url: `${config.host}/status`,
        method: 'get'
      })
      .then(response => {
        let data = response.data.data.reverse()
        self.allStatus = data
      })
      .catch(response => {
        console.log(response)
      })
    },
    getNewData () {
      let self = this
      axios({
        url: `${config.host}/status/search/${this.query}`,
        method: 'get'
      })
      .then(response => {
        let data = response.data.data.reverse()
        self.allStatus = data
      })
      .catch(reponse => {
        console.log(reponse)
      })
    }
  }
}
</script>

<style>

</style>
