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

export const getInheritanceDataById = id => {
    return api.get(
        'ontology/' + 'getInheritance/' + id
    )
}
