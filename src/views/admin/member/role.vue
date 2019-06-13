<template>
    <div class="app-container box">
        <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left" class="tab-role-column">
            <el-tab-pane v-for="(item,i) in roleList" :key="i" :label="item.roleName" :name="String(item.id)">
                <p class="title"><span>模块</span><span>权限</span>
                    <span>全选</span>
                </p>
                <div class="content" v-for="(item,i) in lists" :key="i">
                    <span class="name">{{item.menuName}}</span>
                    <el-checkbox-group v-model="menuIds" @change="handleCheckedChange">
                        <el-checkbox v-for="(items,j) in item.list" 
                            :label="items.id" :key="j"
                            @change="checkboxChange(item.id)"  style="margin-left:0px;">{{items.powerName}}</el-checkbox>
                    </el-checkbox-group>
                     <el-checkbox v-model="item.checkAll" @change="handleCheckAllChange(item.id)"></el-checkbox>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-button type="text" @click="showAdd=!showAdd" style="margin-left:30px;">+ 新增角色</el-button>
         <el-button type="primary" @click="updateFun" class="role-edit-btn">保存</el-button>
         <el-button type="text" style="margin-left:300px" @click="goRoleList">查看该角色下账号</el-button>
        <el-form ref="numberValidateForm" v-if="showAdd">
            <el-form-item :model="managerRoleInfo">
                <el-input v-model="managerRoleInfo" maxlength="10" placeholder="请输入角色名称" style="width:200px" size="samll"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="submitForm('numberValidateForm')">提交</el-button>
                <el-button size="small" @click="resetForm('numberValidateForm')">取消</el-button>
            </el-form-item>
        </el-form>
       
    </div>
</template>
<script>
import ApiRole from "@/api/role";
import ApiMenu from "@/api/menu";
export default {
  data() {
    return {
      activeName: "",
      roleList: [],
      menuIds: [],
      isIndeterminate: true,
      lists: [],
      menuIdList: [],
      showAdd: false,
      managerRoleInfo: ""
    };
  },
  created() {
    this.getRole();
  },
  mounted() {
  },

  methods: {
    //获取所有角色
    getRole() {
      ApiRole.apiSelectAllRole("selectAllRole").then(res => {
        this.roleList = res.data;
        this.activeName = String(this.roleList[0].id);
        this.roleId(this.activeName);
      });
    },
    //查看角色信息
    roleId(id) {
      const _this = this;
      ApiRole.apiRoleId(id).then(res => {
        this.menuIdList = res.data.menuIdList;
        this.menuIds = this.menuIdList;
        this.roleLsit();
      });
    },
    //获取角色菜单
    roleLsit() {
      ApiMenu.apiTree("tree").then(res => {
        this.lists = res.data;
        this.lists.map((item,i)=>{
          item.arr=[]
          item.result=[]
          item.list.map((li,j)=>{
            item.arr.push(li.id)
          })
           item.result=item.arr.every(v=>{
          return this.menuIds.indexOf(v)>-1

          })
          item.checkAll=item.result

        })
      });
    },
     handleCheckAllChange(id) {
       this.lists.map((item,i)=>{
         if(item.checkAll){
         if(item.id==id){
           item.list.map((lists,j)=>{
             if(this.menuIds.indexOf(lists.id)==(-1)){
              this.menuIds.push(lists.id)
             }

           })
         }
         }
         if(!item.checkAll){
           if(item.id==id){
           item.list.map((lists,j)=>{
             if(this.menuIds.indexOf(lists.id)!=(-1)){
               let index=this.menuIds.indexOf(lists.id)
              this.menuIds.splice(index,1)
             }

           })
         }
         }
       })
      },
    handleClick(e) {
      this.activeName = e.name;
      this.roleId(this.activeName);
    },
    handleCheckedChange(value) {
      this.lists.map((item,i)=>{
          item.list.map((li,j)=>{
            item.arr.push(li.id)
          })
           item.result=item.arr.every(v=>{
          return this.menuIds.indexOf(v)>-1

          })
          item.checkAll=item.result
        })
        this.$mount()

    },
    checkboxChange(value) {
      // console.log(value)
    },
    //编辑角色
    updateFun() {
      this.menuIds.map((item, i) => {
        parseInt(item);
      });
      //this.menuIds=Array.form(new Set(this.menuIds))
      const menus = {
        menuIdList: this.menuIds,
        roleId: parseInt(this.activeName)
      };
      // console.log(menus);
      ApiRole.apiAddRoleToMenus("addRoleToMenus", menus).then(res => {
        this.roleId(this.activeName);
        this.$message({
          message: "赋予角色权限成功",
          type: "success"
        });
        }).catch(err=>{
        //      this.$message({
        //   message: err.massage,
        //   type: 'warning'
        // });
      });
    },
    //新增角色
    submitForm() {
      ApiRole.apiInsert("insert", {
        roleName: this.managerRoleInfo,
        status: 1
      }).then(res => {
        this.showAdd = false;
        this.getRole();
        this.managerRoleInfo = "";
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.managerRoleInfo = "";
      this.showAdd = false;
    },
    //查看角色下账号
    goRoleList(){
        this.$router.push({
            path:'/adminMember/account',
            query:{roleId:this.activeName}
        })
    }
  }
};
</script>
<style lang="scss">
.role-edit-btn {
  margin-left: 200px !important;
  margin-top: 20px;
} 
.tab-role-column {
  overflow: hidden;
  *zoom: 1;
  .el-tabs__item.is-left {
  height: 80px !important;
  // width: 120px;
}
.el-checkbox+.el-checkbox{
  margin-left:0;
}
  .el-tabs__nav.is-left::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 5px;
    }
.el-tabs__nav.is-left::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #e4e7ed;
    }
.el-tabs__nav.is-left::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #fff;
    }
  .el-tabs__nav.is-left{
      height:500px;
      overflow: scroll;
  }
  span.name {
    font-size: 14px;
    color: #666;
    width: 160px;
    display: inline-block;
  }
  .el-tabs__content {
    padding: 0 30px;
  }
  .el-checkbox {
    margin-right: 40px;
  }
  .el-checkbox-group {
    display: inline-block;
    flex: 1;
  }
  .el-tabs__item {
    line-height: 60px;
  }
  .content {
    display: flex;
    padding: 25px 0;
    border-bottom: 1px solid #eee;
  }
  .title {
    font-size: 14px;
    color: #000;
    display: flex;
    border-bottom: 1px solid #eee;
    margin: 0;
    margin-left: -20px;
    padding: 12px 0;
    padding-left: 20px;
    font-size:16px;

    span{
      width: 160px;
    }
    span:nth-child(2) {
      flex: 1;
    }
    span:last-child{
      width:60px;
    }
  }
}
</style>
