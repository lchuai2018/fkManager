<template>
    <div class="app-container dialogBoxs">
        <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="65%" class="orderContain" :before-close="handleClose">
            <div style="text-align:center">
                <div class="header">
                    <h2><img src="../../../assets/404_images/producticon.png" alt="">订单编号：{{detailMsg.orderNo}}</h2>
                    <div>
                        <p>所属产品：<span>{{detailMsg.productName}}</span></p>
                        <!-- <p>渠道类型：<span>{{detailMsg.channelType}}</span></p> -->
                        <p>订单申请时间：<span>{{detailMsg.createTime}}</span></p>
                    </div>
                    <div>
                        <p><span>审核结果</span></p>
                        <p> <strong>{{detailMsg.decision=="A"?'通过':detailMsg.decision=="D"?'拒件':'待审核'}}</strong></P>
                    </div>
                </div>
                <div class="orderBox">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="订单信息" name="first">
                            <ul class="orderDetail">
                                <li>
                                    <h4>订单信息</h4>
                                    <p>产品码：<span>{{detailMsg.productNo}}</span></p>
                                    <p>产品名称：<span>{{detailMsg.productName}}</span></p>
                                    <p>申请金额(元)：<span>{{detailMsg.applAmount}}</span></p>
                                    <p>第三方流水号：<span>{{detailMsg.serialId}}</span></p>
                                    <p>订单随机数：<span>{{detailMsg.random}}</span></p>
                                    <p>用户审核额度(元)：<span>{{detailMsg.auditLimit}}</span></p>
                                    <p>渠道编号：<span>{{detailMsg.channelCode}}</span></p>
                                    <p>渠道名称：<span>{{detailMsg.channelName}}</span></p>
                                    <p>上次减免对应的逾期天数：<span>{{detailMsg.lastReduceOverdueDays}}</span></p>
                                    <!-- <p>订单续期次数：<span>{{detailMsg.renewTimes}}次</span></p> -->
                                </li>
                                <li>
                                    <h4>用户信息</h4>
                                    <p>第三方用户ID：<span>{{detailMsg.customerId}}</span></p>
                                    <p>用户姓名：<span>{{detailMsg.name}}</span></p>
                                    <p>用户编号：<span>{{detailMsg.userNo}}</span></p>
                                    <p>手机号码：<span>{{detailMsg.mobile}}</span></p>
                                    <p>身份证号：<span>{{detailMsg.idCard}}</span></p>
                                    <p>用户居住地址：<span>{{detailMsg.address}}</span></p>
                                    <!-- <p>来源渠道：<span>{{detailMsg.channelNo}}</span></p> -->
                                    <p>用户状态：<span>{{detailMsg.customerType=='--'?'--':detailMsg.customerType=='1'?'老用户':'新用户'}}</span></p>
                                    <p>网络环境：<span>{{detailMsg.networkType}}</span></p>
                                    <p>设备id：<span>{{detailMsg.deviceId}}</span></p>
                                    <p>设备类型：<span>{{detailMsg.deviceType}}</span></p>
                                    <p>设备系统类型：<span>{{detailMsg.deviceSysType}}</span></p>
                                    <p>芝麻分：<span>{{detailMsg.zmScore}}</span></p>
                                    <p>产品用户id：<span>{{detailMsg.customerId}}</span></p>
                                </li>
                                <li class="other" v-if="detailMsg.customerType=='1'">
                                    <h4>补充信息</h4>
                                    <!-- <p>历史还款：<span :style="detailMsg.historyRepayment=='逾期'?'color:red':''">{{detailMsg.historyRepayment}}</span></p> -->
                                    <p>逾期天数：<span>{{detailMsg.overdueDays}}天</span></p>
                                </li>
                                <li>
                                    <h4>风控信息</h4>
                                    <p>审核状态：<span>{{detailMsg.status}}</span></p>
                                    <p>回调状态：<span :style="detailMsg.callbackStatus=='2'?'color:red':''">{{detailMsg.callbackStatus=='0'?'未回调':detailMsg.callbackStatus=='1'?'回调成功':'回调失败'}}</span></p>
                                    <p>审核分数：<span>{{detailMsg.score}}</span></p>
                                    <p>审核结果：<span :style="detailMsg.decision=='D'?'color:red':''">{{detailMsg.decision=="A"?'通过':detailMsg.decision=="D"?'拒件':'待审核'}}</span></p>
                                    <p>审核时间：<span>{{detailMsg.auditTime}}</span></p>
                                    <p>审核明细：<span>{{detailMsg.detail}}</span></p>
                                    <p>资信类型：<span>{{detailMsg.vendorType}}</span></p>
                                    <p>资信token：<span>{{detailMsg.vendorToken}}</span></p>
                                    <!-- <p>模型1评分结果：<span>{{detailMsg.score}}</span></p> -->
                                    <!-- <p>模型2汇总评分：<span>{{detailMsg.score2}}</span></p> -->
                                    <!-- <p>模型3回归模型评分：<span>{{detailMsg.score3}}</span></p> -->
                                </li>

                                <!-- <li class="other" v-if="detailMsg.decision=='D'">
                                    <h4>补充信息</h4>
                                    <div v-for="(item,i) in detailMsg.hitRuleList" :key="i">
                                        <p>拒件码：<span>{{item.decisionCode}}</span></p>
                                        <p>策略码：<span>{{item.ruleNo}}</span></p>
                                        <p>策略名称：<span>{{item.ruleName}}</span></p>
                                        <p>策略公式：<span>{{item.formula}}</span></p>
                                         <p>特征值：<span>{{item.featureValue}}</span></p>
                                         <p>策略类型：<span>{{item.riskRuleType}}</span></p>
                                    </div>
                                </li> -->
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="策略结果" name="second">
                            <el-form :inline="true" :model="resultForm" class="demo-form-inline" ref="resultForm" style="margin-top:10px;text-align:left;margin-left:20px;">
                                <el-form-item label="策略码：">
                                    <el-input v-model="resultForm.ruleNo" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="策略名称：">
                                    <el-input v-model="resultForm.ruleName" placeholder="请输入" clearable ></el-input>
                                </el-form-item>
                                <el-form-item label="规则类别：">
                                    <el-select v-model="resultForm.ruleCategory" clearable placeholder="请选择">
                                        <el-option :label="item.value" :value="item.key" v-for="(item,index) in ruleResult" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="属性：">
                                    <el-input v-model="resultForm.property" placeholder="请输入" clearable ></el-input>
                                </el-form-item>
                                <el-form-item label="规则结果：">
                                    <el-select v-model="resultForm.decisionCode" clearable placeholder="请选择">
                                        <el-option label="通过" value="0"></el-option>
                                        <el-option label="命中" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="search">
                                    <el-button type="primary" @click="detailForm(orderNo)">查询</el-button>
                                    <el-button @click="resetresultForm('modelForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table :data="resultTableData.list" style="width: 100%">
                                <el-table-column prop="ruleNo" label="策略码" width="80">
                                </el-table-column>
                                <el-table-column prop="ruleName" label="策略名称">
                                </el-table-column>
                                 <el-table-column prop="formula" label="公式">
                                </el-table-column>
                                <el-table-column prop="featureValue" label="特征值" width="90">
                                </el-table-column>
                                <el-table-column prop="ruleCategory" label="规则类别" width="80">
                                </el-table-column>
                                <el-table-column prop="property" label="属性值" width="80">
                                </el-table-column>
                                <el-table-column prop="resultValue" label="规则结果" width="80">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.decisionCode" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:red;vertical-align: middle;margin-right:5px;"></span>
                                        <span v-else style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:green;vertical-align: middle;margin-right:5px;"></span>
                                        {{scope.row.decisionCode?"命中":'通过'}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination @size-change="resultSizeChange" @current-change="resultCurrentChange" :current-page="resultForm.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="resultForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="resultTableData.total">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="模型结果" name="third">
                            <el-form :inline="true" :model="modelForm" class="demo-form-inline" ref="modelForm" style="margin-top:10px;">
                                <el-form-item label="模型编号：">
                                    <el-input v-model="modelForm.modelNo" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="模型版本号：">
                                    <el-input v-model="modelForm.modelVersion" placeholder="请输入" clearable ></el-input>
                                </el-form-item>
                                <el-form-item class="search">
                                    <el-button type="primary" @click="modelFormGet(orderNo)">查询</el-button>
                                    <el-button @click="resetModelForm('modelForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                           <el-table :data="modelTableData.list" style="width: 100%">
                                <el-table-column prop="modelNo" label="模型编号"></el-table-column>
                                <el-table-column prop="modelVersion" label="模型版本号">
                                    <template slot-scope="scope">
                                        {{scope.row.modelVersion?"v"+scope.row.modelVersion:scope.row.modelVersion}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="propertyName" label="变量名称"></el-table-column>
                                <el-table-column prop="property" label="变量"></el-table-column>
                                <el-table-column prop="propertyValue" label="变量特征值"></el-table-column>
                                <el-table-column prop="resultValue" label="变量运行结果值"></el-table-column>
                                <el-table-column prop="createTime" label="添加时间" width="180px"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination @size-change="modelSizeChange" @current-change="modelCurrentChange" :current-page="modelForm.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="modelForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="modelTableData.total">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="模型分结果" name="fourth">
                            <el-form :inline="true" :model="scoreForm" class="demo-form-inline" ref="scoreForm" style="margin-top:10px;">
                                <el-form-item label="模型编号：">
                                    <el-input v-model="scoreForm.ruleNo" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="模型版本号：">
                                    <el-input v-model="scoreForm.version" placeholder="请输入" clearable ></el-input>
                                </el-form-item>
                                <el-form-item class="search">
                                    <el-button type="primary" @click="scoreFormGet(orderNo)">查询</el-button>
                                    <el-button @click="resetScoreForm('scoreForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                           <el-table :data="scoreTableData.list" style="width: 100%">
                                <el-table-column prop="ruleNo" label="模型编号"></el-table-column>
                                <el-table-column prop="version" label="模型版本号"></el-table-column>
                                <el-table-column prop="productNo" label="产品编号"></el-table-column>
                                <el-table-column prop="orderNo" label="订单号"></el-table-column>
                                <el-table-column prop="ruleName" label="变量名称"></el-table-column>
                                <el-table-column prop="property" label="变量"></el-table-column>
                                <el-table-column prop="propertyValue" label="变量特征值"></el-table-column>
                                <el-table-column prop="resultValue" label="结果分值"></el-table-column>
                                <el-table-column prop="createTime" label="添加时间" width="180px"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination @size-change="scoreSizeChange" @current-change="scoreCurrentChange" :current-page="scoreForm.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="scoreForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="scoreTableData.total">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="通话记录" name="tenth">
                           <el-table :data="callTableData.list" style="width: 100%">
                                <el-table-column prop="name" label="呼叫人"></el-table-column>
                                <el-table-column prop="mobile" label="呼叫人号码"></el-table-column>
                                <el-table-column prop="status" label="呼叫状态"></el-table-column>
                                <el-table-column prop="duration" label="接通时长"></el-table-column>
                                <el-table-column prop="callTime" label="呼叫时间"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination @size-change="callSizeChange" @current-change="callCurrentChange" :current-page="callForm.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="callForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="callTableData.total">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="app信息" name="fifth">
                           <el-table :data="appTableData.userAppBOS" style="width: 100%">
                                <el-table-column prop="name" label="中文包名"></el-table-column>
                                <el-table-column prop="packageName" label="英文包名"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="通讯录信息" name="sixth">
                           <el-table :data="contactsTableData.userContactsBO" style="width: 100%">
                                <el-table-column prop="name" label="名称"></el-table-column>
                                <el-table-column prop="phone" label="手机号"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="淘宝信息" name="ninth">
                           <ul class="orderDetail">
                                <li>
                                    <h4>基本信息</h4>
                                    <p>订单号：<span>{{taobaoTableData.orderNo}}</span></p> 
                                    <p>昵称 ：<span>{{taobaoTableData.nick}}</span></p>
                                    <p>电话号码：<span>{{taobaoTableData.phoneNumber}}</span></p>
                                    <p>真实姓名：<span>{{taobaoTableData.realName}}</span></p>
                                    <p>淘气值 ：<span>{{taobaoTableData.taoScore}}</span></p>
                                    <p>最早一笔订单交易时间：<span>{{taobaoTableData.firstOrdertime}}</span></p>
                                    <p>交易成功订单总数：<span>{{taobaoTableData.tradeOrderTotal}}</span></p>
                                </li>
                                <li>
                                    <h4>用户淘宝资产信息</h4>
                                    <p>账户余额：<span>{{taobaoTableData.alipayWealthVO.balance}}</span></p> 
                                    <p>花呗当前可用额度：<span>{{taobaoTableData.alipayWealthVO.huabeiCreditamount}}</span></p>
                                    <p>花呗授信额度：<span>{{taobaoTableData.alipayWealthVO.huabeiTotalcreditamount}}</span></p>
                                    <p>余额宝历史累计收益：<span>{{taobaoTableData.alipayWealthVO.totalProfit}}</span></p>
                                    <p>余额宝金额：<span>{{taobaoTableData.alipayWealthVO.totalQuotient}}</span></p>
                                </li>
                                <li>
                                    <h4>最新订单收货信息</h4>
                                </li>
                                <el-table :data="taobaoTableData.taoBaoRecentDeliverAddressList" style="width: 100%">
                                    <el-table-column prop="tradeId" label="订单ID"></el-table-column>
                                    <el-table-column prop="deliverMobilephone" label="收货手机号码"></el-table-column>
                                    <el-table-column prop="deliverName" label="收货姓名"></el-table-column>
                                    <el-table-column prop="tradeCreateTime" label="订单时间"></el-table-column>
                                    <el-table-column prop="deliverAddress" label="详细地址"></el-table-column>
                                    <el-table-column prop="province" label="省"></el-table-column>
                                    <el-table-column prop="city" label="市"></el-table-column>
                                </el-table>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="短信信息" name="eighth">
                           <el-table :data="smsTableData.userSmsBOS" style="width: 100%">
                                <el-table-column prop="sendPhone" label="发送手机号"></el-table-column>
                                <el-table-column prop="content" label="内容"></el-table-column>
                                <el-table-column prop="receiveTime" label="收到时间"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="sim卡信息" name="seventh">
                           <el-table :data="simTableData.orderUserSimCardBOS" style="width: 100%">
                                <el-table-column prop="deviceNum" label="设备编号"></el-table-column>
                                <el-table-column prop="deviceType" label="设备类型"></el-table-column>
                                <el-table-column prop="isPlug" label="是否插卡"></el-table-column>
                                <el-table-column prop="mobile" label="手机号"></el-table-column>
                                <el-table-column prop="operatorName" label="运营商名称"></el-table-column>
                                <el-table-column prop="spn" label="手机码"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-dialog>
        <div class="merchants">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchForm">
                <!-- <el-form-item label="所属产品：" class="line">
                    <el-radio-group v-model="searchForm.productNo" @change="onSubmit">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button v-for="(item,i) in companyList" :label="item.key" :key="i">{{item.value}}</el-radio-button>
                    </el-radio-group> -->
                    <!-- <el-button type="text" @click="isShow=!isShow">{{!isShow?'展开':'收起'}}</el-button> -->
                    <!-- <el-button type="primary" @click="exportData">导出</el-button> -->
                <!-- </el-form-item> -->
                <!-- <template v-if="isShow"> -->
                    <!-- <el-form-item label="审核状态：">
                        <el-select v-model="searchForm.auditStatus" clearable placeholder="请选择">
                            <el-option v-for="(item,i) in statusList" :key="i" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="回调状态：">
                        <el-select v-model="searchForm.callbackStatus" clearable placeholder="请选择">
                            <el-option label="未回调" value="0">
                            </el-option>
                            <el-option label="回调成功" value="1">
                            </el-option>
                            <el-option label="回调失败" value="2">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核结果：">
                        <el-select v-model="searchForm.decision" clearable placeholder="请选择">
                            <el-option label="通过" value="1">
                            </el-option>
                            <el-option label="拒件" value="2">
                            </el-option>
                            <el-option label="待审核" value="3">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新旧户查询：">
                        <el-select v-model="searchForm.customerType" clearable placeholder="请选择">
                            <el-option label="新用户" value="0">
                            </el-option>
                            <el-option label="老用户" value="1">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="订单编号：">
                        <el-input v-model="searchForm.orderNo" placeholder="请输入" clearable style="width:255px;"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="姓名搜索：">
                        <el-input v-model="searchForm.userName" placeholder="请输入" clearable ></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号搜索：">
                        <el-input v-model="searchForm.idCard" placeholder="请输入" clearable ></el-input> -->
                    </el-form-item>
                    <el-form-item label="手机号搜索：">
                        <el-input v-model="searchForm.userPhone" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="第三方流水号搜索：">
                        <el-input v-model="searchForm.serialId" placeholder="请输入" clearable></el-input>
                    </el-form-item> -->
                    <el-form-item label="渠道名称搜索：">
                        <el-input v-model="searchForm.channelName" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="产品编号搜索：">
                        <el-input v-model="searchForm.productNo" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="审核日期：">
                        <el-date-picker v-model="mydate" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        <el-date-picker v-model="createDate" clearable type="daterange" align="right" unlink-panels value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item class="search">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                <!-- </template> -->
            </el-form>
        </div>
        <div class="order-table">
            <el-table :data="productList.list" style="width: 100%" @sort-change="loanAmountFun">
                <el-table-column prop="orderNo" label="订单编号" width="220" ></el-table-column>
                <el-table-column prop="productName" label="产品名称" width="85"></el-table-column>
                <el-table-column prop="channelName" label="渠道名称" width="80"></el-table-column>
                <el-table-column prop="productNo" label="产品编号"></el-table-column>
                <el-table-column prop="customerType" label="新旧户"  width="70">
                    <template slot-scope="scope">
                        {{scope.row.customerType==1?'老用户':'新用户'}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="70"></el-table-column>
                <el-table-column prop="idCard" label="身份证号" width="165"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
                <el-table-column prop="applAmount" label="借款金额" width="80"></el-table-column>
                <el-table-column prop="statusName" label="审核状态" width="80">
                    <template slot-scope="scope">
                        <span :style="scope.row.status!=6?'color:#aaa':''">{{scope.row.statusName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="callBackStatusName" label="回调状态" width="80">
                    <template slot-scope="scope">
                        <span :style="scope.row.callbackStatus!=1?'color:#aaa':''">{{scope.row.callBackStatusName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="decision" label="审核结果" sortable width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.decision=='A'" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:green;vertical-align: middle;margin-right:5px;"></span>
                        <span v-if="scope.row.decision=='D'" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:red;vertical-align: middle;margin-right:5px;"></span>
                        <span v-if="scope.row.decision!='A'&&scope.row.decision!='D'" style="display:inline-block;width:5px;height:5px;border-radius:50%;background-color:orange;vertical-align: middle;margin-right:5px;"></span> {{scope.row.decision=='A'?"通过":scope.row.decision=='D'?'拒件':'待审核'}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
                <el-table-column prop="auditTime" label="审核时间" sortable width="150"></el-table-column>
                <el-table-column fixed="right" label="操作" width="60">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="detail(scope.row)"> 详情 </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.currentPage" :page-sizes="[100, 200, 300]" :page-size="searchForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="productList.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import ApiProduct from '@/api/product'
    import ApiOrder from '@/api/order'
    import {
        openUrl
    } from '@/utils/index'
    export default {
        data() {
            return {
                isShow: false,
                dialogFormVisible: false,
                detailMsg: {},
                mydate:[],
                createDate:[],
                activeName: 'first',
                searchForm: {
                    currentPage: 1,
                    pageSize: 100,
                },
                searchFormReset: {
                    currentPage: 1,
                    pageSize: 100
                },
                statusList: [],
                productList: [],
                companyList: [],
                ruleResult:[],
                orderNo:"",
                //详情策略运行表单
                resultTableData:[],
                resultForm:{
                    currentPage: 1,
                    pageSize: 10,
                },
                //详情模型运行表单
                modelTableData:[],
                modelForm:{
                    currentPage: 1,
                    pageSize: 10,
                },
                //详情分模型运行表单
                scoreTableData:[],
                scoreForm:{
                    currentPage: 1,
                    pageSize: 10,
                },
                // app信息
                appTableData:[],
                //通讯录信息
                contactsTableData:[],
                //sim信息
                simTableData:[],
                //短信信息
                smsTableData:[],
                //淘宝信息
                taobaoTableData:{
                   taoBaoRecentDeliverAddressList:[],
                   alipayWealthVO:{}
                },
                //通话记录
                callTableData:[],
                callForm:{
                    currentPage: 1,
                    pageSize: 10,
                },
            }
        },
        created() {
            this.selectAllProduct()
            ApiProduct.apiTreeList('tree_list').then(res => {
                this.companyList = res.data
            })
            ApiOrder.apiRuleResultCategory('rule_result_category/tree').then(res => {
                this.ruleResult = res.data
            })
            // this.init()
        },
        methods: {
            //借款金额排序
            loanAmountFun(msg){
                if(msg.prop=='decision'){
                    msg.order=='ascending'?this.searchForm.decisionSort=1:this.searchForm.decisionSort=0
                }else if(msg.prop=='auditTime'){
                    msg.order=='ascending'?this.searchForm.auditTimeSort=1:this.searchForm.auditTimeSort=0
                }
                 this.init()
            },
            //获取产品列表
            init() {
                console.log(this.searchForm)
                ApiOrder.apiList('list', this.searchForm).then(res => {
                    this.productList = res.data
                    this.productList.list.map((item, i) => {
                        for (let key in item) {
                            item[key] = item[key] ? item[key] : '--'
                        }
                    })
                })
            },
            //获取审核状态列表
            selectAllProduct() {
                ApiOrder.apiTree('audit_status/tree').then(res => {
                    this.statusList = res.data
                })
            },
            //导出
            exportData() {
                openUrl('order/export_excel', this.searchForm)
            },
            //查询
            onSubmit() {
               this.searchForm.currentPage=1
                // if (this.mydate) {
                //     this.searchForm.auditCreateBeginTime = this.mydate[0]
                //     this.searchForm.auditCreateEndTime = this.mydate[1]
                // }else{
                //     this.searchForm.auditCreateBeginTime = ''
                //     this.searchForm.auditCreateEndTime = ''
                // }
                // if (this.createDate) {
                //     this.searchForm.orderCreateBeginTime = this.createDate[0]
                //     this.searchForm.orderCreateEndTime = this.createDate[1]
                // }else{
                //     this.searchForm.orderCreateBeginTime = ''
                //     this.searchForm.orderCreateEndTime = ''
                // }
                for (let key in this.searchForm) {
                    if (this.searchForm[key] == ""&&key!='productNo') {
                        delete this.searchForm[key];
                    }
                }
                this.init()
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                // this.mydate=[];
                // this.createDate=[];
                this.searchForm = JSON.parse(JSON.stringify(this.searchFormReset));
                this.init()
            },
            resetModelForm(){
                this.modelForm = {
                    currentPage: 1,
                    pageSize: 10,
                },
                this.modelFormGet(this.orderNo)
            },
            resetScoreForm(){
                this.scoreForm = {
                    currentPage: 1,
                    pageSize: 10,
                },
                this.scoreFormGet(this.orderNo)
            },
            resetresultForm(){
                this.resultForm = {
                    currentPage: 1,
                    pageSize: 10,
                },
                this.detailForm(this.orderNo)
            },
            //查看详情
            detail(row) {
                this.dialogFormVisible = true
                this.detailForm(row.orderNo)
                this.modelFormGet(row.orderNo)
                this.scoreFormGet(row.orderNo)
                this.callFormGet(row.orderNo)
                this.appFormGet(row.orderNo)
                this.contactsFormGet(row.orderNo)
                this.simFormGet(row.orderNo)
                this.smsFormGet(row.orderNo)
                this.taobaoFormGet(row.orderNo)
                this.orderNo = row.orderNo
                ApiOrder.apiOrderNo('queryOrder', row.orderNo).then(res => {
                    this.detailMsg = res.data
                    this.detailMsg.status=this.statusFun(this.detailMsg.status)
                    for(let key in this.detailMsg){
                        if(key!='decision'){
                            this.detailMsg[key]=this.detailMsg[key]!=null?this.detailMsg[key]:'--'
                        }
                    }
                })
            },
            detailForm(orderNo){
                this.resultForm.orderNo = orderNo
                ApiOrder.apiResult('queryRuleResult', this.resultForm).then(res => {
                    this.resultTableData = res.data
                    this.resultTableData.list.map(item =>{
                        switch (item.ruleCategory) {
                            case 0:
                                item.ruleCategory = '准入规则'
                                break
                            case 1:
                                item.ruleCategory = '新用户审核规则'
                                break
                            case 2:
                                item.ruleCategory = '老用户审核规则'
                                break
                            case 5:
                                item.ruleCategory = '提额规则'
                                break
                            case 6:
                                item.ruleCategory = '降额规则'
                                break
                            default:
                        }
                    })
                })
            },
            modelFormGet(orderNo){
                this.modelForm.orderNo = orderNo
                ApiOrder.apiModel('queryModelResult', this.modelForm).then(res => {
                    this.modelTableData = res.data
                })
            },
            scoreFormGet(orderNo){
                this.scoreForm.orderNo = orderNo
                ApiOrder.apiModelScore('queryModelScoreResult', this.scoreForm).then(res => {
                    this.scoreTableData = res.data
                })
            },
            callFormGet(orderNo){
                this.callForm.orderNo = orderNo
                ApiOrder.apiOrderCall('queryOrderCalls', this.callForm).then(res => {
                    this.callTableData = res.data.orderUserCallRecordBOS
                })
            },
            appFormGet(orderNo){
                ApiOrder.apiOrderApps('queryOrderApps', orderNo).then(res => {
                    this.appTableData = res.data
                })
            },
            contactsFormGet(orderNo){
                ApiOrder.apiOrderContacts('queryOrderContacts', orderNo).then(res => {
                    this.contactsTableData = res.data
                })
            },
            simFormGet(orderNo){
                ApiOrder.apiOrderSims('queryOrderSims', orderNo).then(res => {
                    this.simTableData = res.data
                    this.simTableData.orderUserSimCardBOS.map(item =>{
                        item.isPlug = item.isPlug=='undefined'?'无':item.isPlug=='1'?'是':'否'
                        item.deviceType = item.deviceType=='undefined'?'无':item.deviceType=='1'?'安卓':'ios'
                    })
                })
            },
            smsFormGet(orderNo){
                ApiOrder.apiOrderSms('queryOrderSms', orderNo).then(res => {
                    this.smsTableData = res.data
                })
            },
            taobaoFormGet(orderNo){
                ApiOrder.apiOrderTaoBaoUserInfo('queryOrderTaoBaoUserinfo', orderNo).then(res => {
                    this.taobaoTableData = res.data;
                    this.taobaoTableData.alipayWealthVO = this.taobaoTableData.alipayWealthVO==null?{}:this.taobaoTableData.alipayWealthVO;
                })
            },
            //改变每页数据数量
            handleSizeChange(val) {
                this.searchForm.pageSize = val;
                this.init()
            },
            resultSizeChange(val) {
                this.resultForm.pageSize = val;
                this.detailForm(this.orderNo)
            },
            modelSizeChange(val) {
                this.modelForm.pageSize = val;
                this.modelFormGet(this.orderNo)
            },
            scoreSizeChange(val) {
                this.scoreForm.pageSize = val;
                this.scoreFormGet(this.orderNo)
            },
            callSizeChange(val) {
                this.callForm.pageSize = val;
                this.callFormGet(this.orderNo)
            },
            //改变当前页码
            handleCurrentChange(val) {
                this.searchForm.currentPage = val;
                this.init()
            },
            resultCurrentChange(val) {
                this.resultForm.currentPage = val;
                this.detailForm(this.orderNo)
            },
            modelCurrentChange(val) {
                this.modelForm.currentPage = val;
                this.modelFormGet(this.orderNo)
            },
            scoreCurrentChange(val) {
                this.scoreForm.currentPage = val;
                this.scoreFormGet(this.orderNo)
            },
            callCurrentChange(val) {
                this.callForm.currentPage = val;
                this.callFormGet(this.orderNo)
            },
            handleClick() {},
            handleClose() {
                this.dialogFormVisible = false;
                this.activeName = 'first'   
                this.resultForm = {
                    'currentPage': 1,
                    'pageSize': 10,
                };
                this.modelForm = {
                    'currentPage': 1,
                    'pageSize': 10,
                };
            },
            statusFun(status) {
                switch (status) {
                    case 0:
                        return '新建订单'
                        break
                    case 1:
                        return '准入验证'
                        break
                    case 2:
                        return '资信数据查询'
                        break
                    case 3:
                        return '评分模型'
                        break
                    case 4:
                        return '特征提取'
                        break
                    case 5:
                        return '策略验证'
                        break
                    case 6:
                        return '审核完成'
                        break
                    default:
                }
            }
        }
    }
</script>
<style lang="scss">
    .dialogBoxs {
        background: #F0F2F5;
        p{
            margin:14px 0;
        }
        h3,h4,h2{
            margin:18px 0;
        }
        .el-dialog {
            min-width: 800px;
            max-width:1000px;
            max-height:100%;
            margin-top:5vh !important;

            overflow:scroll;
            .el-dialog__header {
                font-weight: 700;
            }
        }
        .merchants {
        background: #fff;
        border-radius: 5px;
        padding: 20px 40px;
        padding-bottom: 0px; //margin-bottom:15px;
        .line {
          width: 100%;
            border-bottom: 1px dashed #ccc;
            padding-bottom: 20px;
            .el-radio-button__inner{
                border:none;
                margin-right:20px;
                padding:8px 10px;
                border-radius:4px;
            }
        }
    }
    }
    .order-table{
        background:#fff;
        padding:20px 40px;
        .el-table th,.el-table td{
            text-align:center !important;
        }

    }
    .orderContain {
        .el-dialog__body {
            background: #F0F2F5;
            padding: 0;
        }
        .header {
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            text-align: left;
            padding: 0px 10px 0 20px;
            h2 {
                width: 100%;
                color: #000;
                font-size: 20px;
                display: flex;
                align-items: center;
                img {
                    width: 30px;
                    margin-right: 10px
                }
            }
            div {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding-left: 40px;
                p {
                    color: #000;
                }
                span {
                    color: #666;
                    margin-bottom: 20px;
                }
                strong {
                    color: #000;
                    font-size: 22px;
                }
            }
            div:last-child {
                text-align: right;
                padding-right: 40px;
                padding-left: 0;
            }
        }
    }
    .orderBox {
        .el-table th,.el-table td{
            text-align:center !important;
        }
        .el-tabs__content {
            margin-top: 10px;
            background: #fff;
            width: 95%;
            margin: 0 auto;
            padding-bottom:20px;
        }
        .el-tabs__nav-wrap.is-top {
            background: #fff;
            padding-left: 40px;
        }
        .orderDetail {
            padding: 0 20px;
            li.other>p {
                padding: 0 10px;
            }
            li.other {
                border: 1px solid #E9E9E9;
                h4 {
                    background: #FAFAFA;
                    padding: 10px;
                    margin: 0;
                }
                div {
                    display: flex;
                    flex-wrap: wrap;
                    text-align: left;
                    border-bottom: 1px solid #E9E9E9;
                    margin-right: 10px;
                    padding: 0 10px;
                    width:100%;
                }
            }
            li {
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                text-align: left;
                h4 {
                    width: 100%;
                    color: #000;
                }
                p {
                    width: 50%;
                    color: #000;
                    span {
                        color: #666;
                    }
                }
            }
        }
    }
</style>
