"use strict"



export const normalizeText = input => input.split(' ').join('').toLowerCase()

export function searchAlumni(list, query) {
    const search = normalizeText(query)

    return list.filter(person => normalizeText(person.name).includes(search)
    || normalizeText(person.role).includes(search)
    || normalizeText(person.company).includes(search)
    || normalizeText(person.location).includes(search)
    )
}

export function sortAlumni(list, filter) {
    const sorted = [...list]

    if (filter === "recent") {
        sorted.sort((a, b) => a.lastActivity - b.lastActivity)
    }

    if (filter === "popular") {
        sorted.sort((a, b) => b.profileViews - a.profileViews)
    }

    if (filter === "connections") {
        sorted.sort((a, b) => b.connections - a.connections)
    }

    return sorted
}
