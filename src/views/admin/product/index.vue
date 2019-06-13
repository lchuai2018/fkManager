<template>
    <div class="app-container dialogBox">
        <el-dialog title="新建产品" :visible.sync="dialogFormVisible" width="50%" :show-close="false" :close-on-click-modal="false" class="product-dialog">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left" label-position="left">
                    <el-form-item label="产品编号：" prop="productNo">
                        <el-input v-model="formInline.productNo" placeholder="唯一性"></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称：" prop="productName">
                        <el-input v-model="formInline.productName" placeholder="可相同"></el-input>
                    </el-form-item>
                     <el-form-item label="密钥：" prop="secretKey">
                        <el-input v-model="formInline.secretKey" placeholder="请输入符号、字母、数字组合,且长度大于10"></el-input>
                    </el-form-item>
                    <el-form-item label="所属商户：" prop="companyNo">
                        <el-select v-model="formInline.companyNo" placeholder="请选择" style="width:100%;">
                            <el-option v-for="(item,i) in companyList" :label="item.value" :value="item.key" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="回调地址：">
                        <el-input v-model="formInline.callbackUrl" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="结果地址：">
                        <el-input v-model="formInline.orderStatusUrl" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="产品描述：">
                        <el-input type="textarea" v-model="formInline.description" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-radio-group v-model="formInline.status" size="medium">
                            <el-radio-button label="0">启用</el-radio-button>
                            <el-radio-button label="1">禁用</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetSearchForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑产品" :visible.sync="editDialogFormVisible" width="50%" :show-close="false" :close-on-click-modal="false" class="product-dialog">
            <div style="text-align:center">
                <el-form :model="editForm" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left" label-position="left">
                    <el-form-item label="产品编号：" prop="productNo">
                        <!-- <el-input v-model="editForm.productNo" placeholder="唯一性" :disabled="true"></el-input> -->
                        <span>{{editForm.productNo}}</span>
                    </el-form-item>
                    <el-form-item label="产品名称：" prop="productName">
                        <el-input v-model="editForm.productName" placeholder="可相同"></el-input>
                    </el-form-item>
                     <el-form-item label="密钥：" prop="secretKey">
                        <el-input v-model="editForm.secretKey" placeholder="请输入符号、字母、数字组合,且长度大于10"></el-input>
                    </el-form-item>
                    <el-form-item label="所属商户：" prop="companyNo">
                        <el-select v-model="editForm.companyNo" placeholder="请选择" style="width:100%;">
                            <el-option v-for="(item,i) in companyList" :label="item.value" :value="item.key" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="回调地址：">
                        <el-input v-model="editForm.callbackUrl" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="结果地址：">
                        <el-input v-model="editForm.orderStatusUrl" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="产品描述：">
                        <el-input type="textarea" v-model="editForm.description" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-radio-group v-model="editForm.status" size="medium">
                            <el-radio-button label="0">启用</el-radio-button>
                            <el-radio-button label="1">禁用</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="editData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="查看产品详情" :visible.sync="detailDialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false" class="product-dialog">
            <div style="text-align:center">
                <el-form :model="detailForm" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left" label-position="left">
                    <el-form-item label="产品编号：" prop="productNo">
                        <!-- <el-input v-model="detailForm.productNo" placeholder="唯一性"  :disabled="true"></el-input> -->
                        <span>{{detailForm.productNo}}</span>
                    </el-form-item>
                    <el-form-item label="产品名称：" prop="productName">
                        <!-- <el-input v-model="detailForm.productName" placeholder="可相同"  :disabled="true"></el-input> -->
                        <span>{{detailForm.productName}}</span>
                    </el-form-item>
                     <el-form-item label="密钥：" prop="secretKey">
                        <!-- <el-input v-model="detailForm.secretKey" placeholder="请输入符号、字母、数字组合,且长度大于10" :disabled="true"></el-input> -->
                        <span>{{detailForm.secretKey}}</span>
                    </el-form-item>
                    <el-form-item label="所属商户：" prop="companyNo">
                        <el-select v-model="detailForm.companyNo" placeholder="请选择" style="width:100%;"  :disabled="true">
                            <el-option v-for="(item,i) in companyList" :label="item.value" :value="item.key" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="回调地址：">
                        <!-- <el-input v-model="detailForm.callbackUrl" placeholder="请输入"  :disabled="true"></el-input> -->
                        <span>{{detailForm.callbackUrl}}</span>
                    </el-form-item>
                    <el-form-item label="结果地址：">
                        <!-- <el-input v-model="detailForm.orderStatusUrl" placeholder="请输入"  :disabled="true"></el-input> -->
                        <span>{{detailForm.orderStatusUrl}}</span>
                    </el-form-item>
                    <el-form-item label="产品描述：">
                        <!-- <el-input type="textarea" v-model="detailForm.description" maxlength="100"  :disabled="true"></el-input> -->
                        <span>{{detailForm.description}}</span>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-radio-group v-model="detailForm.status" size="medium" :disabled="true">
                            <el-radio-button label="0">启用</el-radio-button>
                            <el-radio-button label="1">禁用</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="detailDialogFormVisible=false">关闭</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <div class="merchant">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchForm">
                <el-form-item label="所属商户：" class="line">
                    <el-radio-group v-model="searchForm.companyNo" @change="onSubmit">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button v-for="(item,i) in companyList" :label="item.key" :key="i">{{item.value}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="产品名称：">
                    <el-input v-model="searchForm.productName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="产品状态：">
                    <el-select v-model="searchForm.status" placeholder="请选择" style="width:100%;">
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="productList">
            <div class="addProduct">
                <button @click="dialogFormVisible = true">+ 新增产品</button>
            </div>
            <div v-for="(item,i) in productList.list" :key="i" class="product">
                <div class="container">
                    <div class="img">
                        <img src="../../../assets/404_images/producticon.png" alt="">
                        <span v-if="item.status==1">禁用</span>
                    </div>
                    <div class="msg">
                        <h4>{{item.productName}}</h4>
                        <p>{{item.productNo}}</p>
                        <p>{{item.companyName}}</p>
                        <p class="span">{{item.description}}</p>
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
      formInline: {
        status: "0"
      },
      formInlineReset: {
        status: "0"
      },
      rules: {
        productNo: [
          {
            required: true,
            message: "请填写产品码",
            trigger: "blur"
          }
        ],
        productName: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur"
          }
        ],
        companyNo: [
          {
            required: true,
            message: "请选择所属商户",
            trigger: "blur"
          }
        ],
        secretKey: [
          {
            required: true,
            min: 10,
            message: "请输入密钥",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.selectAllProduct();
    this.init();
  },
  methods: {
    //获取产品列表
    init() {
      ApiProduct.apiSelectProductByCompanyNo(
        "selectProductByCompanyNo",
        this.searchForm
      ).then(res => {
        this.productList = res.data;
      });
    },
    //获取商户列表
    selectAllProduct() {
      ApiCompany.apiTreeList("tree_list").then(res => {
        this.companyList = res.data;
      });
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
          ApiProduct.apiproductPost(this.formInline).then(res => {
            this.$message.success("新增产品成功");
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
      ApiProduct.apiproductGet(item.id).then(res=>{
          this.editForm = res.data
      })
    },
    resetEidtForm(formName) {
      this.editDialogFormVisible=false;
      this.$refs[formName].resetFields();
      this.editForm = JSON.parse(JSON.stringify(this.editForm));
    },
    editData(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          ApiProduct.apiproductPut(this.editForm).then(res => {
            this.$message.success("编辑产品成功");
            this.editDialogFormVisible = false;
            this.init();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查看详情
    detail(item) {
      this.detailDialogFormVisible = true;
      ApiProduct.apiproductGet(item.id).then(res=>{
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
    .el-radio-button__inner {
      border: none;
      // margin-right: 20px;
      border-radius: 4px;
    }
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

