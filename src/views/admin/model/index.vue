<template>
    <div class="app-container">
        <el-dialog title="新建模型" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="110px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="模型编号：" prop="modelNo">
                        <el-input v-model="formInline.modelNo" placeholder="请输入字母加数字组合，长度小于10"></el-input>
                    </el-form-item>
                    <el-form-item label="模型版本号：" prop="version">
                        <el-input v-model="formInline.version" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="变量编号：" prop="propertyNo">
                        <el-input v-model="formInline.propertyNo" placeholder="请输入字母加数字组合，长度小于10"></el-input>
                    </el-form-item>
                    <el-form-item label="变量名称：" prop="propertyName">
                        <el-input v-model="formInline.propertyName" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="变量描述：" prop="propertyDesc">
                        <el-input v-model="formInline.propertyDesc" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="变量：" prop="property">
                        <el-input v-model="formInline.property" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="表达式：" prop="formula">
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
        <el-dialog title="编辑模型" :visible.sync="dialogEditFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="110px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="模型编号：" prop="modelNo">
                        <el-input v-model="formInline.modelNo" placeholder="请输入字母加数字组合，长度小于10"></el-input>
                    </el-form-item>
                    <el-form-item label="模型版本号：" prop="version">
                        <el-input v-model="formInline.version" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="变量编号：" prop="propertyNo">
                        <el-input v-model="formInline.propertyNo" placeholder="请输入字母加数字组合，长度小于10"></el-input>
                    </el-form-item>
                    <el-form-item label="变量名称：" prop="propertyName">
                        <el-input v-model="formInline.propertyName" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="变量描述：" prop="propertyDesc">
                        <el-input v-model="formInline.propertyDesc" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="变量：" prop="property">
                        <el-input v-model="formInline.property" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="表达式：" prop="formula">
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
            <el-form-item label="模型编号:">
                <el-input v-model="search.modelNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="变量编号:">
                <el-input v-model="search.propertyNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="变量名称:">
                <el-input v-model="search.propertyName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状态:">
                <el-select v-model="search.status" placeholder="请选择">
                    <el-option label="禁用" value="2"></el-option>
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
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="modelNo" label="模型编号" width="130"></el-table-column>
            <el-table-column prop="propertyNo" label="变量编号" width="120"></el-table-column>
            <el-table-column prop="propertyName" label="变量名称" width="400"></el-table-column>
            <el-table-column prop="formula" label="表达式" width="800"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status=='2'" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.status=='1'?"启用":"禁用"}}
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
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="search.currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import ApiRiskModel from '@/api/risk-model'
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
                    modelNo:[
                        { required: true, message: '请输入模型编号', trigger: 'blur' },
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    version:[
                        { required: true, message: '请输入模型版本号', trigger: 'blur' },
                    ],
                    propertyNo:[
                        { required: true, message: '请输入变量编号', trigger: 'blur' },
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    propertyName:[
                        { required: true, message: '请输入变量名称', trigger: 'blur' },
                    ],
                    propertyDesc:[
                        { required: true, message: '请输入变量描述', trigger: 'blur' },
                    ],
                    property:[
                        { required: true, message: '请输入变量', trigger: 'blur' },
                    ],
                    formula:[
                        { required: true, message: '请输入表达式', trigger: 'blur' },
                    ],
                },
                tableData:[],
                search:{
                    currentPage:1,
                    pageSize:100
                },
                searchReset:{
                    currentPage:1,
                    pageSize:100
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
            //获取模型列表
            init(){
                ApiRiskModel.apiSelectRiskModelByParams('selectRiskModelByParams',this.search).then(res => {
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
                openUrl('risk_model/export_excel',this.search)
                
                // window.open('http://139.224.239.194:8084/user/exportAllManagers?currentPage=1&pageSize=10')
                // ApiUser.apiExportAllManagers('exportAllManagers',this.search).then(res => {
                    
                // })
            },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiRiskModel.apiAddRiskModel(this.formInline, 'addRiskModel').then(response => {
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
                ApiRiskModel.apiSelectOneRiskModel('selectOneRiskModel',row.id).then(response => {
                    this.formInline = response.data;
                    delete this.formInline["createTime"];
                    delete this.formInline["updateTime"];
                    this.formInline.ruleType = String(this.formInline.ruleType)
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
                        ApiRiskModel.apiUpdateRiskModel(this.formInline,'updateRiskModel').then(response => {
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
                    status:2
                }
                ApiRiskModel.apiUpdateStatus(obj,'update_status').then(response => {
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
                ApiRiskModel.apiUpdateStatus(obj,'update_status').then(response => {
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
