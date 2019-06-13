<template>
    <div class="app-container">
        <el-dialog title="新建配置项" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="ip：" prop="ipValue">
                        <el-input v-model="formInline.ipValue" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!-- <el-dialog title="编辑配置项" :visible.sync="dialogEditFormVisible" top="3vh" width="45%" :show-close="false" :close-on-click-modal="false">
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
        </el-dialog> -->
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id" ></el-table-column>
            <el-table-column prop="ipValue" label="ip" ></el-table-column>
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
    import ApiWhitelist from '@/api/whitelist'
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
                formInline:{},
                formInlineReset:{},
                rules:{
                    value:[
                        { required: true, message: '请输入ip', trigger: 'blur' },
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
            //获取策略列表
            init(){
                ApiWhitelist.apiList('list',this.search).then(res => {
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
                        ApiWhitelist.apiInsert('insert',this.formInline).then(response => {
                            if(response.code == '200'){
                                this.$message.success('新增ip成功')
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
            }
        }
    }
</script>