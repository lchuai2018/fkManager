<template>
    <div class="app-container">
        <el-dialog title="变更列表" :visible.sync="dialogFormAmount" width="65%" class="orderContain" :before-close="closeAmount">
            <div style="">
                <el-table :data="amountData.list" style="width: 100%;margin-top:20px;">
                    <el-table-column prop="id" label="id"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column prop="productNo" label="产品编号"></el-table-column>
                    <el-table-column prop="changeScore" label="偏移量"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="finalScore" label="升降分后结果值"></el-table-column>
                    <el-table-column prop="modelScore" label="模型计算分值"></el-table-column>
                    <el-table-column prop="modelType" label="模型类型"></el-table-column>
                    <el-table-column prop="modelVersion" label="模型版本"></el-table-column>
                    <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                    @size-change="amountSizeChange"
                    @current-change="amountCurrentChange"
                    :current-page="amountSearch.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="amountSearch.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="amountData.total">
                    </el-pagination>
                </div>
            </div>
        </el-dialog>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="订单号:">
                <el-input v-model="search.orderNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="模型版本:">
                <el-input v-model="search.modelVersion" placeholder="请输入" style="width:300px;"></el-input>
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
            <el-table-column prop="orderNo" label="订单号"></el-table-column>
            <el-table-column prop="modelVersion" label="模型版本"></el-table-column>
            <el-table-column prop="modelScore" label="最终的模型结果"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="amoutList(scope.row)">变更列表</el-button>
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
    import ApiOrder from '@/api/order'
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
                amountSearch:{
                    currentPage:1,
                    pageSize:10,
                    userNo:""
                },
                amountData:[],
                time:[],
                dialogFormAmount:false,
            }
        },
        created() {
            this.init();
        },
        methods: {
            init(){
                ApiOrder.apiOrderModelScore('orderModelScore',this.search).then(res => {
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
                this.time = [];
                this.init()
            },
            amoutList(row){
                this.dialogFormAmount = true
                this.amountSearch.orderNo = this.amountSearch.orderNo?this.amountSearch.orderNo:row.orderNo;
                ApiOrder.apiOrderModelScoreChange('orderModelScoreChange',this.amountSearch).then(res => {
                    this.amountData = res.data;
                })
            },
            //改变每页数据数量
            amountSizeChange(val) {
                this.amountSearch.pageSize = val;
                this.amoutList()
            },
            //改变当前页码
            amountCurrentChange(val) {
                this.amountSearch.currentPage = val;
                this.amoutList()
            },
            closeAmount() {
                this.dialogFormAmount = false
                this.amountSearch = { 'currentPage':1, 'pageSize':10,  'orderNo':"" };
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
