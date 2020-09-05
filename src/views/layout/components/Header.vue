<template>
  <div class="header-right">
    <div class="header-user-con">
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          {{username }}<i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/home">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import showAside from "./showAside";
import selectLang from './selectLang'
import breadcrumb from './Breadcrumb'
export default {
  // name:'header',
  components: {
    showAside,
    selectLang,
    breadcrumb
  },
  data() {
    return {
      fullscreen: false,
      name: "linxin",
      message: 2,
      username: "zyh"
    };
  },
  computed: {
    isCollapse: {
      get: function() {
        return this.$store.state.isCollapse;
      },
      set: function(newValue) {
        this.$store.commit("IS_COLLAPSE", newValue);
      }
    }
  },
  methods: {
    toggleClick() {
      this.isCollapse = !this.isCollapse;
    },
    // 用户名下拉菜单选择事件
    logout(command) {
      this.$store.commit('TAGES_LIST',[])
      this.$store.commit('SET_BREAD',['home'])
      this.$store.commit('COMMIT_TOKEN',{token: ""})
      this.$router.push("/login");
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
}; 
</script>
<style lang="scss" scoped>
.header-right {
  width: 100px;
  padding-right: 50px;
  float: right;
}
.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}

.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.avatar-container {
  height: 50px;
  display: inline-block;
  // position: absolute;
  // right: 35px;
  .avatar-wrapper {
    cursor: pointer;
    position: relative;
    line-height: initial;
    padding-top: 22px;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>


