<template>
    <div class="app-container dialogBox">
        <el-dialog title="新建商户" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false" class="product-dialog">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                <el-form-item label="商户号：" prop="companyNo">
                        <el-input v-model="formInline.companyNo" placeholder="唯一性"></el-input>
                    </el-form-item>
                    <el-form-item label="商户名称：" prop="companyName">
                        <el-input v-model="formInline.companyName" placeholder="唯一性"></el-input>
                    </el-form-item>
                    <el-form-item label="商户地址：">
                        <el-input v-model="formInline.address" placeholder="请填写"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：">
                        <el-input v-model="formInline.contacts" placeholder="请填写"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式：">
                        <el-input v-model="formInline.phone" placeholder="请填写"></el-input>
                    </el-form-item>
                    <el-form-item label="商户描述：">
                        <el-input type="textarea" v-model="formInline.remark" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetSearchForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑商户" :visible.sync="editDialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false" class="product-dialog">
            <div style="text-align:center">
                <el-form :model="editForm" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                 <el-form-item label="商户号：" prop="companyNo">
                        <!-- <el-input v-model="editForm.companyNo" placeholder="唯一性" ></el-input> -->
                        <span>{{editForm.companyNo}}</span>
                    </el-form-item>
                    <el-form-item label="商户名称：" prop="companyName">
                        <el-input v-model="editForm.companyName" placeholder="唯一性"></el-input>
                    </el-form-item>
                    <el-form-item label="商户地址：" prop="address">
                        <el-input v-model="editForm.address" placeholder="请填写"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="contacts">
                        <el-input v-model="editForm.contacts" placeholder="请填写"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式：">
                        <el-input v-model="editForm.phone" placeholder="请填写"></el-input>
                    </el-form-item>
                    <el-form-item label="商户描述：">
                        <el-input type="textarea" v-model="editForm.remark" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="editData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="查看商户详情" :visible.sync="detailDialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false" class="product-dialog">
            <div style="text-align:center">
                <el-form :model="detailForm" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                 <el-form-item label="商户号：" prop="companyNo">
                        <!-- <el-input v-model="detailForm.companyNo" placeholder="唯一性" :disabled="true"></el-input> -->
                        <span>{{detailForm.companyNo}}</span>
                    </el-form-item>
                    <el-form-item label="商户名称：" prop="companyName">
                        <!-- <el-input v-model="detailForm.companyName" placeholder="唯一性" :disabled="true"></el-input> -->
                        <span>{{detailForm.companyName}}</span>
                    </el-form-item>
                    <el-form-item label="商户地址：" prop="address">
                        <!-- <el-input v-model="detailForm.address" placeholder="请填写" :disabled="true"></el-input> -->
                        <span>{{detailForm.address}}</span>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="contacts">
                        <!-- <el-input v-model="detailForm.contacts" placeholder="请填写" :disabled="true"></el-input> -->
                        <span>{{detailForm.contacts}}</span>
                    </el-form-item>
                    <el-form-item label="联系方式：">
                        <!-- <el-input v-model="detailForm.phone" placeholder="请填写" :disabled="true"></el-input> -->
                        <span>{{detailForm.phone}}</span>
                    </el-form-item>
                    <el-form-item label="商户描述：">
                        <!-- <el-input type="textarea" v-model="detailForm.remark" maxlength="100" :disabled="true"></el-input> -->
                        <span>{{detailForm.remark}}</span>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="detailDialogFormVisible=false">关闭</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <div class="merchant">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchForm">
                <el-form-item label="商户名称：">
                    <el-input v-model="searchForm.companyName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item class="search">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="productList">
            <div class="addProduct">
                <button @click="dialogFormVisible = true">+ 新增商户</button>
            </div>
            <div v-for="(item,i) in productList.list" :key="i" class="product">
                <div class="container">
                    <div class="img">
                        <img src="../../../assets/404_images/producticon.png" alt="">
                    </div>
                    <div class="msg">
                        <h4>{{item.companyName}}</h4>
                        <p>{{item.companyNo}}</p>
                        <p class="span">{{item.remark}}</p>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="text" @click="editProduct(item)">编辑</el-button>
                    <el-button type="text" @click="detail(item)">详情</el-button>
                </div>
            </div>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="productList.currentPage" :page-sizes="[100, 200, 300]" :page-size="productList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="productList.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import ApiCompany from "@/api/company";
