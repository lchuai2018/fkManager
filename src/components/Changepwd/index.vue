<template>
        <el-dialog :visible.sync="dialogFormVisible" width="600px" label-position="left" title="修改密码" :show-close="false" :close-on-click-modal="false" >
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="password">
    <el-input type="password" v-model="ruleForm2.password"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="newPassword">
    <el-input type="password" v-model="ruleForm2.newPassword" placeholder="6~10位，数字、字母、特殊符号中任意两种的组合"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="confirmPassword">
    <el-input type="password" v-model="ruleForm2.confirmPassword" placeholder="6~10位，数字、字母、特殊符号中任意两种的组合"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">确认</el-button>
    <el-button @click="resetForm('ruleForm2')">取消</el-button>
  </el-form-item>
</el-form>
 <!-- <p style="color:red;font-size:12px;padding:0;margin:0;line-height:20px">登录密码均必须为6~10位，且为数字、字母、特殊符号中任意两种的组合</p> -->
</el-dialog>
</template>
<script>
import ApiUser from "../../api/user";
import { code } from "@/utils/index";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.confirmPassword !== "") {
          this.$refs.ruleForm2.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        confirmPassword: "",
        newPassword: "",
        password: ""
      },
      rules2: {
        password: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  props: ["dialogFormVisible"],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            confirmPassword: "",
            newPassword: "",
            password: ""
          };
          for (let key in this.ruleForm2) {
            obj[key] = code(this.ruleForm2[key]);
          }
          ApiUser.apiPassword(obj, "password").then(res => {
            this.$message({
              message: "修改密码成功",
              type: "success"
            });
            this.$emit("submit");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$emit("colse");
    }
  }
};
</script>
