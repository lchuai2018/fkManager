<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <Changepwd :dialogFormVisible="dialogFormVisible" @submit="submitForm" @colse="resetForm"></Changepwd>
    <el-dropdown class="avatar-container" trigger="click" @command="showDiloag">
      <div class="avatar-wrapper">
        <img src="@/assets/404_images/avatar.jpg" class="user-avatar" style="vertical-align: top;border-radius:50%">
        {{name}}
        <i class="el-icon-caret-bottom" style="top:20px"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="password">
            修改密码
          </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Changepwd from '@/components/Changepwd'

export default {
  data(){
    return{
      dialogFormVisible:false
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    Changepwd
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({path:"/login"})
        // location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    showDiloag(command){
      if(command=='password'){
        this.dialogFormVisible=true

      }

    },
    submitForm(formName) {
            this.dialogFormVisible = false;
            this.$router.push({
                path:'/login'
            })
    },
    resetForm(formName) {
       this.dialogFormVisible = false;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

