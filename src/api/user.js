import api from '@/api'

export const login = loginForm => {
    return api.post(
        'user/login',
        loginForm
    )
}

export const logout = () => {
    return api.post(
        'user/logout'
    )
}

export const getPermissions = () => {
    return api.get(
        'user/permission'
    )
}

export const editPassword = editForm => {
    return api.post(
        'user/editPassword',
        editForm
    )
}
