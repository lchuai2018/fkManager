<template>
    <div class="app-container">
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="操作人用户名:">
                <el-input v-model="search.userName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="操作名称:">
                <el-select v-model="search.operation" clearable placeholder="请选择">
                    <el-option :label="item.value" :value="item.key" v-for="(item, index) in operateName" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="操作类型:">
                <el-select v-model="search.operateType" clearable placeholder="请选择">
                    <el-option :label="item.value" :value="item.key" v-for="(item, index) in operateType" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="操作结果状态码:">
                <el-select v-model="search.resultStatus" clearable placeholder="请选择">
                    <el-option label="失败" value="0"></el-option>
                    <el-option label="成功" value="1"></el-option>
                    <!-- <el-option label="全部" value=""></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="操作时间:">
                <el-date-picker v-model="time" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
                <!-- <el-button @click="exportData">导出</el-button> -->
            </el-form-item>
        </el-form>
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="日志ID" width="70"></el-table-column>
            <el-table-column prop="userName" label="操作人用户名" width="140"></el-table-column>
            <el-table-column prop="operation" label="操作名称" width="150"></el-table-column>
            <el-table-column prop="operateType" label="操作类型" width="80"></el-table-column>
            <el-table-column prop="method" label="方法名" width="300"></el-table-column>
            <el-table-column prop="beforeParams" label="变更前参数" width="350"></el-table-column>
            <el-table-column prop="params" label="请求参数" width="500"></el-table-column>
            <el-table-column prop="ip" label="请求ip" width="140"></el-table-column>
            <el-table-column prop="resultStatus" label="状态码" width="110">
                <template slot-scope="scope">
                    {{scope.row.resultStatus==1?"成功":"失败"}}
                </template>
            </el-table-column>
            <el-table-column prop="result" label="操作结果" width="200"></el-table-column>
            <el-table-column prop="createTime" label="操作时间" width="180"></el-table-column>
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
    import ApiOperate from '@/api/operate'
    import {openUrl} from '@/utils/index'
    export default {
        data() {
            return {
                formInline:{},
                formInlineReset:{},
                tableData:[],
                operateName:[],
                time:[],
                operateType:[],
                search:{
                    currentPage:1,
                    pageSize:100,
                },
                searchReset:{
                    currentPage:1,
                    pageSize:100,
                },
            }
        },
        created() {
            ApiOperate.apiOperateNameList('operate_name/list').then(res => {
                this.operateName = res.data;
            })
            ApiOperate.apiOperateTypeList('operate_type/list').then(res => {
                this.operateType = res.data;
            })
            this.init();
        },
        methods: {
            init(){
                ApiOperate.apiList('list',this.search).then(res => {
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
                this.search = JSON.parse(JSON.stringify(this.searchReset))
                this.time = [];
                this.init()
            },
            //导出
            exportData(){
                openUrl('log/exportLog',this.search)
                
                // window.open('http://139.224.239.194:8084/user/exportAllManagers?currentPage=1&pageSize=10')
                // ApiUser.apiExportAllManagers('exportAllManagers',this.search).then(res => {
                    
                // })
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
