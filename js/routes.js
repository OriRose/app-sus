// import 

const routes = [
    {
        path:'/',
        component: homePage
    },
    {
        path:'/book',
        component: bookApp
    },
    {
        path:'/keep',
        component: keepApp
    },
    {
        path:'/mail',
        component: mailApp
    },
    {
        path:'/about',
        component: aboutPage
    }
]

export const myRouter = new VueRouter({ routes })