import ApiProduct from "@/api/product";
import ApiUser from "@/api/user";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value) {
        if (/^[\u4e00-\u9fa5]+$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的姓名"));
        }
      }
    };
    return {
      dialogFormVisible: false,
      editDialogFormVisible: false,
      detailDialogFormVisible: false,
      searchForm: {
        currentPage: 1,
        pageSize: 100
      },
      editForm: {},
      detailForm: {},
      searchFormReset: {
        currentPage: 1,
        pageSize: 100
      },
      companyList: [],
      productList: [],
      formInline: {},
      formInlineReset: {},
      rules: {
        companyNo: [
          {
            required: true,
            message: "请填写商户号",
            trigger: "blur"
          }
        ],
        companyName: [
          {
            required: true,
            message: "请填写商户名称",
            trigger: "blur"
          }
          // {
          //     validator: validateAccount,
          //     trigger: 'blur'
          // }
        ]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    //获取商户列表
    init() {
      ApiCompany.apiQueryPageCompany("queryPageCompany", this.searchForm).then(
        res => {
          this.productList = res.data;
        }
      );
    },
    //查询
    onSubmit() {
      this.searchForm.currentPage=1
      this.init();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchForm = JSON.parse(JSON.stringify(this.searchFormReset));
      this.init()
    },
    //新增
    postData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ApiCompany.apiAddCompany(this.formInline, "addCompany").then(res => {
            this.dialogFormVisible = false;
            this.init();
            this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑
    editProduct(item) {
      this.editDialogFormVisible = true;
      ApiCompany.apiQueryOneCompany('queryOneCompany',item.id).then(res=>{
          this.editForm = res.data;
      })
    },
    resetEidtForm(formName) {
      this.editDialogFormVisible = false;
      this.$refs[formName].resetFields();
      this.editForm = JSON.parse(JSON.stringify(this.editForm));
    },
    editData(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          ApiCompany.apiUpdateCompany(this.editForm, "updateCompany").then(
            res => {
              this.editDialogFormVisible = false;
              this.init();
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查看详情
    detail(item) {
      this.detailDialogFormVisible = true;
       ApiCompany.apiQueryOneCompany('queryOneCompany',item.id).then(res=>{
          this.detailForm = res.data;
      })
    },
    //改变每页数据数量
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.init();
    },
    //改变当前页码
    handleCurrentChange(val) {
      this.searchForm.currentPage = val;
      this.init();
    },
     resetSearchForm(formName) {
      this.dialogFormVisible=false;
      this.$refs[formName].resetFields();
      this.formInline = JSON.parse(JSON.stringify(this.formInline));
    },
  }
};
</script>

<style lang="scss">
div,
p,
h4,
img,
button {
  margin: 0;
  padding: 0;
}
.dialogBox {
  background: #f0f2f5;
  .el-dialog {
    min-width: 500px;
    .el-dialog__header {
      font-weight: 700;
    }
  }
}
.app-container {
  .product-dialog {
    .el-dialog {
      height: 80%;
      overflow: scroll;
    }
  }
}
.merchant {
  background: #fff;
  border-radius: 5px;
  padding: 20px 40px;
  margin-bottom: 30px;
  .line {
    width: 100%;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
  }
  .search {
    margin-left: 80px;
  }
}
.productList > div {
  float: left;
  margin-right: 30px;
}
.productList {
  overflow: hidden;
  *zoom: 1;
  .block {
    width: 100%;
    .el-pagination {
      text-align: center;
    }
  }
  .addProduct {
    background: #fff;
    width: 380px;
    height: 190px;
    margin-bottom: 45px;
    button {
      border: none;
      background: transparent;
      width: 100%;
      height: 100%;
      border: 1px dashed #ccc;
      color: #aaa;
      font-size: 14px;
    }
  }
  .product {
    background: #fff;
    box-shadow: 0px 0px 15px #ccc;
    border-radius: 3px;
    width: 380px;
    height: 190px;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;
    .container {
      display: flex;
      flex: 1;
      width: 100%;
      .img {
        text-align: center;
        width: 100px;
        span {
          color: red;
          background: #fef0f0;
          border: 1px solid #fbc4c4;
          font-size: 12px;
          padding: 5px 8px;
          border-radius: 3px;
        }
        img {
          display: block;
          width: 50px;
          margin: 0 auto;
          margin-bottom: 8px;
        }
      }
      .msg {
        width: 300px;
        flex-wrap: wrap;
        padding-right: 20px;
        p {
          color: #888;
          font-weight: 700;
          font-size: 16px;
          margin-top: 5px;
        }
        .span {
          font-size: 16px;
          margin-top: 10px;
          color: #8d8d8d;
          font-weight: 400;
          line-height: 25px;
          word-break: break-all;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .btn {
      width: 100%;
      border-top: 1px solid #eee;
      background: #f7f9fa;
      button {
        width: 49%;
        text-align: center;
        margin: 0;
        color: #8d8f8f;
      }
      button:first-child {
        border-right: 1px solid #eee;
      }
    }
  }
}
</style>

