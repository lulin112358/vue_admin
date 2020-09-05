<template>
    <div id="container">
        <!-- 添加按钮-->
        <el-button type="primary" class="add" @click="dialogFormVisible = true">添加</el-button>
        <!-- 弹窗-->
        <el-dialog :title="modalTitle" :visible.sync="dialogFormVisible" @close="modalClose">
            <el-form :model="param" :rules="rules" ref="ruleForm">

                <el-form-item label="角色名称" :label-width="formLabelWidth" prop="role_name">
                    <el-input class="_input" v-model="param.role_name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
                    <el-input class="_input" v-model="param.note" autocomplete="off"></el-input>
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
                <el-button type="primary" v-if="param.role_id===0" @click="submit('ruleForm')">添 加</el-button>
                <el-button type="primary" v-else @click="submit('ruleForm')">更 新</el-button>
            </div>
        </el-dialog>


        <!-- 弹窗-->
        <el-dialog title="分配权限" :visible.sync="authDialog">
            <el-form ref="authForm">

                <el-tree
                        :data="menu"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps"
                ></el-tree>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmAuth('authForm')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 表格-->
        <vxe-table
                border="inner"
                :data="tableData">
            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="role_name" title="角色名称"></vxe-table-column>
            <vxe-table-column field="note" title="备注"></vxe-table-column>
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
                    <el-button type="primary" size="small" @click="auth(scope.row.id)">分配权限</el-button>
                    <el-button type="primary" size="small" @click="updateRole(scope.row.id)">编辑</el-button>

                    <el-popconfirm
                            title="确定删除吗？"
                            @onConfirm="delRole(scope.row.id)"
                    >
                        <el-button slot="reference" size="small" type="danger">删除</el-button>
                    </el-popconfirm>
                </template>
            </vxe-table-column>
        </vxe-table>
    </div>
</template>

<script>
    import {addRole, updateRole, allRole, getRole, delRole, updateRoleData, assignAuth, roleAuth} from "../../api/role";
    import {menuTree} from "../../api/menu";
    import {messages} from "../../assets/js/common";

    export default {
        name: "role",
        data() {
            return {
                defaultProps: {
                    children: "children",
                    label: "name"
                },
                menu: [],                       // 菜单
                tableData: [],                  //列表数据
                param: {                        //表单数据
                    status: false,
                    role_id: 0
                },
                rules: {                        // 表单验证规则
                    role_name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'}
                    ],
                },
                dialogFormVisible: false,       // 模态框是否显示
                authDialog: false,              // 权限分配模态框
                modalTitle: '添加角色',     // 模态框标题
                role_id: 0,                 // 分配权限的角色id
                formLabelWidth: '120px'         // 表单label宽度
            }
        },
        created() {
            this.allMenu()
            this.allRole()
        },
        methods: {
            // 表单提交
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.param.role_id === 0) {
                            // 添加菜单
                            addRole(this.param).then(res => {
                                if (res.code === 1) {
                                    // 添加成功刷新列表并关闭模态框
                                    this.allRole()
                                    this.dialogFormVisible = false
                                }
                            }).catch(err => {
                                this.$message("error", err.msg)
                            })
                            return false
                        }
                        // 更新菜单
                        updateRole(this.param).then(res => {
                            if (res.code === 1) {
                                // 添加成功刷新列表并关闭模态框
                                this.allRole()
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

            // 获取所有角色
            allRole() {
                allRole().then(res => {
                    this.tableData = res.data
                    // 调整switch开关显示
                    this.tableData.forEach((item, index) => {
                        item.status = item.status !== 0
                    })
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },

            // 更新角色模态框
            updateRole(role_id) {
                // 更新模态框标题
                this.modalTitle = "更新角色"
                // 标记更新的role_id
                this.param.menu_id = role_id
                // 获取单个角色信息
                getRole({id: role_id}).then(res => {
                    res.data.status = res.data.status !== 0
                    this.param = res.data
                }).catch(err => {
                    this.$message("error", err.msg)
                })
                this.dialogFormVisible = true
            },

            // 删除角色
            delRole(role_id) {
                delRole({id: role_id}).then(res => {
                    if (res.code === 1) {
                        // 删除成功刷新列表
                        this.allRole()
                    }
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },
            // 更新显示状态
            updateStatus(role_id, status) {
                status = status?1:0
                updateRoleData({id: role_id, status}).then(res => {}).catch(err => {
                    this.$message("error", err.msg)
                })
            },

            // 模态框关闭回调
            modalClose() {
                // 去除更新标记
                this.modalTitle = "添加角色"
                this.param = {status: false, role_id: 0}
            },

            // 获取所有菜单
            allMenu() {
                menuTree().then(res => {
                    this.menu = res.data
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },

            // 分配权限弹框
            auth(role_id) {
                roleAuth({role_id}).then(res => {
                    this.$refs.tree.setCheckedKeys(res.data);
                }).catch(err => {
                    this.$message("error", err.msg)
                })
                this.role_id = role_id
                this.authDialog = true
            },

            // 确认分配
            confirmAuth() {
                let role_id = this.role_id
                let rule_id = this.$refs.tree.getCheckedKeys()
                assignAuth({role_id, rule_id}).then(res => {
                    if (res.code === 1) {
                        this.authDialog = false
                    }
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            }
        }
    }
</script>

<style scoped>

</style>