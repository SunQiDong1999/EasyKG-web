import api from '@/api'

export const createProject = createForm => {
    return api.post(
        'project',
        createForm
    )
}

export const getProjects = () => {
    return api.get(
        'project'
    )
}

export const getProjectById = id => {
    return api.get(
        'project/' + id
    )
}

export const deleteProjectById = id => {
    return api.delete(
        'project/' + id
    )
}

export const getLabels = id => {
    return api.get(
        'project/' + id + '/labels'
    )
}

export const getTypes = id => {
    return api.get(
        'project/' + id + '/types'
    )
}

export const deleteOntology = (id, ontologyId) => {
    return api.delete(
        'project/' + id + '/ontology/' + ontologyId
    )
}

export const createOntology = (id, createForm) => {
    return api.post(
        'project/' + id + '/ontology',
        createForm
    )
}

export const getGraphs = id => {
    return api.get(
        'project/' + id + '/graphs'
    )
}

export const createGraph = (id, createForm) => {
    return api.post(
        'project/' + id + '/graph',
        createForm
    )
}

export const deleteGraphById = (projectId, id) => {
    return api.delete(
        'project/' + projectId + '/graph/' + id
    )
}

export const getOntologyColorMap = id => {
    return api.get(
        'project/' + id + '/ontology-color-map'
    )
}

export const createModel = (id, createForm) => {
    return api.post(
        'project/' + id + '/model',
        createForm
    )
}

export const getModels = id => {
    return api.get(
        'project/' + id + '/models'
    )
}

export const getSubgraphs = id => {
    return api.get(
        'project/' + id + '/subgraphs'
    )
}

