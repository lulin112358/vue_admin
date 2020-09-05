//全部菜单
export const menu = [
  {
    icon: "el-icon-news",
    index: "home",
    title: "客服订单管理"
  },
  {
    icon: "el-icon-edit",
    index: "icon",
    title: "图标",
    subs: [
      {
        index: "element",
        title: "element"
      },
      {
        index: "iconfont",
        title: "iconfont"
      }
    ]
  },
  {
    icon: "el-icon-setting",
    index: "component",
    title: "组件",
    subs: [
      {
        index: "editor",
        title: "editor"
      },
      {
        index: "countTo",
        title: "countTo"
      },
      {
        index: "trees",
        title: "trees",
        icon: "el-icon-share",
        subs: [
          {
            index: "customTree",
            title: "customTree"
          },
          {
            index: "treeSelect",
            title: "treeSelect"
          }
        ]
      }
    ]
  },
  {
    icon: "el-icon-rank",
    index: "draggable",
    title: "拖拽排序",
    subs: [
      {
        index: "draglist",
        title: "draglist"
      },
      {
        index: "dragtable",
        title: "dragtable"
      }
    ]
  },
  {
    icon: "el-icon-document",
    index: "charts",
    title: "图表",
    subs: [
      {
        index: "cricle",
        title: "cricle"
      }
    ]
  },
  {
    icon: "el-icon-folder",
    index: "formDesign",
    title: "拖拽表格"
  },
  {
    icon: "el-icon-question",
    index: "permission",
    title: "权限",
    subs: [
      {
        index: "permissionMenu",
        title: "permissionMenu",
        meta: {
          roles: ["admin"]
        }
      },
      {
        index: "permissionBtn",
        title: "permissionBtn"
      }
    ]
  },
  {
    icon: "el-icon-warning",
    index: "error",
    title: "404",
    subs: [
      {
        index: "404",
        title: "404"
      }
    ]
  },
  {
    icon: "el-icon-setting",
    index: "setting",
    title: "系统设置",
    subs: [
      {
        index: "menu",
        title: "菜单管理"
      },
      {
        index: "role",
        title: "角色管理"
      },
      {
        index: "user",
        title: "用户管理"
      }
    ]
  },
];
