import api from '@/api/index'

export const uploadGraphData = (id, data) => {
    return api.post(
        'graph/' + id,
        data
    )
}
