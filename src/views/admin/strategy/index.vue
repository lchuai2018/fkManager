<template>
    <div class="app-container">
        <el-dialog title="新建策略" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="策略类型：" prop="riskRuleType">
                        <el-select v-model="formInline.riskRuleType" clearable placeholder="请选择">
                            <el-option label="产品策略" value="0"></el-option>
                            <el-option label="老用户策略" value="1"></el-option>
                            <el-option label="提额策略" value="2"></el-option>
                            <el-option label="降额策略" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略码：" prop="ruleNo">
                        <el-input v-model="formInline.ruleNo" placeholder="请输入字母加数字组合，长度小于10(新建成功后不支持修改)"></el-input>
                    </el-form-item>
                    <el-form-item label="策略名称：" prop="ruleName">
                        <el-input v-model="formInline.ruleName" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="字段类型：" prop="fieldType">
                        <el-select v-model="formInline.fieldType" placeholder="请选择">
                            <el-option label="简单字段" value="1"></el-option>
                            <el-option label="计算字段" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规则层级：" prop="ruleRank" v-if="formInline.riskRuleType==2||formInline.riskRuleType==3">
                        <el-select v-model="formInline.ruleRank" placeholder="请选择">
                            <el-option label="中间规则" value="0"></el-option>
                            <el-option label="终极规则" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略描述：" prop="ruleDesc">
                        <el-input v-model="formInline.ruleDesc" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="策略属性：" prop="property">
                        <el-input v-model="formInline.property" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="拒件码：" prop="decisionCode">
                        <el-input v-model="formInline.decisionCode" placeholder="请输入字母加数字组合，长度小于10"></el-input>
                    </el-form-item>
                    <el-form-item label="决策集类型:" prop="decisionType" v-if="/^[123]$/.test(formInline.riskRuleType)">
                        <el-select v-model="formInline.decisionType" placeholder="请选择">
                            <el-option label="决策集1" value="1"></el-option>
                            <el-option label="决策集2" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略公式：" prop="formula">
                        <el-input type="textarea" v-model="formInline.formula"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input type="textarea" v-model="formInline.remark" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑策略" :visible.sync="dialogEditFormVisible" top="3vh" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                   <el-form-item label="策略类型：" prop="riskRuleType">
                        <el-select v-model="formInline.riskRuleType" disabled clearable placeholder="请选择">
                            <el-option label="产品策略" value="0"></el-option>
                            <el-option label="老用户策略" value="1"></el-option>
                            <el-option label="提额策略" value="2"></el-option>
                            <el-option label="降额策略" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略码：" prop="ruleNo">
                        <!-- <el-input v-model="formInline.ruleNo" placeholder="请输入字母加数字组合，长度小于10" disabled></el-input> -->
                        <span>{{formInline.ruleNo}}</span>
                    </el-form-item>
                    <el-form-item label="策略名称：" prop="ruleName">
                        <el-input v-model="formInline.ruleName" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="字段类型：" prop="fieldType">
                        <el-select v-model="formInline.fieldType" placeholder="请选择">
                            <el-option label="简单字段" value="1"></el-option>
                            <el-option label="计算字段" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规则层级：" prop="ruleRank" v-if="formInline.riskRuleType==2||formInline.riskRuleType==3">
                        <el-select v-model="formInline.ruleRank" placeholder="请选择">
                            <el-option label="中间规则" value="0"></el-option>
                            <el-option label="终极规则" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略描述：" prop="ruleDesc">
                        <el-input v-model="formInline.ruleDesc" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="策略属性：" prop="property">
                        <el-input v-model="formInline.property" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="拒件码：" prop="decisionCode">
                        <el-input v-model="formInline.decisionCode" placeholder="请输入字母加数字组合，长度小于10"></el-input>
                    </el-form-item>
                    <el-form-item label="决策集类型:" prop="decisionType" v-if="/^[123]$/.test(formInline.riskRuleType)">
                        <el-select v-model="formInline.decisionType" placeholder="请选择">
                            <el-option label="决策集1" value="1"></el-option>
                            <el-option label="决策集2" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="策略公式：" prop="formula">
                        <el-input type="textarea" v-model="formInline.formula"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息：">
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
            <el-form-item label="策略码:">
                <el-input v-model="search.ruleNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="拒件码:">
                <el-input v-model="search.decisionCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="策略名称:">
                <el-input v-model="search.ruleName" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="字段类型:">
                <el-select v-model="search.fieldType" clearable placeholder="请选择">
                    <el-option label="简单字段" value="1"></el-option>
                    <el-option label="计算字段" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态:">
                <el-select v-model="search.status" placeholder="请选择">
                    <el-option label="禁用" value="2"></el-option>
                    <el-option label="启用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="策略类型:">
                <el-select v-model="search.riskRuleType" clearable placeholder="请选择">
                    <el-option label="产品策略" value="0"></el-option>
                    <el-option label="老用户策略" value="1"></el-option>
                    <el-option label="提额策略" value="2"></el-option>
                    <el-option label="降额策略" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <!-- <el-button @click="exportData">导出</el-button> -->
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="riskRuleType" label="策略类型" width="100"></el-table-column>
            <el-table-column prop="ruleNo" label="策略码" width="120"></el-table-column>
            <el-table-column prop="ruleName" label="策略名称" width="350"></el-table-column>
            <el-table-column prop="fieldType" label="字段类型" width="90">
                <template slot-scope="scope">
                    {{scope.row.fieldType==1?"简单字段":"计算字段"}}
                </template>
            </el-table-column>
            <el-table-column prop="ruleDesc" label="策略描述" width="350"></el-table-column>
            <el-table-column prop="formula" label="策略公式" width="350"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status=='2'" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.status=='1'?"启用":"禁用"}}
                </template>
            </el-table-column>
            <el-table-column prop="decisionCode" label="拒件码"></el-table-column>
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
            :page-sizes="[10, 20, 30, 40]"
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import ApiRiskRule from '@/api/risk-rule'
    import {openUrl} from '@/utils/index'
    export default {
        data() {
            var validateAccount = (rule, value, callback) => {
                if ( value ) {
                    if((/[\d]+/.test(value)&&/[a-zA-Z]+/.test(value)&&value.length<10)){
                        callback();
                    }else{
                        callback(new Error('小于10位且只能是数字加字母'));
                    }
                }
            };
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
                formInline:{},
                formInlineReset:{},
                rules:{
                    riskRuleType:[
                        { required: true, message: '请选择策略类型', trigger: 'change' },
                    ],
                    ruleNo:[
                        { required: true, message: '请输入策略码', trigger: 'blur' },
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    ruleName:[
                        { required: true, message: '请输入策略名称', trigger: 'blur' },
                    ],
                    fieldType:[
                        { required: true, message: '请选择字段类型', trigger: 'change' },
                    ],
                    ruleRank:[
                        { required: true, message: '请选择规则层级', trigger: 'change' },
                    ],
                    ruleDesc:[
                        { required: true, message: '请输入策略描述', trigger: 'blur' },
                    ],
                    property:[
                        { required: true, message: '请输入策略属性', trigger: 'blur' },
                    ],
                    decisionType:[
                        { required: true, message: '请选择所属决策集类型', trigger: 'change' },
                    ],
                    decisionCode:[
                        { required: true, message: '请输入拒件码', trigger: 'blur' },
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    formula:[
                        { required: true, message: '请输入策略公式', trigger: 'blur' },
                    ]
                },
                tableData:[],
                search:{
                    currentPage:1,
                    pageSize:10,
                },
                searchReset:{
                    currentPage:1,
                    pageSize:10,
                },
                dialogFormVisible:false,
                dialogEditFormVisible:false
            }
        },
        created() {
            // this.selectAllRole()
            this.init();
        },
        methods: {
            //获取策略列表
            init(){
                ApiRiskRule.apiSelectRiskRuleByParams('selectRiskRuleByParams',this.search).then(res => {
                    this.tableData = res.data;
                    for(let key in this.tableData.list){
                        switch (this.tableData.list[key].riskRuleType) {
                            case 0:
                                this.tableData.list[key].riskRuleType = '产品策略'
                                continue;
                            case 1:
                                this.tableData.list[key].riskRuleType = '老用户策略'
                                continue;
                            case 2:
                                this.tableData.list[key].riskRuleType = '提额策略'
                                continue;
                            case 3:
                                this.tableData.list[key].riskRuleType = '降额策略'
                                continue;
                            default:
                                continue;
                        }
                    }
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
                openUrl('risk_rule/export_excel',this.search)
                
                // window.open('http://139.224.239.194:8084/user/exportAllManagers?currentPage=1&pageSize=10')
                // ApiUser.apiExportAllManagers('exportAllManagers',this.search).then(res => {
                    
                // })
            },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiRiskRule.apiAddRiskRule(this.formInline, 'addRiskRule').then(response => {
                            if(response.code == '200'){
                                this.$message.success('新增策略成功')
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
                ApiRiskRule.apiSelectRiskRuleOne('selectRiskRuleOne',row.id).then(response => {
                    this.formInline = response.data;
                    delete this.formInline["createTime"];
                    delete this.formInline["updateTime"];
                    this.formInline.fieldType = String(this.formInline.fieldType)
                    this.formInline.riskRuleType = String(this.formInline.riskRuleType)
                    this.formInline.decisionType = String(this.formInline.decisionType==undefined?'':this.formInline.decisionType)
                    this.formInline.ruleRank = String(this.formInline.ruleRank)
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
                        ApiRiskRule.apiUpdateRiskRule(this.formInline,'updateRiskRule').then(response => {
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
                    status:2
                }
                ApiRiskRule.apiUpdateStatus(obj,'update_status').then(response => {
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
                    status:1
                }
                ApiRiskRule.apiUpdateStatus(obj,'update_status').then(response => {
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
