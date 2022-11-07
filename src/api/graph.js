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

export const getLabelAttributeMap = id => {
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

export const getTypeAttributeMap = id => {
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

export const getEntities = (id, size, page) => {
    return api.get(
        'graph/' + id + '/entities', {
            params: {
                size: size,
                page: page
            }
        }
    )
}

export const getEntitiesQuery = (id, label, size, page, query) => {
    return api.get(
        'graph/' + id + '/entities-query', {
            params: {
                label: label,
                size: size,
                page: page,
                query: query
            }
        }
    )
}

export const getRelations = (id, size, page) => {
    return api.get(
        'graph/' + id + '/relations', {
            params: {
                size: size,
                page: page
            }
        }
    )
}

export const getRelationsQuery = (id, type, size, page, query) => {
    return api.get(
        'graph/' + id + '/relations-query', {
            params: {
                type: type,
                size: size,
                page: page,
                query: query
            }
        }
    )
}

export const getRelationsQueryEntities = (id, type, size, page, query, sourceLabel, targetLabel) => {
    return api.get(
        'graph/' + id + '/relations-query/entities', {
            params: {
                type: type,
                size: size,
                page: page,
                query: query,
                sourceLabel: sourceLabel,
                targetLabel: targetLabel
            }
        }
    )
}

export const getEntityNeighbors = (id, entityId) => {
    return api.get(
        'graph/' + id + '/entities/' + entityId + '/neighbors'
    )
}
