<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
    <div class="menuLogo" style="padding:20px 15px;background:#304156;text-align: center;border-bottom:1px solid #00A6FF">
      <img src="@/assets/404_images/logo.png" alt="" style="margin-left: -14px;">
    </div>
    <sidebar-item v-for="(route,index) in menu" :key="index" :item="route"/>
      <!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/> -->
    </el-menu>
  </el-scrollbar>
</template>

<script>
import Apimenu from '@/api/menu'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  data(){
    return{
      menu:''
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // console.log(this.$router.options.routes)
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    Apimenu.apiLoginMenu('login_menu/list').then(response => {
        this.menu = response.data.menuList;
        this.$store.state.user.menu = this.menu;
        // this.$router.push({ path: this.menu[0].list[0].powerUrl })
    }).then()
  },
}
</script>
