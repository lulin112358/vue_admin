<template>
    <div id="container">
        <!-- 添加按钮-->
        <el-button type="primary" class="add" @click="dialogFormVisible = true">添加</el-button>
        <!-- 弹窗-->
        <el-dialog :title="modalTitle" :visible.sync="dialogFormVisible" @close="modalClose">
            <el-form :model="param" :rules="rules" ref="ruleForm">
                <el-form-item label="所属父级" :label-width="formLabelWidth">
                    <el-select
                        v-model="param.pid"
                    >
                        <el-option v-for="(item, index) in tableData" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="icon" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="1"><el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/icon' target="_blank">查看</el-link></el-col>
                        <el-col :span="23"><el-input class="_input" v-model="param.icon" autocomplete="off"></el-input></el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="标题" :label-width="formLabelWidth" prop="name">
                    <el-input class="_input" v-model="param.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="路径" :label-width="formLabelWidth" prop="path">
                    <el-input class="_input" v-model="param.path" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input class="_input" v-model="param.sort" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-switch
                            v-model="param.is_show"
                            active-text="显示"
                            inactive-text="不显示">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="param.menu_id===0" @click="submit('ruleForm')">添 加</el-button>
                <el-button type="primary" v-else @click="submit('ruleForm')">更 新</el-button>
            </div>
        </el-dialog>
        <!-- 表格-->
        <vxe-table
                border="inner"
                :data="tableData">
            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="icon" title="icon"><template slot-scope="scope"><i :class="scope.row.icon"></i></template></vxe-table-column>
            <vxe-table-column field="name" title="标题"></vxe-table-column>
            <vxe-table-column field="path" title="路径"></vxe-table-column>
            <vxe-table-column field="sort" title="排序">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.sort" @change="updateSort(scope.row)"></el-input>
                </template>
            </vxe-table-column>
            <vxe-table-column field="is_show" title="是否显示">
                <template slot-scope="scope">
                    <el-switch
                            style="margin-left: 0"
                            v-model="scope.row.is_show"
                            active-color="#13ce66"
                            @change="updateShow(scope.row.id, scope.row.is_show)"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </vxe-table-column>
            <vxe-table-column title="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="updateMenu(scope.row.id)">编辑</el-button>

                    <el-popconfirm
                            title="确定删除吗？"
                            @onConfirm="delMenu(scope.row.id)"
                    >
                        <el-button slot="reference" size="small" type="danger">删除</el-button>
                    </el-popconfirm>
                </template>
            </vxe-table-column>
        </vxe-table>
    </div>
</template>

<script>
    import Treeselect from "@riophae/vue-treeselect";
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";
    import {addMenu, allMenu, delMenu, updateMenu, getMenu, updateData} from "../../api/menu";
    import {messages} from "../../assets/js/common";
    export default {
        components: {Treeselect},
        name: "menu",
        data() {
            return {
                modalTitle: "添加菜单",           // 模态框标题
                tableData: [],                  // 表格数据
                rules: {                        // 表单验证规则
                    name: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    path: [
                        {required: true, message: '请输入路径', trigger: 'blur'}
                    ],
                },
                dialogFormVisible: false,       // 弹窗
                param: {                        //表单数据
                    is_show: true,
                    menu_id: 0
                },
                formLabelWidth: '120px'         // 表单label宽度
            }
        },
        created() {
            this.allMenu()
        },
        methods: {
            // 表单提交
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.param.menu_id === 0) {
                            // 添加菜单
                            addMenu(this.param).then(res => {
                                if (res.code === 1) {
                                    // 添加成功刷新列表并关闭模态框
                                    this.allMenu()
                                    this.dialogFormVisible = false
                                }
                            }).catch(err => {
                                this.$message("error", err.msg)
                            })
                            return false
                        }
                        // 更新菜单
                        updateMenu(this.param).then(res => {
                            if (res.code === 1) {
                                // 添加成功刷新列表并关闭模态框
                                this.allMenu()
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
            // 获取所有菜单
            allMenu() {
                allMenu().then(res => {
                    this.tableData = res.data
                    // 调整switch开关显示
                    this.tableData.forEach((item, index) => {
                        item.is_show = item.is_show !== 0
                    })
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },
            // 更新菜单模态框
            updateMenu(menu_id) {
                // 更新模态框标题
                this.modalTitle = "更新菜单"
                // 标记更新的menu_id
                this.param.menu_id = menu_id
                // 获取单个菜单信息
                getMenu({id: menu_id}).then(res => {
                    res.data.is_show = res.data.is_show !== 0
                    this.param = res.data
                }).catch(err => {
                    this.$message("error", err.msg)
                })
                this.dialogFormVisible = true
            },
            // 删除菜单
            delMenu(menu_id) {
                delMenu({id: menu_id}).then(res => {
                    if (res.code === 1) {
                        // 删除成功刷新列表
                        this.allMenu()
                    }
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },
            // 更新显示状态
            updateShow(menu_id, is_show) {
                is_show = is_show?1:0
                updateData({id: menu_id, is_show}).then(res => {}).catch(err => {
                    this.$message("error", err.msg)
                })
            },
            // 更新排序
            updateSort(row) {
                let data = {id: row.id, sort: row.sort}
                updateData(data).then(res => {
                    if (res.code !== 1) {
                        this.allMenu()
                    }
                }).catch(err => {
                    this.$message("error", err.msg)
                })
            },
            // 模态框关闭回调
            modalClose() {
                // 去除更新标记
                this.modalTitle = "添加菜单"
                this.param = {is_show: true, menu_id: 0}
            }
        }
    }
</script>

<style scoped>
    .el-switch{
        margin-left: 80px;
    }
    .el-select{
        width: 100%;
    }
    .el-button--danger {
        margin-left: 5px;
    }
</style>