import api from '@/api/index'

export const getOntologyById = id => {
    return api.get(
        'ontology/' + id
    )
}

export const updateOntology = ontologyForm => {
    return api.put(
        'ontology/' + ontologyForm.id,
        ontologyForm
    )
}

export const deleteOntology = id => {
    return api.delete(
        'ontology/' + id
    )
}

export const createOntology = createForm => {
    return api.post(
        'ontology',
        createForm
    )
}
