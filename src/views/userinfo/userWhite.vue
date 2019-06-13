<template>
    <div class="app-container">
        <el-dialog title="录入用户白名单" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证：" prop="idCard">
                        <el-input v-model="formInline.idCard" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="mobile">
                        <el-input v-model="formInline.mobile" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="产品编号：" prop="productNo">
                        <el-input v-model="formInline.productNo" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑用户白名单" :visible.sync="dialogEditFormVisible" top="3vh" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证：" prop="idCard">
                        <el-input v-model="formInline.idCard" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="mobile">
                        <el-input v-model="formInline.mobile" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="产品编号：" prop="productNo">
                        <el-input v-model="formInline.productNo" placeholder="请输入"></el-input>
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
            <el-form-item label="身份证:">
                <el-input v-model="search.idCard" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
                <el-input v-model="search.mobile" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="产品编号:">
                <el-input v-model="search.productNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="添加时间:">
                <el-date-picker v-model="time" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="idCard" label="身份证号"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="productNo" label="产品编号"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="90"
                >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editList(scope.row)">编辑</el-button>
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
    import ApiUserWhite from '@/api/userWhite'
    export default {
        data() {
            return {
                formInline:{},
                formInlineReset:{},
                rules:{
                    name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    idCard:[
                        { required: true, message: '请输入身份证号码', trigger: 'blur' },
                    ],
                    mobile:[
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                    ],
                    productNo:[
                        { required: true, message: '请输入产品编号', trigger: 'blur' },
                    ],
                },
                tableData:[],
                search:{
                    currentPage:1,
                    pageSize:100,
                },
                searchReset:{
                    currentPage:1,
                    pageSize:100,
                },
                time:[],
                dialogFormVisible:false,
                dialogEditFormVisible:false
            }
        },
        created() {
            this.init();
        },
        methods: {
            init(){
                ApiUserWhite.apiList('list',this.search).then(res => {
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
                if (this.time) {
                    this.search.createBeginTime = this.time[0]
                    this.search.createEndTime = this.time[1]
                }else{
                    this.search.createBeginTime = ''
                    this.search.createEndTime = ''
                }
                this.init()
            },
            //重置表单
            clear() {
                this.search = JSON.parse(JSON.stringify(this.searchReset))
                this.time = [];
                this.init()
            },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiUserWhite.apiInsert(this.formInline, 'insert').then(response => {
                            if(response.code == '200'){
                                this.$message.success('新增成功')
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
                ApiUserWhite.apiQueryId('queryId',row.id).then(response => {
                    this.formInline = response.data;
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
                        ApiUserWhite.apiUpdate(this.formInline,'update').then(response => {
                            if(response.code == '200'){
                                this.$message.success('编辑成功')
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
