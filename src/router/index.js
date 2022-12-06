import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
const home = () =>
    import ("@/components/Home");
const dashboard = () =>
    import ("@/views/dashboard/index");
const index = () =>
    import ("@/views/dashboard/main/index");
const custodial = () =>
    import ("@/views/dashboard/custodial/index");

const routes = [{
        path: '/',
        redirect: '/node_status'
    },
    {
        path: '/',
        component: home,
        children: [{
            path: '/node_status',
            name: 'index',
            components: {
                default: index
            },
            meta: {
                keepAlive: true,
            }
        }, {
            path: '/custodial_staking',
            name: 'custodial',
            components: {
                default: custodial
            },
            meta: {
                keepAlive: true,
            }
        }]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router