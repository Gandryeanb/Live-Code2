<template>
  <div class="ui segment">
    <div class="ui grid">
        <div class="ui ten wide column">

        </div>
        <div class="ui six wide column">
            <div class="ui row" v-if="!userLog">
                <div class="ui floated right input">
                <input type="text" placeholder="Email/Username" style="margin-left:10px;" v-model="identity">
                <input type="password" placeholder="Password" style="margin-left:10px;" v-model="password">
                <button class="ui right floated button" style="margin-left:10px;" @click="login"> Login</button>
                <button class="ui right disabled floated button" style="margin-left:10px;"> Register</button>
                </div>
            </div>
            <div class="ui row" v-else>
              <button class="ui button" @click="logout">Logout</button>
            </div>
        </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'topNav',
  data () {
    return {
      identity: '',
      password: '',
    }
  },
  computed : {
    ...mapState(['userLog'])
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.whoIsThis(token)
    }
  },
  methods: {
    ...mapActions(['currentUser']),
    whoIsThis (token) {
      self = this
      axios({
        url: `${config.host}/users/check`,
        method: 'post',
        headers: {
          token: token
        }
      })
        .then(response => {
          self.currentUser(response.data)
        })
        .catch(response => {
          console.log(response)
        })
    },
    logout () {
      localStorage.removeItem('token')
      this.currentUser(null)
    },
    login() {
      let self = this
      let path = ''
      if (this.identity.indexOf('.com') !== -1) {
        path = 'email'
      } else {
        path = 'username'
      }
      axios({
        url: `${config.host}/users/login/${path}`,
        method: 'post',
        data: {
          email: this.identity,
          username: this.identity,
          password: this.password
        }
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        let token = localStorage.getItem('token')
        self.whoIsThis(token)
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
