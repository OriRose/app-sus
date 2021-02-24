import homePage from './pages/home-page.cmp.js'
import bookApp from './apps/books/pages/book-app.cmp.js'
import keepApp from './apps/keep/pages/keep-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import aboutPage from './pages/about-page.cmp.js'

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