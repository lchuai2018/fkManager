<template>
    <div class="app-container">
        <el-dialog title="新建产品渠道" :visible.sync="dialogFormVisible" width="45%" top="3vh" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
                <el-form :model="formInline" :rules="rules" ref="formInline" label-width="130px" style="width:70%;display:inline-block;text-align:left">
                    <el-form-item label="产品名称：" prop="productNo">
                       <el-select v-model="formInline.productNo" placeholder="请选择">
                            <el-option v-for="(item, index) in productList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="渠道码:" prop="channelCode">
                        <el-input v-model="formInline.channelCode" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="渠道名称：" prop="channelName">
                       <el-input v-model="formInline.channelName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="等级水平值：" prop="channelLevel">
                        <el-input v-model="formInline.channelLevel" placeholder="请输入"></el-input>
                    </el-form-item>
                   <el-form-item label="拒绝状态：" prop="refuseFlag">
                        <el-select v-model="formInline.refuseFlag" placeholder="请输入">
                            <el-option label="拒绝" value="1"></el-option>
                            <el-option label="不拒绝" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="编辑产品渠道" :visible.sync="dialogEditFormVisible" width="45%" top="3vh" :show-close="false" :close-on-click-modal="false">
            <div style="text-align:center">
               <el-form :model="formInline" :rules="rules" ref="formInline" label-width="130px" style="width:70%;display:inline-block;text-align:left">
                   <el-form-item label="产品名称：" prop="productNo">
                       <el-select v-model="formInline.productNo" placeholder="请选择">
                            <el-option v-for="(item, index) in productList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="渠道码:" prop="channelCode">
                        <el-input v-model="formInline.channelCode" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="渠道名称：" prop="channelName">
                       <el-input v-model="formInline.channelName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="等级水平值：" prop="channelLevel">
                        <el-input v-model="formInline.channelLevel" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="拒绝状态：" prop="refuseFlag">
                        <el-select v-model="formInline.refuseFlag" placeholder="请输入">
                            <el-option label="拒绝" value="1"></el-option>
                            <el-option label="不拒绝" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button @click="resetEidtForm('formInline')">取消</el-button>
                        <el-button type="primary" @click="postEditData('formInline')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        
        <div class="searchRule">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="所属产品：" class="line">
                    <el-radio-group v-model="search.productNo" @change="onSubmit">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button v-for="(item,i) in productList" :label="item.key" :key="i">{{item.value}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="渠道名称:">
                    <el-input v-model="search.channelName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="拒绝状态:">
                    <el-select v-model="search.refuseFlag" clearable placeholder="请选择">
                        <el-option label="拒绝" value="1"></el-option>
                        <el-option label="不拒绝" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="渠道等级:">
                    <el-select v-model="search.channelLevel" clearable placeholder="请选择">
                        <el-option :label="channel.value" :value="channel.key" v-for="(channel, index) in channelList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加时间:">
                    <el-date-picker v-model="time" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="search">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="clear">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
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
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="productName" label="产品名称"></el-table-column>
            <el-table-column prop="channelCode" label="渠道码"></el-table-column>
            <el-table-column prop="channelName" label="渠道名称"></el-table-column>
            <el-table-column prop="channelLevel" label="渠道等级"></el-table-column>
            <el-table-column prop="refuseFlag" label="拒绝状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.refuseFlag==1" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#BFBFBF;vertical-align: middle;margin-right:5px;"></span>
                    <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#14A857;vertical-align: middle;margin-right:5px;"></span>
                    {{scope.row.refuseFlag==1?"拒绝":"不拒绝"}}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="添加时间"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editList(scope.row)">编辑</el-button>
                    <!-- <span style="margin:0 10px;color:#D4E2F0">|</span>  -->
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
    import ApiProductChannel from '@/api/product-channel'
    import ApiProduct from '@/api/product'
    import {openUrl} from '@/utils/index'
    export default {
        data() {
            return {
                formInline:{},
                formInlineReset:{},
                rules:{
                    productNo:[
                        { required: true, message: '请选择产品名称', trigger: 'change' },
                    ],
                    channelCode:[
                        { required: true, message: '请输入渠道码', trigger: 'blur' },
                    ],
                    channelName:[
                        { required: true, message: '请输入渠道名称', trigger: 'blur' },
                    ]
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
                time:[],
                productList:[],
                ruleList:[],
                fileList:[],
                channelList:[],
                dialogFormVisible:false,
                dialogEditFormVisible:false
            }
        },
        created() {
            // this.selectAllRole()
            this.init();
            ApiProduct.apiTreeList('tree_list',this.search).then(res => {
                this.productList = res.data;
            })
            ApiProductChannel.apiLevelTree('level_tree').then(res => {
                this.channelList = res.data;
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
                ApiProductChannel.apiImportExcel(fd, "insert/import_excel").then(response => {
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
            init(){
                ApiProductChannel.apiList('list',this.search).then(res => {
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
                this.search = JSON.parse(JSON.stringify(this.searchReset))
                this.time = []
                this.init()
            },
            //导出
            exportData(){
                openUrl('product/channel/export_excel',this.search)
                
                // window.open('http://139.224.239.194:8084/user/exportAllManagers?currentPage=1&pageSize=10')
                // ApiUser.apiExportAllManagers('exportAllManagers',this.search).then(res => {
                    
                // })
            },
            importData(command){
                switch (command) {
                    case "1":
                        openUrl('attachment/export_template',{templateType:'channelExcel'})
                        break;
                    default:
                        break;
                }
            },
            postData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ApiProductChannel.apiInsert(this.formInline, 'insert').then(response => {
                            if(response.code == '200'){
                                this.$message.success('新增产品渠道成功')
                                this.init()
                                this.dialogFormVisible = false
                                this.formInline = JSON.parse(JSON.stringify(this.formInlineReset))
                                this.$refs[formName].resetFields()
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
                ApiProductChannel.apiId(row.id).then(response => {
                    this.formInline = response.data;
                    this.formInline.refuseFlag = String(this.formInline.refuseFlag)
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
                        ApiProductChannel.apiUpdate(this.formInline,'update').then(response => {
                            if(response.code == '200'){
                                this.$message.success('编辑产品渠道成功')
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
.searchRule {
    background: #fff;
    border-radius: 5px;
    .line {
        width: 100%;
        border-bottom: 1px dashed #ccc;
        padding-bottom: 20px;
        .el-radio-button__inner{
            border:none;
            // margin-right:20px;
            // padding:8px 10px;
            border-radius:4px;
        }
    }
    .search {
        margin-left: 80px;
    }
}
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

