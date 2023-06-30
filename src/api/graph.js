import api from '@/api/index'

export const uploadGraphData = (id, data) => {
    return api.post(
        'graph/' + id,
        data
    )
}
export const createSubGraph = (id, createForm) => {
    return api.post(
        'graph/' + id + '/subgraph',
        createForm
    )
}

export const getSubgraphs = id => {
    return api.get(
        'graph/' + id + '/subgraphs'
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

export const deleteSubGraphById = (graphId, id) => {
    return api.delete(
        'graph/' + graphId + '/subgraph/' + id
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

export const getRelationsQuery = (id, type, size, page, query, sourceLabel, targetLabel) => {
    return api.get(
        'graph/' + id + '/relations-query', {
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

export const getRelationsOfEntities = (id, entities) => {
    return api.post(
        'graph/' + id + '/relationsOfEntities',
        entities
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

export const getSelfOptionQueryEntities = (id, type, size, page, query, sourceLabel, targetLabel, path) => {
    return api.get(
        'graph/' + id + '/selfOption-query/entities', {
            params: {
                type: type,
                size: size,
                page: page,
                query: query,
                sourceLabel: sourceLabel,
                targetLabel: targetLabel,
                path: path
            }
        }
    )
}

export const getEntityNeighbors = (id, entityId) => {
    return api.get(
        'graph/' + id + '/entities/' + entityId + '/neighbors'
    )
}

export const getEntityNeighborsWithPagination = (id, entityId, size, page) => {
    return api.get(
        'graph/' + id + '/entities/' + entityId + '/neighbors-with-pagination', {
            params: {
                size: size,
                page: page
            }
        }
    )
}

export const getEntityDegreeNeighbors = (id, entityId, degree) => {
    return api.get(
        'graph/' + id + '/entities/' + entityId + '/neighborsby', {
            params: {
                degree: degree
            }
        }
    )
}

export const getEntityInAndOut = (id, entityId) => {
    return api.get(
        'graph/' + id + '/entities/' + entityId + '/inAndOut'
    )
}

export const updateEntity = (id, entityId, entityInfo) => {
    return api.put(
        'graph/' + id + '/entities/' + entityId,
        entityInfo
    )
}

export const createEntity = (id, entityInfo) => {
    return api.post(
        'graph/' + id + '/entities',
        entityInfo
    )
}

export const removeEntity = (id, entityId) => {
    return api.delete(
        'graph/' + id + '/entities/' + entityId
    )
}

export const downloadGraph = id => {
    window.open(
        api.defaults.baseURL + 'graph/' + id + '/download'
    )
}

export const getTreeList = (id, type, type2, page, size, name) => {
    return  api.get(
        'graph/' + id + '/tree-list?type=' + type + '&type2=' + type2, {
            params: {
                size: size,
                page: page,
                name: name
            }
        }

    )
}