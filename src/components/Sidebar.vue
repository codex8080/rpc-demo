<template>
  <div class="header_cont">
    <el-row class="header_style">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="header_body">
        <el-menu :default-active="activeIndex" router class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="/node_status">
            <i class="icon icon_nodeStatus"></i>
            Status
          </el-menu-item>
          <el-menu-item index="/custodial_staking">
            <i class="icon icon_models"></i>
            Staking
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
let that
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'Sidebar',
  components: {},
  data () {
    return {
      activeIndex: '/node_status'
    };
  },
  watch: {
    $route: function (to, from) {
      that.activeName()
      window.scrollTo(0, 0)
    }
  },
  methods: {
    handleSelect (key, keyPath) { },
    activeName () {
      let pathAdress = that.$route.path
      if (pathAdress.indexOf('custodial') > -1) that.activeIndex = '/custodial_staking'
      else that.activeIndex = '/node_status'
    }
  },
  mounted () {
    that = this
    that.activeName()
  }
})
</script>
<style lang="scss" scoped>
.header_cont {
  min-height: 0.68rem;
  overflow: hidden;
  .header_style {
    padding: 0 0.16rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
    font-size: 14px;
    @media screen and (min-width: 1280px) {
      max-width: 1280px;
    }
    @media screen and (min-width: 1536px) {
      max-width: 1536px;
    }
    .header_body {
      display: flex;
      align-items: center;
      :deep(.el-menu) {
        width: 100%;
        padding: 15px 0;
        background-color: transparent;
        border: 0;
        justify-content: flex-end;
        .el-menu-item {
          padding: 0 0.15rem;
          margin: 0 0 0.2rem;
          background-color: #fff;
          border: 0 !important;
          border-radius: 0.1rem;
          box-shadow: 0 0 13px rgba(128, 128, 128, 0.2);
          @media screen and (min-width: 1800px) {
            font-size: 15px;
          }
          .icon {
            width: 21px;
            height: 20px;
            margin: 0 6px 0 0;
          }
          svg {
            width: 21px;
          }
          &.is-active,
          &:hover {
            color: #94c0ff !important;
          }
        }
        .el-sub-menu__title {
          border: 0;
        }
      }
    }
  }
}
</style>
