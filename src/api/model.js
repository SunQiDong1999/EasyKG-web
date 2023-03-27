import api from '@/api/index'

export const testConnected = id => {
    return api.get(
        'model/' + id + '/connection'
    )
}

export const fileUpload = (id, data) => {
    return api.post(
        'model/' + id + '/file',
        data
    )
}

export const run = id => {
    return api.post(
        'model/' + id + '/run'
    )
}

export const progress = id => {
    return api.get(
        'model/' + id + '/progress'
    )
}

export const getResult = id => {
    return api.get(
        'model/' + id + '/result'
    )
}

export const downloadResult = id => {
    window.open(
        api.defaults.baseURL + 'model/' + id + '/download'
    )
}

export const addSubgraph = (id, subgraphId) => {
    return api.post(
        'model/' + id + '/subgraph/' + subgraphId
    )
}

export const getModelSubgraphs = id => {
    return api.get(
        'model/' + id + '/subgraph'
    )
}