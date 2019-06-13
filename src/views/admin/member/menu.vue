<template>
    <div class="app-container">
        <el-dialog title="新建菜单" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="菜单类型：" prop="menuType">
                        <el-select v-model="formInline.menuType" placeholder="请选择" @change="getParentId">
                            <el-option label="目录" value="0"></el-option>
                            <el-option label="菜单" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="父菜单名称：" prop="parentId" v-if="formInline.menuType==1">
                        <el-select v-model="formInline.parentId" placeholder="请选择">
                            <el-option v-for="(item, index) in parentMenu" :key="index" :label="item.menuName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称：" prop="menuName">
                        <el-input v-model="formInline.menuName"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单icon：" prop="icon" v-if="formInline.menuType==0">
                        <el-input v-model="formInline.icon"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单访问路径：" prop="powerUrl" v-if="formInline.menuType==1">
                        <el-input v-model="formInline.powerUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单排序：" prop="orderNum">
                        <el-input v-model="formInline.orderNum"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单权限：" v-if="formInline.menuType==1">
                        <div style="width:100%">
                          <span style="width:47%;display:inline-block;">权限key</span>
                          <span style="width:47%;display:inline-block;">权限名称</span>
                          <i class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer;" v-if="formInline.powerList.length<7" @click="insertDom"></i>
                        </div>
                        <div style="display:inline-block;width:100%;margin-bottom:20px;" v-for="(item, index) in formInline.powerList" :key="index">
                          <el-input v-model="item.powerKey" style="width:45.6%;"></el-input>
                          --
                          <el-input v-model="item.powerName" style="width:45.6%;"></el-input>
                          <i class="el-icon-circle-close-outline" style="font-size:18px;cursor:pointer" v-if="formInline.powerList.length>0" @click="deleteDom(index)"></i>
                        </div>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑菜单" :visible.sync="dialogEditFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="菜单类型：" prop="menuType">
                        <el-select v-model="formInline.menuType" disabled placeholder="请选择">
                            <el-option label="目录" value="0"></el-option>
                            <el-option label="菜单" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="父菜单名称：" prop="parentId" v-if="formInline.menuType==1">
                        <el-select v-model="formInline.parentId" placeholder="请选择">
                            <el-option v-for="(item, index) in parentMenu" :key="index" :label="item.menuName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称：" prop="menuName">
                        <el-input v-model="formInline.menuName"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单icon：" prop="icon" v-if="formInline.menuType==0">
                        <el-input v-model="formInline.icon"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单访问路径：" prop="powerUrl" v-if="formInline.menuType==1">
                        <el-input v-model="formInline.powerUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单排序：" prop="orderNum">
                        <el-input v-model="formInline.orderNum"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单权限：" v-if="formInline.menuType==1">
                        <div style="width:100%">
                          <span style="width:47%;display:inline-block;">权限key</span>
                          <span style="width:47%;display:inline-block;">权限名称</span>
                          <i class="el-icon-circle-plus-outline" style="font-size:18px;cursor:pointer;" v-if="formInline.powerList.length<7" @click="insertDom"></i>
                        </div>
                        <div style="display:inline-block;width:100%;margin-bottom:20px;" v-for="(item, index) in formInline.powerList" :key="index">
                          <el-input v-model="item.powerKey" style="width:45.6%;"></el-input>
                          --
                          <el-input v-model="item.powerName" style="width:45.6%;"></el-input>
                        <i class="el-icon-circle-close-outline" style="font-size:18px;cursor:pointer" v-if="formInline.powerList.length>0" @click="deleteDom(index)"></i>
                        </div>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postEditData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="父菜单id:">
                <el-input v-model="search.parentMenuId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称:">
                <el-input v-model="search.menuName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型:">
                <el-select v-model="search.menuType" placeholder="请选择">
                    <el-option label="目录" value="0"></el-option>
                    <el-option label="菜单" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态:">
                <el-select v-model="search.status" clearable placeholder="请选择">
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-table ref="multipleTable" :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="parentId" label="父菜单id"></el-table-column>
            <el-table-column prop="menuName" label="菜单名称"></el-table-column>
            <el-table-column prop="icon" label="菜单icon"></el-table-column>
            <el-table-column prop="menuType" label="菜单类型">
                <template slot-scope="scope">
                  {{scope.row.menuType?"菜单":"目录"}}
                </template>
            </el-table-column>
            <el-table-column prop="powerUrl" label="菜单访问路径"></el-table-column>
            <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->
            <el-table-column prop="status" label="菜单状态">
                <template slot-scope="scope">
                    <span v-if="!scope.row.status" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.status?"启用":"禁用"}}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editList(scope.row)">编辑</el-button>
                    <span style="margin:0 10px;color:#D4E2F0">|</span> 
                    <el-button v-if="scope.row.status==1" type="text" size="small" @click="forbid(scope.row)">禁用</el-button>
                    <el-button v-if="scope.row.status==0" type="text" size="small" @click="start(scope.row)">启用</el-button>
                    <!-- <el-dropdown trigger="click" @command="changeStatus(scope.row,$event)">
                        <el-button size="small" type="text"> 
                            更多 <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <div v-if="!scope.row.status">
                                <el-dropdown-item command="1">启用</el-dropdown-item>
                            </div>
                            <div v-else>
                                <el-dropdown-item command="2">禁用</el-dropdown-item>
                                <el-dropdown-item command="3">重置密码</el-dropdown-item>
                            </div>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                   <!-- <el-button type="text" size="small" style="color:#FF6666" @click="deleteList(scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="search.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import ApiMenu from "@/api/menu";
