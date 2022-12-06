<template>
    <div class="wrapper" id="wrapper" ref="area">
        <el-config-provider>
            <el-row :gutter="20" class="wrapbody">
                <el-col :xs="8" :sm="8" :md="5" :lg="5" class="side">
                    <v-sidebar></v-sidebar>
                </el-col>
                <el-col :xs="24" :sm="24" :md="19" :lg="19" class="content-box" id="content-box">
                    <div class="content">
                        <router-view v-slot="{ Component }">
                            <keep-alive>
                                <component :is="Component" :key="$route.name+Math.random()" v-if="$route.meta.keepAlive" />
                            </keep-alive>
                            <component :is="Component" :key="$route.name+Math.random()" v-if="!$route.meta.keepAlive" />
                        </router-view>
                    </div>
                </el-col>
            </el-row>
        </el-config-provider>
        <el-backtop :right="30" :bottom="30" />
    </div>
</template>

<script>
import vSidebar from './Sidebar.vue';
import elementResizeDetectorMaker from "element-resize-detector"
export default {
    data () {
        return {
            bodyWidth: document.body.clientWidth <= 1024 ? true : false,
            positionStyle: false
        };
    },
    components: {
        vSidebar
    },
    computed: {},
    watch: {
        $route: function (to, from) {
        }
    },
    mounted () { },
    methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 21.4rem;
  max-width: 100%;
  margin: auto;
  @media screen and (max-width: 1440px) {
    width: 20.6rem;
  }
  @media screen and (max-width: 1366px) {
    width: 21.1rem;
  }
  @media screen and (max-width: 1280px) {
    width: 21.4rem;
  }
  @media screen and (max-width: 1152px) {
    width: 21rem;
  }
  @media screen and (max-width: 1024px) {
    width: 20.48rem;
  }
  :deep(.wrapbody) {
    width: 100%;
    padding: 30px 0;
  }
  .content-box {
    height: 100%;
  }
  .content {
    position: relative;
    overflow-y: scroll;
    margin: 15px 0;
    background-color: #fff;
    border-radius: 0.1rem;
    box-shadow: 0 0 13px rgba(128, 128, 128, 0.15);
    // transition: all;
    // transition-duration: .3s;
    &::-webkit-scrollbar {
      width: 1px;
      height: 1px;
      background-color: var(--el-color-white-soft);
    }

    &::-webkit-scrollbar-track {
      box-shadow: none;
      -webkit-box-shadow: none;
      border-radius: 10px;
      background-color: var(--el-color-white-soft);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: none;
      -webkit-box-shadow: none;
      background-color: var(--el-color-white-soft);
    }
    .content_body {
      position: relative;
    }
  }
}
</style>