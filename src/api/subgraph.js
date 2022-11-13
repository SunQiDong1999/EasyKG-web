import api from '@/api/index'

// export const createSubGraph = (id, createForm) => {
//     return api.post(
//         'graph/' + id + '/subgraph',
//         createForm
//     )
// }
export const createSubgraphContent = (id, subgraphContent) => {
    return api.post(
        'subgraph/' + id + '/subgraphContent',
        subgraphContent
    )

}

export const getSubgraphEntities = subgraphId => {
    return api.get(
        'subgraph/' + subgraphId + '/entities'
    )
}

export const getSubgraphById = id => {
    return api.get(
        'subgraph/' + id
    )
}
