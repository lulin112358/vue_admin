<template>
    <vxe-table
            border
            column-key
            resizable
            highlight-hover-row
            :height="tableHeight"
            ref="xTable"
            class="sortable-column-demo"
            :edit-config="{trigger: 'dblclick', mode: 'cell'}"
            :data="tableData">
        <vxe-table-column v-for="(item, index) in tableColumn" :width="item.minWidth" :key="index" :field="item.field" :title="item.title" :edit-render="item.render"></vxe-table-column>
    </vxe-table>
</template>

<script>
    import Sortable from 'sortablejs'
    export default {
        name: "order",
        data() {
            return {
                tableHeight: 0,
                tableColumn: [
                    { field: 'name', title: 'Name', fixed: 'left', minWidth: 200, render: {name: '$input', attrs: {type: 'text'}} },
                    { field: 'role', title: 'Role', minWidth: 220, render: {name: '$input', attrs: {type: 'text'}} },
                    { field: 'sex', title: 'Sex', minWidth: 100, render: {name: '$select', options: [{label: '男', value: '1'}, {label: '女', value: '2'}], optionProps: {value: 'value', label: 'label'}} },
                    { field: 'age', title: 'Age', minWidth: 150, render: {name: '$input', attrs: {type: 'number'}} },
                    { field: 'date3', title: 'Date', minWidth: 200 },
                    { field: 'address', title: 'Address', minWidth: 200, render: {name: '$input', attrs: {type: 'text'}} },
                ],
                tableData: []
            }
        },
        mounted() {
            this.tableHeight = window.innerHeight - 90;
        },
        created() {
            this.columnDrop()
        },
        beforeDestroy () {
            if (this.sortable) {
                this.sortable.destroy()
            }
        },
        methods: {
            columnDrop () {
                this.$nextTick(() => {
                    let xTable = this.$refs.xTable
                    this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
                        handle: '.vxe-header--column',
                        onEnd: ({ newIndex, oldIndex }) => {
                            let { fullColumn, tableColumn } = xTable.getTableColumn()
                            let oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
                            let newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
                            let currRow = fullColumn.splice(oldColumnIndex, 1)[0]
                            fullColumn.splice(newColumnIndex, 0, currRow)
                            xTable.loadColumn(fullColumn)
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
    .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
        background-color: #dfecfb;
    }
    .sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
        cursor: no-drop;
    }
</style>