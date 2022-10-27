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

export const getLabelTableHeads = id => {
    return api.get(
        'graph/' + id + '/label-attribute-map'
    )
}

export const getLabelTableData = (id, label, size, page) => {
    return api.get(
        'graph/' + id + '/tableview/entities', {
            params: {
                label: label,
                size: size,
                page: page
            }
        }
    )
}

export const getTypeTableHeads = id => {
    return api.get(
        'graph/' + id + '/type-attribute-map'
    )
}

export const getTypeTableData = (id, type, size, page) => {
    return api.get(
        'graph/' + id + '/tableview/relations', {
            params: {
                type: type,
                size: size,
                page: page
            }
        }
    )
}
