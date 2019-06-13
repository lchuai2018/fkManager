<template>
    <div class="app-container">
        <el-dialog title="新建配置项" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="配置名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="配置类型：" prop="type">
                        <el-input v-model="formInline.type" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="配置值：" prop="value">
                        <el-input type="textarea" v-model="formInline.value" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="配置说明：" prop="detail">
                        <el-input type="textarea" v-model="formInline.detail" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" placeholder="请输入">
                            <el-option label="启用" value="0"></el-option>
                            <el-option label="禁用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑配置项" :visible.sync="dialogEditFormVisible" top="3vh" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                   <el-form-item label="配置名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="配置类型：" prop="type">
                        <el-input v-model="formInline.type" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="配置值：" prop="value">
                        <el-input type="textarea" v-model="formInline.value" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="配置说明：" prop="detail">
                        <el-input type="textarea" v-model="formInline.detail" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postEditData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="配置名称:">
                <el-input v-model="search.codeName" placeholder="请输入" style="width:250px;"></el-input>
            </el-form-item>
            <el-form-item label="配置类型:">
                <el-select v-model="search.type" clearable placeholder="请选择">
                    <el-option :label="item.key" :value="item.value" v-for="(item, index) in type" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态:">
                <el-select v-model="search.status" clearable placeholder="请选择">
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="禁用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间:">
                <el-date-picker v-model="time" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <!-- <el-button @click="exportData">导出</el-button> -->
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id" width="50"></el-table-column>
            <el-table-column prop="name" label="配置名称" width="250"></el-table-column>
            <el-table-column prop="type" label="配置类型" width="250"></el-table-column>
            <el-table-column prop="value" label="配置值" width="400"></el-table-column>
            <el-table-column prop="detail" label="配置说明" width="300"></el-table-column>
            <el-table-column prop="status" label="状态" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.status" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.status?"禁用":"启用"}}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editList(scope.row)">编辑</el-button>
                    <span style="margin:0 10px;color:#D4E2F0">|</span> 
                    <el-button v-if="scope.row.status==0" type="text" size="small" @click="forbid(scope.row)">禁用</el-button>
                    <el-button v-if="scope.row.status==1" type="text" size="small" @click="start(scope.row)">启用</el-button>
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
    import ApiSystem from '@/api/risk-system'
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
            return {
                formInline:{
                    status:"0"
                },
                formInlineReset:{
                    status:"0"
                },
                rules:{
                    name:[
                        { required: true, message: '请输入配置名称', trigger: 'blur' },
                    ],
                    type:[
                        { required: true, message: '请输入配置类型', trigger: 'blur' },
                    ],
                    value:[
                        { required: true, message: '请输入配置值', trigger: 'blur' },
                    ],
                    detail:[
                        { required: true, message: '请输入配置说明', trigger: 'blur' },
                    ]
                },
                tableData:[],
                time:[],
                type:[],
                search:{
                    currentPage:1,
                    pageSize:100,
                },
                searchReset:{
                    currentPage:1,
                    pageSize:100,
                },
                dialogFormVisible:false,
                dialogEditFormVisible:false
            }
        },
        created() {
            ApiSystem.apiTypeTreeList('type_tree/list').then(res => {
                this.type = res.data;
            })
            this.init();
        },
        methods: {
            //获取策略列表
            init(){
                ApiSystem.apiList('list',this.search).then(res => {
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
                this.search.currentPage=1;
                if (this.time) {
                    this.search.beginTime = this.time[0]
                    this.search.endTime = this.time[1]
                }else{
                    this.search.beginTime = ''
                    this.search.endTime = ''
                }
                this.init()
            },
            //重置表单
            clear() {
                this.search = JSON.parse(JSON.stringify(this.searchReset));
                this.time = [];
                this.init()
            },
            //导出
            exportData(){
                openUrl('system_config/exportConfig',this.search)
                
                // window.open('http://139.224.239.194:8084/user/exportAllManagers?currentPage=1&pageSize=10')
                // ApiUser.apiExportAllManagers('exportAllManagers',this.search).then(res => {
                    
                // })
            },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiSystem.apiInsert(this.formInline, 'insert').then(response => {
                            if(response.code == '200'){
                                this.$message.success('新增配置成功')
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
                ApiSystem.apiInfo('info',row.id).then(response => {
                    this.formInline = response.data;
                    // delete this.formInline["createTime"];
                    // delete this.formInline["updateTime"];
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
                        ApiSystem.apiUpdateInfo(this.formInline,'update_info').then(response => {
                            if(response.code == '200'){
                                this.$message.success('编辑配置成功')
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
                    status:1
                }
                ApiSystem.apiUpdateStatus(obj,'update_status').then(response => {
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
                    status:0
                }
                ApiSystem.apiUpdateStatus(obj,'update_status').then(response => {
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
