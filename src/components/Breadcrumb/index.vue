<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!-- <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item,index) in menuList" v-if="item.menuName" :key="index">
        <span v-if='item.menuType==1' class="no-redirect">{{ item.menuName }}</span>
        <router-link v-else :to="item.powerUrl">{{ item.menuName }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
// import Apimenu from '@/api/menu'

export default {
  data() {
    return {
      levelList: null,
      menuList:[]
    }
  },
  computed:{
    menu(){
      return this.$store.state.user.menu;
    }
  },
  watch: {
    $route() {
      // this.getBreadcrumb()
      this.menuList=[];
      var val = this.$store.state.user.menu
      val.map((items,indexVal) => {
        items.list.map((item,index) => {
          if(item.powerUrl === this.$route.fullPath){
            this.menuList.push(val[indexVal])
            this.menuList.push(items.list[index])
          }
        })
      })
    },
    menu(val, oldVal){
      val.map((items,indexVal) => {
        items.list.map((item,index) => {
          if(item.powerUrl === this.$route.fullPath){
            this.menuList.push(val[indexVal])
            this.menuList.push(items.list[index])
          }
        })
      })
    }
  },
  created() {
    // this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const { params } = this.$route
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
          var toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
      const first = matched[0]
      // if (first && first.name !== 'dashboard') {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      // }
      this.levelList = matched
      console.log(this.levelList)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
