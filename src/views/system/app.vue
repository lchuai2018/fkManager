<template>
    <div class="app-container">
        <el-dialog title="录入系统APP" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="app名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="app类型：" prop="type">
                        <el-input v-model="formInline.type" placeholder="请输入"></el-input>
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
        <el-dialog title="编辑系统APP" :visible.sync="dialogEditFormVisible" top="3vh" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="app名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="app类型：" prop="type">
                        <el-input v-model="formInline.type" placeholder="请输入"></el-input>
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
            <el-form-item label="app名称:">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="app类型:">
                <el-input v-model="search.type" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="风险等级:">
                <el-input v-model="search.risk" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="app名称"></el-table-column>
            <el-table-column prop="type" label="app类型"></el-table-column>
            <el-table-column prop="risk" label="风险等级"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
            :page-sizes="[100, 200, 300, 400]"
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import ApiSysApps from '@/api/sysapps'
    export default {
        data() {
            return {
                formInline:{},
                formInlineReset:{},
                rules:{
                    name:[
                        { required: true, message: '请输入app名称', trigger: 'blur' },
                    ],
                    type:[
                        { required: true, message: '请选择app类型', trigger: 'blur' },
                    ]
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
                dialogFormVisible:false,
                dialogEditFormVisible:false
            }
        },
        created() {
            this.init();
        },
        methods: {
            init(){
                ApiSysApps.apiQueryPageSysApp('queryPageSysApp',this.search).then(res => {
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
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiSysApps.apiAddSysApp(this.formInline, 'addSysApp').then(response => {
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
                ApiSysApps.apiQueryOneSysApp('queryOneSysApp',row.id).then(response => {
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
                        ApiSysApps.apiUpdateSysApp(this.formInline,'updateSysApp').then(response => {
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
