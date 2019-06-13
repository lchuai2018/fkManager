<template>
    <div class="app-container">
        <el-dialog title="新建模型" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="所属产品：" prop="productNo">
                       <el-select v-model="formInline.productNo" placeholder="请选择">
                            <el-option v-for="(item, index) in productList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模型编号：" prop="modelNo">
                        <el-select v-model="formInline.modelNo" placeholder="请选择" @change="selectType(formInline.modelNo)">
                            <el-option v-for="(item, index) in modelNo" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变量编号：" prop="propertyNo">
                       <el-select v-model="formInline.propertyNo" placeholder="请选择" @change="selectRuleNo(formInline.propertyNo)">
                            <el-option v-for="(item, index) in propertyList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模型版本号:" prop="version">
                        <span>{{formInline.version}}</span>
                    </el-form-item>
                    <el-form-item label="变量名称：">
                        <span>{{formInline.propertyName}}</span>
                    </el-form-item>
                    <el-form-item label="变量描述：">
                        <span>{{formInline.propertyDesc}}</span>
                    </el-form-item>
                    <el-form-item label="变量：" prop="property">
                       <el-input type="textarea" v-model="formInline.property"></el-input>
                    </el-form-item>
                   <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" clearable placeholder="请输入">
                            <el-option label="禁用" value="2"></el-option>
                            <el-option label="启用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表达式：" prop="formula">
                        <el-input type="textarea" v-model="formInline.formula"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="策略描述：">
                        <el-input type="textarea" v-model="formInline.ruleDesc" maxlength="100"></el-input>
                    </el-form-item> -->
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑模型" :visible.sync="dialogEditFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="所属产品：" prop="productNo">
                       <el-select v-model="formInline.productNo" disabled placeholder="请选择">
                            <el-option v-for="(item, index) in productList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模型编号：" prop="modelNo">
                        <el-select v-model="formInline.modelNo" disabled placeholder="请选择" @change="selectType(formInline.modelNo)">
                            <el-option v-for="(item, index) in modelNo" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变量编号：" prop="propertyNo">
                       <el-select v-model="formInline.propertyNo" disabled placeholder="请选择" @change="selectRuleNo(formInline.propertyNo)">
                            <el-option v-for="(item, index) in propertyList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模型版本号:" prop="version">
                        <span>{{formInline.version}}</span>
                    </el-form-item>
                    <el-form-item label="变量名称：">
                        <span>{{formInline.propertyName}}</span>
                    </el-form-item>
                    <el-form-item label="变量描述：">
                        <span>{{formInline.propertyDesc}}</span>
                    </el-form-item>
                    <el-form-item label="变量：" prop="property">
                       <el-input type="textarea" v-model="formInline.property"></el-input>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" clearable placeholder="请输入">
                            <el-option label="禁用" value="2"></el-option>
                            <el-option label="启用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表达式：" prop="formula">
                        <el-input type="textarea" v-model="formInline.formula"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postEditData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        
        <div class="searchRule">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="所属产品：" class="line">
                    <el-radio-group v-model="search.productNo" @change="onSubmit">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button v-for="(item,i) in productList" :label="item.key" :key="i">{{item.value}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="模型编号:">
                    <el-input v-model="search.modelNo" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="变量编号:">
                    <el-input v-model="search.propertyNo" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="search.status" placeholder="请选择">
                        <el-option label="禁用" value="2"></el-option>
                        <el-option label="启用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="clear">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <!-- <el-button @click="exportData">导出</el-button> -->
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id" width="50"></el-table-column>
            <el-table-column prop="version" label="模型版本号" width="100"></el-table-column>
            <el-table-column prop="modelNo" label="模型编号" width="130"></el-table-column>
            <el-table-column prop="propertyNo" label="变量编号" width="80"></el-table-column>
            <el-table-column prop="propertyName" label="变量名称" width="400"></el-table-column>
            <el-table-column prop="formula" label="表达式" width="550"></el-table-column>
            <!-- <el-table-column prop="ruleType" label="策略类型" width="90">
                <template slot-scope="scope">
                    {{scope.row.ruleType==1?"简单字段":"计算字段"}}
                </template>
            </el-table-column> -->
            <!-- <el-table-column prop="formula" label="策略公式" width="400"></el-table-column> -->
            <el-table-column prop="productNo" label="应用产品" width="150"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status=='2'" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.status=='1'?"启用":"禁用"}}
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
                    <el-button v-if="scope.row.status==2" type="text" size="small" @click="start(scope.row)">启用</el-button>
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
    import ApiProductModel from '@/api/product-model'
    import ApiProduct from '@/api/product'
    import {openUrl} from '@/utils/index'
    export default {
        data() {
            // var validateAccount = (rule, value, callback) => {
            //     if ( value ) {
            //         if((/^[\da-zA-Z._]+$/.test(value))){3
            //             ApiUser.apiCheckAccount('check_account',value).then(res => {})
            //             callback();
            //         }else{
            //             callback(new Error('请输入正确的账号格式'));
            //         }
            //     }
            // };
            // var validateName = (rule, value, callback) => {
            //     if ( value ){
            //         if((/^[\u4e00-\u9fa5]+$/.test(value))){
            //             callback();
            //         }else{
            //             callback(new Error('请输入正确的姓名'));
            //         }
            //     }
            // };
            return {
                formInline:{
                    propertyNo:"",
                    version:"",
                    propertyName:"",
                    propertyDesc:"",
                    property:"",
                    formula:"",
                    status:"1"
                },
                formInlineReset:{
                    propertyNo:"",
                    version:"",
                    propertyName:"",
                    propertyDesc:"",
                    property:"",
                    formula:"",
                    status:"1"
                },
                rules:{
                    productNo:[
                        { required: true, message: '请选择所属产品', trigger: 'change' },
                    ],
                    modelNo:[
                        { required: true, message: '请选择模型编号', trigger: 'change' },
                    ],
                    propertyNo:[
                        { required: true, message: '请选择变量编号', trigger: 'change' },
                    ],
                    property:[
                        { required: true, message: '请输入变量', trigger: 'blur' },
                    ],
                    formula:[
                        { required: true, message: '请输入表达式', trigger: 'blur' },
                    ],
                    status:[
                        { required: true, message: '请选择状态', trigger: 'change' },
                    ]
                },
                tableData:[],
                search:{
                    currentPage:1,
                    pageSize:10
                },
                searchReset:{
                    currentPage:1,
                    pageSize:10
                },
                productList:[],
                modelNo:[],
                propertyList:[],
                dialogFormVisible:false,
                dialogEditFormVisible:false
            }
        },
        created() {
            this.init();
            ApiProduct.apiTreeList('tree_list',this.search).then(res => {
                this.productList = res.data;
            })
            ApiProductModel.apiModelNoTreeList('model_no/tree_list').then(res => {
                this.modelNo = res.data;
            })
        },
        methods: {
            //获取策略列表
            init(){
                ApiProductModel.apiQueryProductModel('queryProductModel',this.search).then(res => {
                    this.tableData = res.data;
                })
            },
            //改变每页数据数量
            handleSizeChange(val) {
                this.search.pageSize = val;
                this.init()
            },
            //改变当前页码
            handleCurrentChange(val) {
                this.search.currentPage = val;
                this.init()
            },
            //查询
            onSubmit() {
                this.search.currentPage=1
                this.init()
            },
            //重置表单
            clear() {
                this.search = JSON.parse(JSON.stringify(this.searchReset))
                this.init()
            },
            //导出
            exportData(){
                console.log(this.search);
                // return false
                openUrl('product_model/exportModelExcel',this.search)
                
                // window.open('http://139.224.239.194:8084/user/exportAllManagers?currentPage=1&pageSize=10')
                // ApiUser.apiExportAllManagers('exportAllManagers',this.search).then(res => {
                    
                // })
            },
            //新增选择策略类型
            selectType(riskRuleType){
                // this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
                // this.$set(this.formInline.ruleNo,this.formInline.ruleNo,'')
                this.formInline.version = "";
                this.formInline.propertyName = "";
                this.formInline.propertyDesc = "";
                this.formInline.propertyNo = "";
                this.formInline.property = "";
                this.formInline.formula = "";
                ApiProductModel.apiPropertyNoTreeList('property_no/tree_list',riskRuleType).then(res => {
                    this.propertyList = res.data;
                })
            },
            //新增选择策略码
            selectRuleNo(id){
                ApiProductModel.apiSelectOneRiskModel('selectOneRiskModel',id).then(res => {
                    this.formInline.version = res.data.version;
                    this.formInline.propertyName = res.data.propertyName;
                    this.formInline.propertyDesc = res.data.propertyDesc;
                    this.formInline.property = res.data.property;
                    this.formInline.formula = res.data.formula;
                })
            },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiProductModel.apiAddProductModel(this.formInline, 'addProductModel').then(response => {
                            if(response.code == '200'){
                                this.$message.success('新增模型成功')
                                this.init()
                                this.$refs[formName].resetFields()
                                this.dialogFormVisible = false
                                this.formInline = JSON.parse(JSON.stringify(this.formInlineReset))
                            }else{
                                this.$message.error(response.message)
                            }
                        }).then()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
            },
            editList(row){
                ApiProductModel.apiInfo('info',row.id).then(response => {
                    this.formInline = response.data;
                    // this.formInline.riskRuleType = this.search.riskRuleType;
                    // delete this.formInline["createTime"];
                    // delete this.formInline["updateTime"];
                    this.formInline.status = String(this.formInline.status)
                    // this.formInline.decisionType = String(this.formInline.decisionType==undefined?'':this.formInline.decisionType)
                    // this.formInline.ruleType = String(this.formInline.ruleType)
                    this.dialogEditFormVisible = true;
                }).then()
            },
            resetEidtForm(formName){
                this.dialogEditFormVisible = false;
                this.$refs[formName].resetFields();
                this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
            },
            postEditData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiProductModel.apiUpdateProductModel(this.formInline,'updateProductModel').then(response => {
                            if(response.code == '200'){
                                this.$message.success('编辑模型成功')
                                this.init()
                                this.$refs[formName].resetFields()
                                this.dialogEditFormVisible = false
                                this.formInline = JSON.parse(JSON.stringify(this.formInlineReset))
                            }else{
                                this.$message.error(response.message)
                            }
                        }).then()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            forbid(row){
                var obj={
                    id:row.id,
                    status:2,
                }
                ApiProductModel.apiUpdateStatus(obj,'update_status').then(response => {
                    if(response.code == '200'){
                        this.$message.success('操作成功')
                        this.init()
                    }else{
                        this.$message.error(response.message)
                    }
                }).then()
            },
            start(row){
                var obj={
                    id:row.id,
                    status:1,
                }
                ApiProductModel.apiUpdateStatus(obj,'update_status').then(response => {
                    if(response.code == '200'){
                        this.$message.success('操作成功')
                        this.init()
                    }else{
                        this.$message.error(response.message)
                    }
                }).then()
            }
        }
    }
</script>
<style lang="scss">
.searchRule {
    background: #fff;
    border-radius: 5px;
    .line {
        width: 100%;
        border-bottom: 1px dashed #ccc;
        padding-bottom: 20px;
        .el-radio-button__inner{
            border:none;
            // margin-right:20px;
            // padding:8px 10px;
            border-radius:4px;
        }
    }
    .search {
        margin-left: 80px;
    }
}
.alert{
    height: 40px;
    margin-top:20px;
    line-height: 40px;
    padding-left:10px;
    font-size:14px;
    i{
        color:#2491fc;
    }
    .msg_color{
        color:#2491FC;
    }
}
</style>