import ApiUser from "@/api/user";
import ApiRole from "@/api/role";
import { openUrl } from "@/utils/index";
export default {
  data() {
    var validateNumber = (rule, value, callback) => {
      if(value){
        if (/^[0-9]+$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));
        }
      }else{
          callback();
      }
    };
    return {
      formInline: {
        powerList:[{
          powerKey: "",
          powerName: ""
        }]
      },
      formInlineReset: {
        powerList:[{
          powerKey: "",
          powerName: ""
        }]
      },
      rules: {
        menuType: [
          { required: true, message: "请选择菜单类型", trigger: "change" }
        ],
        menuName: [
          { required: true, message: "请填写菜单名称", trigger: "blur" },
          { max: 8, message: '最大长度为8个字符', trigger: 'blur' }
        ],
        powerUrl: [
          { required: true, message: "请填写菜单访问路径", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "请选择父菜单名称", trigger: "change" }
        ],
        icon: [
          { required: true, message: "请填写菜单icon", trigger: "blur" }
        ],
        orderNum: [
          { validator: validateNumber, trigger: 'blur' }
        ]
      },
      tableData: [],
      search: {
        currentPage: 1,
        pageSize: 10
      },
      searchReset: {
        currentPage: 1,
        pageSize: 10
      },
      parentMenu: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false
    };
  },
  created() {
    ApiMenu.apiParentMenuTree("parentMenu_tree").then(res => {
      this.parentMenu = res.data;
    });
    this.init();
  },
  methods: {
    //获取账号列表及角色列表
    init() {
      ApiMenu.apiList("list", this.search).then(
        res => {
          this.tableData = res.data;
        }
      );
    },
    // 动态获取父菜单id
    getParentId(){
      ApiMenu.apiParentMenuTree("parentMenu_tree").then(res => {
        this.parentMenu = res.data;
      });
    },
    //改变每页数据数量
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.init();
    },
    //改变当前页码
    handleCurrentChange(val) {
      this.search.currentPage = val;
      this.init();
    },
    //查询
    onSubmit() {
      this.search.currentPage=1
      this.init();
    },
    //重置表单
    clear() {
      this.search = JSON.parse(JSON.stringify(this.searchReset));
      this.init();
    },
    insertDom(){
      var obj = {
        powerKey: "",
        powerName: ""
      }
      this.formInline.powerList.push(obj);
    },
    deleteDom(index){
      this.formInline.powerList.splice(index,1);
    },
    checkRule(val){
      for(var i=0;i<val.length;i++){
        if(val[i].powerKey!=''){
          if(val[i].powerKey.indexOf(':all')!=-1){
            this.$message.error("命名不合法，包含保留key值：all");
            return false;
          }
        }else if(val[i].powerKey=='' && val[i].powerName==''){
          this.formInline.powerList.splice(i,1)
          i=i-1;
        }
      }
      return true;
    },
    postData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.checkRule(this.formInline.powerList)){
            return
          }
          this.cleanData(this.formInline.menuType)
          ApiMenu.apiInsert(this.formInline, "insert").then(response => {
            if (response.code == "200") {
              this.$message.success("新增菜单成功");
              this.init();
              this.$refs[formName].resetFields();
              this.dialogFormVisible = false;
              this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
            } else {
              this.$message.error(response.message);
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
    },
    editList(row) {
      ApiMenu.apiId("id", row.id).then(response => {
          this.formInline = response.data;
          if(this.formInline.powerList.length==0){
            var obj = {
              powerKey: "",
              powerName: ""
            }
            this.formInline.powerList.push(obj);
          }
          this.formInline.menuType = String(this.formInline.menuType)
          this.dialogEditFormVisible = true;
        })
    },
    resetEidtForm(formName) {
      this.dialogEditFormVisible = false;
      this.$refs[formName].resetFields();
      this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
    },
    postEditData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.checkRule(this.formInline.powerList)){
            return;
          }
          this.cleanData(this.formInline.menuType)
          ApiMenu.apiUpdateMenu(this.formInline, "updateMenu").then(response => {
            if (response.code == "200") {
              this.$message.success("编辑菜单成功");
              this.dialogEditFormVisible = false;
              this.init();
              this.$refs[formName].resetFields();
              this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
            } else {
              this.$message.error(response.message);
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    forbid(row){
      this.$confirm("禁用此菜单, 是否继续?","禁用菜单确认",{
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var obj={
          id:row.id,
          status:0
        }
        ApiMenu.apiUpdateMenuStatus(obj,'updateMenuStatus').then(response => {
          if(response.code == '200'){
              this.$message.success('操作成功')
              this.init()
          }else{
              this.$message.error(response.message)
          }
        })
      }).catch(() => {})
    },
    start(row){
        this.$confirm("启用此菜单, 是否继续?","启用菜单确认",{
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          var obj={
            id:row.id,
            status:1
          }
          ApiMenu.apiUpdateMenuStatus(obj,'updateMenuStatus').then(response => {
            if(response.code == '200'){
                this.$message.success('操作成功')
                this.init()
            }else{
                this.$message.error(response.message)
            }
          })
        }).catch(() => {})
    },
    cleanData(val){
      if(val=='0'){
        delete this.formInline.parentId
        delete this.formInline.powerUrl
        delete this.formInline.powerList
      }else{
        delete this.formInline.icon
      }
    }
  }
};
</script>
<style lang="scss">
.alert {
  height: 40px;
  margin-top: 20px;
  line-height: 40px;
  padding-left: 10px;
  font-size: 14px;
  i {
    color: #2491fc;
  }
  .msg_color {
    color: #2491fc;
  }
}
</style>
