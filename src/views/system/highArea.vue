<template>
    <div class="app-container">
        <el-dialog title="录入高危地区" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="地区名：" prop="value">
                        <el-input v-model="formInline.value" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="地区简码：" prop="code">
                        <el-input v-model="formInline.code" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="地区类型：" prop="type">
                        <el-select v-model="formInline.type" clearable placeholder="请选择">
                            <el-option :label="item.value" :value="item.key" v-for="(item, index) in switchList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="启用" :value=1></el-option>
                            <el-option label="禁用" :value=2></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑高危地区" :visible.sync="dialogEditFormVisible" top="3vh" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="地区名：" prop="value">
                        <el-input v-model="formInline.value" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="地区简码：" prop="code">
                        <el-input v-model="formInline.code" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="地区类型：" prop="type">
                        <el-select v-model="formInline.type" clearable placeholder="请选择">
                            <el-option :label="item.value" :value="item.key" v-for="(item, index) in switchList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="formInline.status" placeholder="请选择">
                            <el-option label="启用" :value=1></el-option>
                            <el-option label="禁用" :value=2></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postEditData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="地区简码:">
                <el-input v-model="search.code" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="地区名:">
                <el-input v-model="search.value" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="添加时间:">
                <el-date-picker v-model="time" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地区类型:">
                <el-select v-model="search.type" clearable placeholder="请选择">
                    <el-option :label="item.value" :value="item.key" v-for="(item, index) in switchList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态:">
                <el-select v-model="search.status" clearable placeholder="请选择">
                    <el-option label="启用" :value=1 ></el-option>
                    <el-option label="禁用" :value=2 ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="code" label="地区简码"></el-table-column>
            <el-table-column prop="value" label="地区名"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status!=1" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.status==1?"启用":"禁用"}}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="地区类型"></el-table-column>
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
    import ApiHignArea from '@/api/high-area'
    export default {
        data() {
            return {
                formInline:{status:1},
                formInlineReset:{status:1},
                rules:{
                    value:[
                        { required: true, message: '请输入地区名', trigger: 'blur' },
                    ],
                    type:[
                        { required: true, message: '请选择地区类型', trigger: 'change' },
                    ],
                    status:[
                        { required: true, message: '请选择状态', trigger: 'change' },
                    ],
                },
                tableData:[],
                switchList:[],
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
            ApiHignArea.apiTree('high/tree_list').then(res => {
                this.switchList = res.data;
                this.init();
            })
        },
        methods: {
            init(){
                ApiHignArea.apiList('list',this.search).then(res => {
                    this.tableData = res.data;
                    for(var i in this.tableData.list){
                        for(var j in this.switchList){
                            if(this.tableData.list[i].type == this.switchList[j].key){
                                this.tableData.list[i].type = this.switchList[j].value
                            }
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
                this.init()
            },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiHignArea.apiInsert(this.formInline, 'insert').then(response => {
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
                ApiHignArea.apiQueryId('queryId',row.id).then(response => {
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
                        ApiHignArea.apiUpdate(this.formInline,'update').then(response => {
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
