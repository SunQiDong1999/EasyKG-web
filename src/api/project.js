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

