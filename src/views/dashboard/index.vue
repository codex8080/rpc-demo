<template>
    <div class="dashboard">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" :key="$route.name+Math.random()" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" :key="$route.name+Math.random()" v-if="!$route.meta.keepAlive" />
        </router-view>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard',
  mounted() {},
})
</script>

<style lang="scss" scoped>
.dashboard{
    box-sizing: border-box;
    max-width: 100%;
    padding: 0;
    font-size: 0.2rem;
}
    
.appFade-enter-active,
.appFade-leave-active {
  transition: opacity 0.3s;
}
.appFade-enter,
.appFade-leave-to {
  opacity: 0;
}
</style>