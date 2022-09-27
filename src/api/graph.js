import api from '@/api/index'

export const createGraph = createForm => {
    return api.post(
        'graph',
        createForm
    )
}
