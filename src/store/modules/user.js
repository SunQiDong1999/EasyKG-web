// import api from '@/api'

import useRouteStore from './route'
import useMenuStore from './menu'
import { getPermissions, login, editPassword } from '@/api/user'
// import { resolve } from 'path-browserify'

const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            id: localStorage.id || '',
            account: localStorage.account || '',
            token: localStorage.token || '',
            permissions: []
        }),
        getters: {
            isLogin: state => {
                let retn = false
                if (state.token) {
                    retn = true
                }
                return retn
            }
        },
        actions: {
            login(data) {
                return new Promise((resolve, reject) => {
                    login(data).then(res => {
                        localStorage.setItem('id', res.data.id)
                        localStorage.setItem('account', res.data.account)
                        localStorage.setItem('token', res.data.token)
                        this.id = res.data.id
                        this.account = res.data.account
                        this.token = res.data.token
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            logout() {
                return new Promise(resolve => {
                    const routeStore = useRouteStore()
                    const menuStore = useMenuStore()
                    localStorage.removeItem('id')
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    this.id = ''
                    this.account = ''
                    this.token = ''
                    routeStore.removeRoutes()
                    menuStore.setActived(0)
                    resolve()
                })
            },
            // 获取我的权限
            getPermissions() {
                return new Promise(resolve => {
                    getPermissions().then(res => {
                        this.permissions = res.data.permissions
                        resolve(res.data.permissions)
                    })
                })
            },
            editPassword(data) {
                return new Promise((resolve, reject) => {
                    console.log('data', data)
                    editPassword(data).then(res => {
                        console.log(res)
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        }
    }
)

export default useUserStore
