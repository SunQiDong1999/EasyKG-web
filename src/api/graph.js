import api from '@/api/index'

export const uploadGraphData = (id, data) => {
    return api.post(
        'graph/' + id,
        data
    )
}

export const getGraphById = id => {
    return api.get(
        'graph/' + id
    )
}

export const getGraphData = (id, page) => {
    return api.get(
        'graph/' + id + '/data', {
            params: {
                page: page
            }
        }
    )
}

export const deleteGraphById = (projectId, id) => {
    return api.get(
        'project/' + projectId + '/graph/delete/' + id
    )
}
