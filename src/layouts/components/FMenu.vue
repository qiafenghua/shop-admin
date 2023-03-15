<template>
    <div class="f-menu" :style="{ width: $store.state.asideWidth }">
        <el-menu unique-opened :default-active="defaultActive" :collapse="isCollapse" class="border-0"
            @select="handleSelect" :collapse-transition="false">

            <template v-for="(item, index) in asideMenus" :key="index">
                <!-- 如果有子菜单 -->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>

                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else :index='item.frontpath'>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const route = useRoute()

//是否折叠 asideWidth不等于250则展开
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))

const defaultActive = ref(route.path)

const asideMenus = computed(() => store.state.menus)

const handleSelect = e => router.push(e)
</script>

<style scoped>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 250px;
    @apply shadow-md fixed bg-light-50;
}

/*清除滚动条*/
.f-menu::-webkit-scrollbar {
    width: 0px;
}
</style>