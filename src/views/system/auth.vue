<template>
    <div class="app-container">
        <el-dialog title="新增产品auth" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="authToken：" prop="authToken">
                        <el-input v-model="formInline.authToken" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id" ></el-table-column>
            <el-table-column prop="authValue" label="authValue" ></el-table-column>
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
    import ApiAuth from '@/api/auth'
    export default {
        data() {
            return {
                tableData:[],
                rules:{
                    authToken:[
                        { required: true, message: '请输入authToken', trigger: 'blur' },
                    ]
                },
                search:{
                    currentPage:1,
                    pageSize:100,
                },
                searchReset:{
                    currentPage:1,
                    pageSize:100,
                },
                dialogFormVisible:false,
                formInline:{},
                formInlineReset:{},
            }
        },
        created() {
            this.init();
        },
        methods: {
            //获取策略列表
            init(){
                ApiAuth.apiList('list',this.search).then(res => {
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
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiAuth.apiInsert(this.formInline, 'insert').then(response => {
                            this.$message.success('新增成功')
                            this.init()
                            this.$refs[formName].resetFields()
                            this.dialogFormVisible = false
                            this.formInline = JSON.parse(JSON.stringify(this.formInlineReset))
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
        }
    }
</script>