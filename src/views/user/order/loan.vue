<template>
    <div class="app-container">
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="订单号:">
                <el-input v-model="search.orderNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户编号:">
                <el-input v-model="search.userNo" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="产品编号:">
                <el-input v-model="search.productNo" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="第三方流水号:">
                <el-input v-model="search.serialId" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
                <el-input v-model="search.name" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="身份证:">
                <el-input v-model="search.idCard" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
                <el-input v-model="search.mobile" placeholder="请输入" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="订单状态:">
                <el-select v-model="search.status" placeholder="请输入">
                    <el-option v-for="(item,i) in selectList" :label="item.value" :value="item.key" :key="i"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请时间:">
                <el-date-picker v-model="time1" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="创建时间:">
                <el-date-picker v-model="time2" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="放款时间:">
                <el-date-picker v-model="time3" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData.list" style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="idCard" label="身份证"></el-table-column>
            <el-table-column prop="applAmount" label="借款金额"></el-table-column>
            <el-table-column prop="applDate" label="申请时间"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
            <el-table-column prop="extensionCount" label="展期次数"></el-table-column>
            <el-table-column prop="loanDate" label="放款时间"></el-table-column>
            <el-table-column prop="mobile" label="手机号 "></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="orderNo" label="订单号"></el-table-column>
            <el-table-column prop="overdueDay" label="逾期天数"></el-table-column>
            <el-table-column prop="overdueFlag" label="是否逾期"></el-table-column>
            <el-table-column prop="productNo" label="产品编号"></el-table-column>
            <el-table-column prop="realRepaymentAmount" label="已还款金额"></el-table-column>
            <el-table-column prop="realRepaymentDate" label="结清日期"></el-table-column>
            <el-table-column prop="renewalCount" label="续期次数"></el-table-column>
            <el-table-column prop="repaymentAmount" label="实际还款金额"></el-table-column>
            <el-table-column prop="repaymentDate" label="应还款时间"></el-table-column>
            <el-table-column prop="serialId" label="第三方流水号"></el-table-column>
            <el-table-column prop="status" label="订单状态"></el-table-column>
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
                time1:[],
                time2:[],
                time3:[],
                selectList:[]
            }
        },
        created() {
            ApiOrder.apiLoanStatusList('list').then(res => {
                this.selectList = res.data;
            })
            this.init();
        },
        methods: {
            init(){
                ApiOrder.apiLoanList('list',this.search).then(res => {
                    this.tableData = res.data;
                    this.tableData.list.map(item => {
                        item.overdueFlag = item.overdueFlag?'有过逾期':'未逾期'
                        this.selectList.map(listItem => {
                            if(listItem.key == item.status){
                                item.status = listItem.value
                            }
                        })
                    })
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
                if (this.time1 || this.time2 || this.time3) {
                    this.search.loanApplBeginTime = this.time1[0]
                    this.search.loanApplEndTime = this.time1[1]
                    this.search.loanCreateBeginTime = this.time2[0]
                    this.search.loanCreateEndTime = this.time2[1]
                    this.search.loanBeginTime = this.time3[0]
                    this.search.loanEndTime = this.time3[1]
                }else{
                    this.search.loanApplBeginTime = ''
                    this.search.loanApplEndTime = ''
                    this.search.loanCreateBeginTime = ''
                    this.search.loanCreateEndTime = ''
                    this.search.loanBeginTime = ''
                    this.search.loanEndTime = ''
                }
                this.init()
            },
            //重置表单
            clear() {
                this.search = JSON.parse(JSON.stringify(this.searchReset))
                this.time1 = [];
                this.time2 = [];
                this.time3 = [];
                this.init()
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
