<template>
    <div class="app-container">
        <el-dialog title="录入黑名单" :visible.sync="dialogFormVisible" width="45%" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="来源：" prop="source">
                        <el-input v-model="formInline.source" placeholder="请输入"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="黑名单类型：" prop="type">
                        <el-select v-model="formInline.type" clearable placeholder="请选择">
                            <el-option label="其他" value="0"></el-option>
                            <el-option label="黑名单" value="1"></el-option>
                            <el-option label="灰名单" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                        <el-input v-model="formInline.idCard" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <el-input v-model="formInline.mobile" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="订单编号：" prop="orderNo">
                        <el-input v-model="formInline.orderNo" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="逾期天数：" prop="overdueDays">
                        <el-input v-model="formInline.overdueDays" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="逾期金额(元)：" prop="overdueAmt">
                        <el-input v-model="formInline.overdueAmt" placeholder="请输入"></el-input>
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
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="120px" style="width:70%;display:inline-block;text-align:left">
                   <el-form-item label="来源：" prop="source">
                        <el-input v-model="formInline.source" placeholder="请输入"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="黑名单类型：" prop="type">
                        <el-select v-model="formInline.type" clearable placeholder="请选择">
                            <el-option label="其他" value="0"></el-option>
                            <el-option label="黑名单" value="1"></el-option>
                            <el-option label="灰名单" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="formInline.name" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                        <el-input v-model="formInline.idCard" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <el-input v-model="formInline.mobile" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="订单编号：" prop="orderNo">
                        <el-input v-model="formInline.orderNo" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="逾期天数：" prop="overdueDays">
                        <el-input v-model="formInline.overdueDays" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="逾期金额(元)：" prop="overdueAmt">
                        <el-input v-model="formInline.overdueAmt" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postEditData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!-- <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="姓名:">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
                <el-input v-model="search.idCard" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
                <el-input v-model="search.mobile" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="来源:">
                <el-select v-model="search.source" clearable placeholder="请选择">
                    <el-option :label="item.value" :value="item.key" v-for="(item, index) in typeList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加时间:">
                <el-date-picker v-model="time" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item> -->
            <!-- <el-form-item label="黑名单类型:">
                <el-select v-model="search.type" clearable placeholder="请选择">
                    <el-option label="其他" value="0"></el-option>
                    <el-option label="黑名单" value="1"></el-option>
                    <el-option label="灰名单" value="2"></el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
            </el-form-item>
        </el-form> -->
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">录入</el-button>
        <!-- <el-button @click="exportData">导出</el-button> -->
        <!-- <el-dropdown trigger="click" @command="importData">
            <el-button> 
                导入 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">下载模板</el-dropdown-item>
                <el-upload
                    class="upload-demo"
                    style="width:100%;"
                    action="123"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                >
                <el-button  type="text" style="color:#606266;width:100%;">上传</el-button>
                </el-upload>
            </el-dropdown-menu>
        </el-dropdown> -->
        <!-- <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
            <el-table-column prop="idCard" label="身份证号" width="180"></el-table-column>
            <el-table-column prop="overdueDays" label="逾期天数"></el-table-column>
            <el-table-column prop="overdueAmt" label="逾期金额(元)"></el-table-column>
            <el-table-column prop="orderNo" label="订单编号" width="220"></el-table-column>
            <el-table-column prop="type" label="黑名单类型"></el-table-column>
            <el-table-column prop="source" label="黑名单来源"></el-table-column>
            <el-table-column prop="createTime" label="添加时间"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="90"
                >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editList(scope.row)">编辑</el-button> -->
                    <!-- <span style="margin:0 10px;color:#D4E2F0">|</span>  -->
                   <!-- <el-button type="text" size="small" style="color:#FF6666" @click="deleteList(scope.row)">删除</el-button>-->
                <!-- </template>
            </el-table-column>
        </el-table> -->
        <!-- <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="search.currentPage"
            :page-sizes="[100, 200, 300]"
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total">
            </el-pagination>
        </div> -->
    </div>
</template>
<script>
    import ApiRiskBlackList from '@/api/risk-blacklist'
    import {openUrl} from '@/utils/index'
    export default {
        data() {
            return {
                formInline:{},
                formInlineReset:{},
                rules:{
                    source:[
                        { required: true, message: '请输入来源', trigger: 'blur' },
                    ],
                    // type:[
                    //     { required: true, message: '请选择黑名单类型', trigger: 'change' },
                    // ],
                    name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
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
                time:[],
                typeList:[],
                fileList:[],
                dialogFormVisible:false,
                dialogEditFormVisible:false
            }
        },
        created() {
            // this.selectAllRole()
            this.init();
            ApiRiskBlackList.apiTreeList('source/tree_list').then(res => {
                this.typeList = res.data;
            })
        },
        methods: {
            beforeUpload(file){
                const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type=== 'application/vnd.ms-excel';
                if(!isExcel){
                    this.$message.error('上传文件只能是Excel文件!');
                    return false
                }
                let fd = new FormData();//通过form数据格式来传
                fd.append("multipartFile", file); //传文件
                
                // fd.append("shop_code", code); //传其他参数
                ApiRiskBlackList.apiInsetImportExcel(fd, "insert/import_excel").then(response => {
                    if(response.data.errorReasonString){
                        this.$alert('<p>预计导入数据条数：'+response.data.importTotalCount+'条，成功导入：'+(response.data.importTotalCount-response.data.importErrorCount)+'条，失败：'+response.data.importErrorCount+'条</p><p>有以下的失败原因：</p><p>'+response.data.errorReasonString+'</p>', '导入信息', {
                            dangerouslyUseHTMLString: true
                        });
                    }else{
                        this.$alert('<p>预计导入数据条数：'+response.data.importTotalCount+'条，成功导入：'+(response.data.importTotalCount-response.data.importErrorCount)+'条，失败：'+response.data.importErrorCount+'条</p>', '导入信息', {
                            dangerouslyUseHTMLString: true
                        });
                    }
                    this.init();
                })
                return false
            },
            //获取策略列表
            init(){
                ApiRiskBlackList.apiList('list',this.search).then(res => {
                    this.tableData = res.data;
                    for(let key in this.tableData.list){
                        switch (this.tableData.list[key].type) {
                            case 0:
                                this.tableData.list[key].type = '其他'
                                continue;
                            case 1:
                                this.tableData.list[key].type = '黑名单'
                                continue;
                            case 2:
                                this.tableData.list[key].type = '灰名单'
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
                this.time = []
                this.init()
            },
            //导出
            exportData(){
                openUrl('risk/black/export_excel',this.search)
                
                // window.open('http://139.224.239.194:8084/user/exportAllManagers?currentPage=1&pageSize=10')
                // ApiUser.apiExportAllManagers('exportAllManagers',this.search).then(res => {
                    
                // })
            },
            //导入
            importData(command){
                switch (command) {
                    case "1":
                        openUrl('attachment/export_template',{templateType:'blackExcel'})
                        break;
                    default:
                        break;
                }
            },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiRiskBlackList.apiInset(this.formInline, 'insert').then(response => {
                            if(response.code == '200'){
                                this.$message.success('录入黑名单成功')
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
                ApiRiskBlackList.apiId('queryId',row.id).then(response => {
                    this.formInline = response.data;
                    this.formInline.type = String(this.formInline.type)
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
                        ApiRiskBlackList.apiUpdate(this.formInline,'update').then(response => {
                            if(response.code == '200'){
                                this.$message.success('编辑黑名单成功')
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
