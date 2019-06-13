<template>
    <div class="app-container">
        <el-dialog title="新建账号" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="登陆账号：" prop="accountNumber">
                        <el-input v-model="formInline.accountNumber" placeholder="唯一性"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="formInline.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="formInline.name" placeholder="2个以上汉字，可相同" ></el-input>
                    </el-form-item>
                    <el-form-item label="手机：" prop="phone">
                        <el-input v-model="formInline.phone" placeholder="11位数字" maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="角色：" prop="roleId">
                        <el-select v-model="formInline.roleId" placeholder="请选择">
                            <el-option v-for="(item,i) in roleList" :label="item.roleName" :value="item.id" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员描述：">
                        <el-input type="textarea" v-model="formInline.remark" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑人员" :visible.sync="dialogEditFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                   <el-form-item label="登陆账号：">
                       <span>{{formInline.accountNumber}}</span>
                        <!-- <el-input v-model="formInline.accountNumber" disabled></el-input> -->
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="formInline.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="formInline.name" placeholder="2个以上汉字，可相同" ></el-input>
                    </el-form-item>
                    <el-form-item label="手机：" prop="phone">
                        <el-input v-model="formInline.phone" placeholder="11位数字"></el-input>
                    </el-form-item>
                    <el-form-item label="角色：" prop="roleId">
                        <el-select v-model="formInline.roleId">
                            <el-option v-for="(item,i) in roleList" :label="item.roleName" :value="item.id" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员描述：">
                        <el-input type="textarea" v-model="formInline.remark" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postEditData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="姓名:">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="角色:">
                <el-select v-model="search.roleIds" placeholder="请输入">
                    <el-option label="全部" :value="null"></el-option>
                    <el-option v-for="(item,i) in roleList" :label="item.roleName" :value="item.id" :key="i"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态:">
                <el-select v-model="search.status" clearable placeholder="请输入">
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
        <!-- <el-button @click="exportData">导出</el-button> -->
        <el-dropdown style="margin-left:10px;" trigger="click" @command="handleCommand($event)">
            <el-button>
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">批量启用</el-dropdown-item>
                <el-dropdown-item command="2">批量禁用</el-dropdown-item>
                <el-dropdown-item command="3">批量重置密码</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="alert">
            <i class="el-icon-info"></i>
            <span class="alert_message">已选择 <span class="msg_num msg_color">{{length}}</span> 项 <span class="msg_delete msg_color pointer" @click="cancelCheck">清空</span> </span>
        </div>
        <el-table ref="multipleTable" :data="tableData.list" style="width: 100%;margin-top:20px;" @selection-change="select">
            <el-table-column type="selection" width="75"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="accountNumber" label="登陆账号"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最近一次登录时间"></el-table-column>
            <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->
            <el-table-column prop="status" label="账号状态">
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
                    <el-dropdown trigger="click" @command="changeStatus(scope.row,$event)">
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
                    </el-dropdown>
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
import ApiUser from "@/api/user";
import ApiRole from "@/api/role";
import { openUrl } from "@/utils/index";
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value) {
        if (/^[\da-zA-Z._]+$/.test(value)) {
          ApiUser.apiCheckAccount("check_account", value).then(res => {});
          callback();
        } else {
          callback(new Error("请输入正确的账号格式"));
        }
      }
    };
    var validateName = (rule, value, callback) => {
      if (value) {
        if (/^[\u4e00-\u9fa5]+$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的姓名"));
        }
      }
    };
    // var validatePhone = (rule, value, callback) => {
    //   if (value) {
    //     if (value.length == 11 && /^[1][0-9]{10}$/.test(value)) {
    //       callback();
    //     } else {
    //       callback(new Error("请输入正确的手机号码"));
    //     }
    //   }
    // };
    return {
      formInline: {},
      formInlineReset: {},
      rules: {
        accountNumber: [
          { required: true, message: "请填写账号", trigger: "blur" }
          // { validator: validateAccount, trigger: 'blur' }
        ],
        name: [
          { required: true, message: "请填写姓名", trigger: "blur" }
          // { min: 2, message: '2个以上汉字', trigger: 'blur' },
          // { validator: validateName, trigger: 'blur' }
        ],
        phone: [
             { required: true, message: "请填写手机号", trigger: "blur"}
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
        email: [{ required: true, message: "请填写邮箱账号", trigger: "blur" }],
      },
      length: 0,
      tableData: [],
      multipleTable: [],
      search: {
        currentPage: 1,
        pageSize: 10
      },
      searchReset: {
        currentPage: 1,
        pageSize: 10
      },
      roleList: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false
    };
  },
  created() {
    // this.selectAllRole()
    this.$route.query.roleId
      ? (this.search.roleIds = Number(this.$route.query.roleId))
      : "";
    this.init();
    ApiRole.apiTreeList("tree_list").then(res => {
      this.roleList = res.data;
    });
  },
  methods: {
    //获取账号列表及角色列表
    init() {
      ApiUser.apiSelectAllManagers("selectAllManagers", this.search).then(
        res => {
          this.tableData = res.data;
        }
      );
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
    //导出
    exportData() {
      openUrl("users/exportAllManagers", this.search);
    },
    // table栏勾选
    select(row, selection) {
      this.multipleTable = row;
      this.length = row.length;
    },
    // 取消选中
    cancelCheck() {
      this.length = 0;
      this.$refs.multipleTable.clearSelection();
    },
    //批量启用、禁用、重置密码
    handleCommand(command) {
      switch (command) {
        case "1":
          this.$confirm("批量启用账号恢复登录及其他权限, 是否继续?","启用账号确认",{
              confirmButtonText: "继续",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              var obj = {
                managerIds: [],
                type: 0,
                status: 1
              };
              for (var i = 0; i < this.multipleTable.length; i++) {
                obj.managerIds.push(this.multipleTable[i].id);
              }
              ApiUser.apiUpdateManagerList(obj, "updateManagerList").then(
                res => {
                  this.init();
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                }
              );
            })
          break;
        case "2":
          this.$confirm("批量禁用账号冻结登录及其他权限, 是否继续?","禁用账号确认",{
              confirmButtonText: "继续",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              var obj = {
                managerIds: [],
                type: 0,
                status: 0
              };
              for (var i = 0; i < this.multipleTable.length; i++) {
                obj.managerIds.push(this.multipleTable[i].id);
              }
              ApiUser.apiUpdateManagerList(obj, "updateManagerList").then(
                res => {
                  this.init();
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                }
              );
            })
          break;
        case "3":
          this.$confirm("批量重置密码至123456, 是否继续?", "重置密码确认", {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              var obj = {
                managerIds: [],
                type: 1
              };
              for (var i = 0; i < this.multipleTable.length; i++) {
                obj.managerIds.push(this.multipleTable[i].id);
              }
              ApiUser.apiUpdateManagerList(obj, "updateManagerList").then(
                res => {
                  this.init();
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                }
              );
            })
          break;
        default:
          break;
      }
    },
    //启用、禁用、重置密码
    changeStatus(row, command) {
      switch (command) {
        case "1":
          this.$confirm("启用后此账号恢复登录及其他权限, 是否继续?","启用账号确认",{
              confirmButtonText: "继续",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              var obj = {
                managerIds: [],
                type: 0,
                status: 1
              };
              obj.managerIds[0] = row.id;
              ApiUser.apiUpdateManagerList(obj, "updateManagerList").then(
                res => {
                  this.init();
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                }
              );
            })
          break;
        case "2":
          this.$confirm("禁用后此账号冻结登录及其他权限, 是否继续?","禁用账号确认",{
              confirmButtonText: "继续",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              var obj = {
                managerIds: [],
                type: 0,
                status: 0
              };
              obj.managerIds[0] = row.id;
              ApiUser.apiUpdateManagerList(obj, "updateManagerList").then(
                res => {
                  this.init();
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                }
              );
            })
          break;
        case "3":
          this.$confirm("重置密码至123456, 是否继续?", "重置密码确认", {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              var obj = {
                managerIds: [],
                type: 1
              };
              obj.managerIds[0] = row.id;
              ApiUser.apiUpdateManagerList(obj, "updateManagerList").then(
                res => {
                  this.init();
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                }
              );
            })
          break;
        default:
          break;
      }
    },
    postData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ApiUser.apiAddManager(this.formInline, "addManager").then(response => {
              if (response.code == "200") {
                this.$message.success("新增账号成功");
                this.init();
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.formInline = JSON.parse(
                  JSON.stringify(this.formInlineReset)
                );
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
      ApiUser.apiSelectOneManager(row.id).then(response => {
          this.formInline = response.data;
          delete this.formInline["createdTime"];
          delete this.formInline["updatedTime"];
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
          ApiUser.apiUpdateManager(this.formInline, "updateManager").then(response => {
              if (response.code == "200") {
                this.$message.success("编辑账号成功");
                this.dialogEditFormVisible = false;
                this.init();
                this.$refs[formName].resetFields();
                this.formInline = JSON.parse(
                  JSON.stringify(this.formInlineReset)
                );
              } else {
                this.$message.error(response.message);
              }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
