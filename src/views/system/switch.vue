<template>
    <div class="app-container">
        <el-dialog title="新建配置项" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="100px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="开关名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="开关值：" prop="value">
                        <el-input v-model="formInline.value" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" placeholder="请输入">
                            <el-option label="启用" :value=true></el-option>
                            <el-option label="禁用" :value=false></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细说明：" prop="detail">
                        <el-input type="textarea" v-model="formInline.detail" placeholder="请输入" ></el-input>
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
                   <el-form-item label="开关名称：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="开关值：" prop="value">
                        <el-input v-model="formInline.value" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" placeholder="请输入">
                            <el-option label="启用" :value=true></el-option>
                            <el-option label="禁用" :value=false></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细说明：" prop="detail">
                        <el-input type="textarea" v-model="formInline.detail" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postEditData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="name" label="开关名称"></el-table-column>
            <el-table-column prop="value" label="开关值"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="!scope.row.status" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.status?"启用":"禁用"}}
                </template>
            </el-table-column>
            <el-table-column prop="detail" label="详细说明"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
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
    import ApiSwitch from '@/api/switch'
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
            //获取策略列表q
            init(){
                ApiSwitch.apiQuery('query',this.search).then(res => {
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
                        ApiSwitch.apiAdd('add',this.formInline).then(response => {
                            if(response.code == '200'){
                                this.$message.success('新增开关成功')
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
                this.formInline = row
                this.dialogEditFormVisible = true;
            },
            resetEidtForm(formName){
                this.dialogEditFormVisible = false;
                this.$refs[formName].resetFields();
                this.formInline = JSON.parse(JSON.stringify(this.formInlineReset));
            },
            postEditData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiSwitch.apiChange('change',this.formInline,).then(response => {
                            if(response.code == '200'){
                                this.$message.success('编辑开关成功')
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
        }
    }
</script>