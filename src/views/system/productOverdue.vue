<template>
    <div class="app-container">
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="订单号:">
                <el-input v-model="search.orderNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="产品编号:">
                <el-input v-model="search.productNo" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
                <el-input v-model="search.mobile" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
                <el-input v-model="search.idCard" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="逾期天数:">
                <el-input v-model="search.overdueDays" placeholder="请输入"></el-input>
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
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="idCard" label="身份证号"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="orderNo" label="订单号"></el-table-column>
            <el-table-column prop="productNo" label="产品编号"></el-table-column>
            <el-table-column prop="loanTime" label="放款时间"></el-table-column>
            <el-table-column prop="overdueAmt" label="逾期金额"></el-table-column>
            <el-table-column prop="overdueDays" label="逾期天数"></el-table-column>
            <el-table-column prop="repaymentTime" label="应还款时间"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
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
                search:{
                    currentPage:1,
                    pageSize:100,
                },
                searchReset:{
                    currentPage:1,
                    pageSize:100,
                },
                time:[],
            }
        },
        created() {
            this.init();
        },
        methods: {
            init(){
                ApiAuth.apiOverList('list',this.search).then(res => {
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
