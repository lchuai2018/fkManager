<template>
    <div class="app-container">
        <el-dialog title="新建策略" :visible.sync="dialogFormVisible" width="45%" top="3vh" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="130px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="所属产品：" prop="productNo">
                       <el-select v-model="formInline.productNo" placeholder="请选择">
                            <el-option v-for="(item, index) in productList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略类型:" prop="ruleCategory">
                        <el-select v-model="formInline.ruleCategory" placeholder="请选择">
                            <el-option v-for="(item, index) in ruleList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略码：" prop="ruleNo">
                        <el-input v-model="formInline.ruleNo" placeholder="请输入"></el-input>
                       <!-- <el-select v-model="formInline.ruleNo" placeholder="请选择">
                            <el-option v-for="(item, index) in ruleList" :key="index" :label="item.ruleNo" :value="item.ruleNo"></el-option>
                        </el-select> -->
                    </el-form-item>
                    <!-- <el-form-item label="规则层级：" prop="ruleRank" v-if="formInline.ruleCategory==2||formInline.ruleCategory==3">
                        <el-select v-model="formInline.ruleRank" placeholder="请选择">
                            <el-option label="中间规则" value="0"></el-option>
                            <el-option label="终极规则" value="1"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="策略名称：" prop="ruleName">
                        <el-input v-model="formInline.ruleName" placeholder="请输入"></el-input>
                        <!-- <span>{{formInline.ruleName}}</span> -->
                    </el-form-item>
                    <!-- <el-form-item label="字段类型：">
                        <el-select v-model="formInline.fieldType" disabled placeholder="请选择">
                            <el-option label="简单字段" value="1"></el-option>
                            <el-option label="计算字段" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="拒件码：" >
                        <el-input v-model="formInline.refuseCode" placeholder="请输入"></el-input>
                        <!-- <span>{{formInline.refuseCode}}</span> -->
                    </el-form-item>
                    <el-form-item label="规则版本:" prop="ruleVersion">
                        <el-input v-model="formInline.ruleVersion" placeholder="请输入"></el-input>
                        <!-- <el-select v-model="formInline.ruleVersion" placeholder="请选择">
                            <el-option label="决策集1" value="1"></el-option>
                            <el-option label="决策集2" value="2"></el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item label="属性：" prop="property">
                       <el-input type="textarea" v-model="formInline.property"></el-input>
                    </el-form-item>
                   <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" placeholder="请输入">
                            <el-option label="禁用" value="2"></el-option>
                            <el-option label="启用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略公式：" prop="formula">
                        <el-input type="textarea" v-model="formInline.formula"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：" prop="remark">
                        <el-input v-model="formInline.remark" placeholder="请输入"></el-input>
                        <!-- <span>{{formInline.ruleDesc}}</span> -->
                    </el-form-item>
                    <el-form-item label="随机数区间：">
                       <el-input type="text" v-model="formInline.randomStart" style="width:45%" placeholder="请输入数字" @blur.prevent="check(formInline.randomStart)"></el-input>
                       <span> -- </span>
                       <el-input type="text" v-model="formInline.randomEnd" style="width:45%" placeholder="请输入数字" @blur.prevent="check(formInline.randomEnd)"></el-input>
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
        <el-dialog title="编辑策略" :visible.sync="dialogEditFormVisible" width="45%" top="3vh" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="130px" style="width:70%;display:inline-block;text-align:left">
                   <el-form-item label="所属产品：" prop="productNo">
                       <el-select v-model="formInline.productNo" disabled placeholder="请选择">
                            <el-option v-for="(item, index) in productList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略类型:" prop="ruleCategory">
                        <el-select v-model="formInline.ruleCategory" disabled placeholder="请选择" @change="selectType(formInline.ruleCategory)">
                            <el-option label="产品策略" value="0"></el-option>
                            <el-option label="老用户策略" value="1"></el-option>
                            <el-option label="提额策略" value="2"></el-option>
                            <el-option label="降额策略" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="规则层级：" prop="ruleRank" v-if="formInline.ruleCategory==2||formInline.ruleCategory==3">
                        <el-select v-model="formInline.ruleRank" placeholder="请选择">
                            <el-option label="中间规则" value="0"></el-option>
                            <el-option label="终极规则" value="1"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="策略码：" prop="ruleNo">
                        <el-input v-model="formInline.ruleNo" placeholder="请输入"></el-input>
                       <!-- <el-select v-model="formInline.ruleNo" disabled placeholder="请选择" @change="selectRuleNo(formInline.ruleNo,formInline.ruleCategory)">
                            <el-option v-for="(item, index) in ruleList" :key="index" :label="item.ruleNo" :value="item.ruleNo"></el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item label="策略名称：" prop="ruleName">
                        <el-input v-model="formInline.ruleName" placeholder="请输入"></el-input>
                        <!-- <span>{{formInline.ruleName}}</span> -->
                    </el-form-item>
                    <!-- <el-form-item label="字段类型：">
                        <el-select v-model="formInline.ruleType" disabled placeholder="请选择">
                            <el-option label="简单字段" value="1"></el-option>
                            <el-option label="计算字段" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="拒件码：" >
                        <el-input v-model="formInline.refuseCode" placeholder="请输入"></el-input>
                        <!-- <span>{{formInline.refuseCode}}</span> -->
                    </el-form-item>
                    <el-form-item label="规则版本:" prop="ruleVersion">
                        <el-input v-model="formInline.ruleVersion" placeholder="请输入"></el-input>
                        <!-- <el-select v-model="formInline.ruleVersion" placeholder="请选择">
                            <el-option label="决策集1" value="1"></el-option>
                            <el-option label="决策集2" value="2"></el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item label="属性：" prop="property">
                       <el-input type="textarea" v-model="formInline.property"></el-input>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" clearable placeholder="请输入">
                            <el-option label="禁用" value="2"></el-option>
                            <el-option label="启用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略公式：" prop="formula">
                        <el-input type="textarea" v-model="formInline.formula"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：" prop="remark">
                        <el-input v-model="formInline.remark" placeholder="请输入"></el-input>
                        <!-- <span>{{formInline.ruleDesc}}</span> -->
                    </el-form-item>
                    <el-form-item label="随机数区间：">
                       <el-input type="text" v-model="formInline.randomStart" style="width:45%" placeholder="请输入数字" @blur.prevent="check(formInline.randomStart)"></el-input>
                       <span> -- </span>
                       <el-input type="text" v-model="formInline.randomEnd" style="width:45%" placeholder="请输入数字" @blur.prevent="check(formInline.randomEnd)"></el-input>
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
                <el-form-item label="策略码:">
                    <el-input v-model="search.ruleNo" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="拒件码:">
                    <el-input v-model="search.refuseCode" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="策略名称:">
                    <el-input v-model="search.ruleName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="策略类型:">
                    <el-select v-model="search.ruleCategory" placeholder="请选择">
                        <el-option v-for="(item, index) in ruleList" :key="index" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规则版本:">
                    <el-input v-model="search.ruleVersion" placeholder="请输入"></el-input>
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
            <el-table-column prop="ruleNo" label="策略码" width="70"></el-table-column>
            <el-table-column prop="ruleName" label="策略名称" width="340"></el-table-column>
            <el-table-column prop="productName" label="产品名称" width="80"></el-table-column>
            <!-- <el-table-column prop="ruleType" label="策略类型" width="90">
                <template slot-scope="scope">
                    {{scope.row.ruleType==1?"简单字段":"计算字段"}}
                </template>
            </el-table-column> -->
            <el-table-column prop="ruleVersion" label="规则版本" align="center"></el-table-column>
            <el-table-column prop="formula" label="策略公式" width="300"></el-table-column>
            <el-table-column prop="status" label="状态" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.status==2" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.status==1?"启用":"禁用"}}
                </template>
            </el-table-column>
            <el-table-column prop="refuseCode" label="拒件码" width="80"></el-table-column>
            <el-table-column prop="randomStart" label="随机数开始值" align="center">
                <template slot-scope="scope">
                    {{scope.row.randomStart!=null?scope.row.randomStart:"--"}}
                </template>
            </el-table-column>
            <el-table-column prop="randomEnd" label="随机数结束值" align="center">
                <template slot-scope="scope">
                    {{scope.row.randomEnd!=null?scope.row.randomEnd:"--"}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="status" label="应用产品"></el-table-column> -->
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
            :page-sizes="[100, 200, 300]"
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import ApiProductRule from '@/api/product-rule'
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
                    ruleCategory:"",
                    ruleNo:"",
                    ruleName:"",
                    ruleDesc:"",
                    refuseCode:"",
                    property:"",
                    formula:"",
                    ruleVersion:"",
                    ruleRank:"",
                    status:"1",
                },
                formInlineReset:{
                    ruleCategory:"",
                    ruleNo:"",
                    ruleName:"",
                    ruleDesc:"",
                    refuseCode:"",
                    property:"",
                    formula:"",
                    ruleVersion:"",
                    ruleRank:"",
                    status:"1",
                },
                rules:{
                    ruleCategory:[
                        { required: true, message: '请选择策略类型', trigger: 'change' },
                    ],
                    ruleNo:[
                        { required: true, message: '请选择策略码', trigger: 'change' },
                    ],
                    productNo:[
                        { required: true, message: '请选择所属产品', trigger: 'change' },
                    ],
                    ruleName:[
                        { required: true, message: '请输入策略名称', trigger: 'blur' },
                    ],
                    refuseCode:[
                        { required: true, message: '请输入拒件码', trigger: 'blur' },
                    ],
                    // ruleRank:[
                    //     { required: true, message: '请选择规则层级', trigger: 'change' },
                    // ],
                    ruleVersion:[
                        { required: true, message: '请选择所属决策集类型', trigger: 'change' },
                    ],
                    property:[
                        { required: true, message: '请输入属性', trigger: 'blur' },
                    ],
                    formula:[
                        { required: true, message: '请输入策略公式', trigger: 'blur' },
                    ],
                    status:[
                        { required: true, message: '请选择状态', trigger: 'change' },
                    ]
                },
                tableData:[],
                search:{
                    currentPage:1,
                    pageSize:100,
                    ruleCategory:"0"
                },
                searchReset:{
                    currentPage:1,
                    pageSize:100,
                    ruleCategory:"0"
                },
                productList:[],
                ruleList:[],
                dialogFormVisible:false,
                dialogEditFormVisible:false
            }
        },
        created() {
            // this.selectAllRole()
            this.init();
            ApiProduct.apiTreeList('tree_list',this.search).then(res => {
                this.productList = res.data;
            })
            ApiProductRule.apiRuleCategoryList('list').then(res => {
                this.ruleList = res.data;
            })
        },
        methods: {
            //获取策略列表
            init(){
                ApiProductRule.apiQueryRuleByParams('queryRuleByParams',this.search).then(res => {
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
                openUrl('product_rule/exportModelExcel',this.search)
                
                // window.open('http://139.224.239.194:8084/user/exportAllManagers?currentPage=1&pageSize=10')
                // ApiUser.apiExportAllManagers('exportAllManagers',this.search).then(res => {
                    
                // })
            },
            //新增选择策略类型
            // selectType(ruleCategory){
            //     // this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
            //     // this.$set(this.formInline.ruleNo,this.formInline.ruleNo,'')
            //     this.formInline.ruleNo = "";
            //     this.formInline.ruleName = "";
            //     this.formInline.ruleDesc = "";
            //     this.formInline.refuseCode = "";
            //     this.formInline.ruleVersion = "";
            //     this.formInline.ruleRank = "";
            //     ApiProductRule.apiRuleCategory('rule_category',ruleCategory).then(res => {
            //         this.ruleList = res.data;
            //     })
            // },
            //新增选择策略码
            // selectRuleNo(ruleNo,ruleCategory){
            //     var obj = {
            //         ruleCategory:ruleCategory,
            //         ruleNo:ruleNo
            //     }
            //     ApiProductRule.apiRuleInfo('rule_info',obj).then(res => {
            //         this.formInline.ruleName = res.data.ruleName;
            //         this.formInline.ruleDesc = res.data.ruleDesc;
            //         this.formInline.refuseCode = res.data.refuseCode;
            //         this.formInline.property = res.data.property;
            //         this.formInline.formula = res.data.formula;
            //         this.formInline.ruleRank = String(res.data.ruleRank);
            //         this.formInline.ruleVersion = String(res.data.ruleVersion);
            //     })
            // },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.formInline.ruleRank = String(this.formInline.ruleRank=='null'?"":this.formInline.ruleRank)
                        ApiProductRule.apiAddProductRule(this.formInline, 'addProductRule').then(response => {
                            if(response.code == '200'){
                                this.$message.success('新增策略成功')
                                this.init()
                                this.dialogFormVisible = false
                                this.formInline = JSON.parse(JSON.stringify(this.formInlineReset))
                                this.$refs[formName].resetFields()
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
                var obj = {
                    ruleCategory: this.search.ruleCategory,
                    id:row.id
                }
                ApiProductRule.apiInfo('info',obj).then(response => {
                    this.formInline = response.data;
                    this.formInline.ruleCategory = this.search.ruleCategory;
                    delete this.formInline["createTime"];
                    delete this.formInline["updateTime"];
                    this.formInline.status = String(this.formInline.status)
                    this.formInline.ruleVersion = String(this.formInline.ruleVersion==undefined?'':this.formInline.ruleVersion)
                    this.formInline.ruleType = String(this.formInline.ruleType)
                    this.formInline.ruleRank = String(this.formInline.ruleRank!=undefined?this.formInline.ruleRank:"")
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
                        ApiProductRule.apiUpdate(this.formInline,'update').then(response => {
                            if(response.code == '200'){
                                this.$message.success('编辑策略成功')
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
                    ruleCategory:this.search.ruleCategory
                }
                ApiProductRule.apiUpdateStatus(obj,'update_status').then(response => {
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
                    ruleCategory:this.search.ruleCategory
                }
                ApiProductRule.apiUpdateStatus(obj,'update_status').then(response => {
                    if(response.code == '200'){
                        this.$message.success('操作成功')
                        this.init()
                    }else{
                        this.$message.error(response.message)
                    }
                }).then()
            },
            check(e){
                var num = Number(e)
                if(num<0||num>2147483647){
                    this.$message.error("随机数区间在0-2147483647之间,请输入正确的随机数")
                }
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
