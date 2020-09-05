<template>
    <div id="container">
        <!-- 添加按钮-->
        <el-button type="primary" class="add" @click="addDialogFormVisible">添加</el-button>
        <!-- 弹窗-->
        <el-dialog :title="modalTitle" :visible.sync="dialogFormVisible" @close="modalClose">
            <el-form :model="param" :rules="rules" ref="ruleForm">

                <el-form-item label="账户名称" :label-width="formLabelWidth" prop="user_name">
                    <el-input class="_input" v-model="param.user_name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input class="_input" v-model="param.password" autocomplete="off" placeholder="默认密码:123456"></el-input>
                </el-form-item>

                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select
                            v-model="param.role_id"
                            multiple
                            placeholder="请选择角色"
                    >
                        <el-option v-for="(item, index) in role" :key="index" :label="item.role_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
                    <el-input class="_input" v-model="param.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-switch
                            v-model="param.status"
                            active-text="开启"
                            inactive-text="关闭">
                    </el-switch>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="param.user_id === 0" @click="submit('ruleForm')">添 加</el-button>
                <el-button type="primary" v-else @click="submit('ruleForm')">更 新</el-button>
            </div>
        </el-dialog>
        <!-- 表格-->
        <vxe-table
                border="inner"
                :data="tableData">
            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="user_name" title="账号名称"></vxe-table-column>
            <vxe-table-column field="name" title="真实姓名"></vxe-table-column>
            <vxe-table-column field="roles" title="角色"></vxe-table-column>
            <vxe-table-column field="status" title="状态">
                <template slot-scope="scope">
                    <el-switch
                            style="margin-left: 0"
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            @change="updateStatus(scope.row.id, scope.row.status)"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </vxe-table-column>
            <vxe-table-column field="create_time" title="创建时间"></vxe-table-column>
            <vxe-table-column field="update_time" title="更新时间"></vxe-table-column>
            <vxe-table-column title="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="updateUser(scope.row.id)">编辑</el-button>

                    <el-popconfirm
                            title="确定删除吗？"
                            @onConfirm="delUser(scope.row.id)"
                    >
                        <el-button slot="reference" size="small" type="danger">删除</el-button>
                    </el-popconfirm>
                </template>
            </vxe-table-column>
        </vxe-table>
    </div>
</template>

<script>
    import {allRole} from "../../api/role";
    import {addUser, allUser, delUser, getUser, updateUser, updateUserData} from "../../api/user";
    import {messages} from "../../assets/js/common";

    export default {
        name: "user",
        data() {
            return {
                role: [],                       // 角色列表
                tableData: [],                  //列表数据
                param: {                        //表单数据
                    status: false,
                    role_id: [],
                    user_id: 0,
                },
                rules: {                        // 表单验证规则
                    user_name: [
                        {required: true, message: '请输入账户名称', trigger: 'blur'}
                    ],
                    role_id: [
                        {required: true, message: '请选择角色', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'}
                    ],
                },
                dialogFormVisible: false,       // 模态框是否显示、
                modalTitle: '添加用户',     // 模态框标题
                formLabelWidth: '120px'         // 表单label宽度
            }
        },
        created() {
            this.allUser()
            this.allRole()
        },
        methods: {
            addDialogFormVisible() {
                this.dialogFormVisible = true
            },
            // 表单提交
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.param.user_id === 0) {
                            // 添加用户
                            addUser(this.param).then(res => {
                                if (res.code === 1) {
                                    // 添加成功刷新列表并关闭模态框
                                    this.allUser()
                                    this.dialogFormVisible = false
                                }
                            }).catch(err => {
                                this.$message("error", err.msg)
                            })
                            return false
                        }
                        // 更新用户
                        updateUser(this.param).then(res => {
                            if (res.code === 1) {
                                // 添加成功刷新列表并关闭模态框
                                this.allUser()
                                this.dialogFormVisible = false
                            }
                        }).catch(err => {
                            this.$message("error", err.msg)
                        })
                        return false
                    }
                    // 提交错误
                    messages("error", "请填写完整")
                });
            },

            // 获取所有用户
            allUser() {
                allUser().then(res => {
                    this.tableData = res.data
                    // 调整switch开关显示
                    this.tableData.forEach((item, index) => {
                        item.status = item.status !== 0
                    })
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },

            // 获取所有角色
            allRole() {
                allRole().then(res => {
                    this.role = res.data
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },

            // 更新角色模态框
            updateUser(user_id) {
                // 更新模态框标题
                this.modalTitle = "更新用户"
                // 获取单个角色信息
                getUser({user_id: user_id}).then(res => {
                    let role_id = []
                    res.data.status = res.data.status !== 0
                    this.param = res.data
                    res.data.roles.forEach((item, index) => {
                        role_id.push(item.id)
                    })
                    this.$set(this.param, 'role_id', role_id)
                    // 标记更新的user_id
                    this.param.user_id = user_id
                }).catch(err => {
                    this.$message("error", err.msg)
                })
                this.dialogFormVisible = true
            },

            // 删除角色
            delUser(user_id) {
                delUser({user_id: user_id}).then(res => {
                    if (res.code === 1) {
                        // 删除成功刷新列表
                        this.allUser()
                    }
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },
            // 更新显示状态
            updateStatus(user_id, status) {
                status = status?1:0
                updateUserData({id: user_id, status}).then(res => {}).catch(err => {
                    this.$message("error", err.msg)
                })
            },

            // 模态框关闭回调
            modalClose() {
                // 去除更新标记
                this.modalTitle = "添加用户"
                this.param = {status: false, user_id: 0}
                this.$refs["ruleForm"].resetFields()
            },
        }
    }
</script>

<style scoped>

</style>