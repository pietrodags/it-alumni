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


// export function sortAlumni(list, filter) {
//     const sorted = [...list]

//     if (filter === "recent") {
//         sorted.sort((a, b) => a.lastActivity - b.lastActivity)
//     }

//     if (filter === "popular") {
//         sorted.sort((a, b) => b.profileViews - a.profileViews)
//     }

//     if (filter === "connections") {
//         sorted.sort((a, b) => b.connections - a.connections)
//     }

//     return sorted
// }


export function getFilter(filter) {  
    let filterState = true

    if (filter === "recent") {
        filterState = false
    }

    return filterState
}


export function getProperty(filter) {
    let property = "lastActivity"

    if (filter === "popular") {
        property = "profileViews"
    }

    if (filter === "connections") {
        property = "connections"
    }

    return property
}

export function sortAlumni(list, filter, property) {
    const sorted = [...list]

    if (!filter) {
        sorted.sort((a, b) => a[property] - b[property])
    } else {
        sorted.sort((a, b) => b[property] - a[property])
    }
    
    return sorted
}