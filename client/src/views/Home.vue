<template>
  <div>
    <navTop/>
    <div class="ui grid">
      <div class="ui three wide column">
        <seacrh @query="querySearch=$event"/>
      </div>
      <div class="ui ten wide column">
        <create-status @load="reqLoadData=$event"/>
        <listStatus v-bind:listData="fetchData" v-bind:query="querySearch" v-bind:refresh="reqLoadData" @doneRefresh="reqLoadData=$event"/>
      </div>
      <div class="ui three wide column">
        Kanan
      </div>
    </div>
  </div>
</template>

<script>
import navTop from '../components/nav-top.vue'
import listStatus from '../components/listStatus.vue'
import seacrh from '../components/search.vue'
import createStatus from '../components/createStatus.vue'
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      querySearch : '',
      reqLoadData: '0'
    }
  },
  computed: {
    ...mapState(['fetchData'])
  },
  components: {
    navTop, listStatus, seacrh, createStatus
  }
}
</script>
