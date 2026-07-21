"use strict"

import { getFilter, searchAlumni, getProperty, sortAlumni } from "./alumni-search.js"


const alumni = [
    { name: "Laia Puig", role: "Co-fundadora", company: "ABC Inc", location: "Barcelona", lastActivity: 1, profileViews: 412, connections: 320 },
    { name: "Marc Soler", role: "Product Manager", company: "XYZ Corp", location: "Girona", lastActivity: 4, profileViews: 298, connections: 415 },
    { name: "Emma Riera", role: "Desenvolupadora sènior", company: "Tech Solutions", location: "Remot", lastActivity: 0, profileViews: 187, connections: 152 },
    { name: "David Bosch", role: "Especialista en màrqueting", company: "Brand Co", location: "Tarragona", lastActivity: 16, profileViews: 355, connections: 268 },
    { name: "Núria Vidal", role: "Dissenyadora UX/UI", company: "Studio Nova", location: "Barcelona", lastActivity: 2, profileViews: 240, connections: 190 },
    { name: "Pol Ferrer", role: "Analista de dades", company: "DataLab", location: "Lleida", lastActivity: 45, profileViews: 96, connections: 88 },
    { name: "Aina Serra", role: "Enginyera DevOps", company: "CloudWorks", location: "Remot", lastActivity: 5, profileViews: 320, connections: 501 },
    { name: "Mikel Aguirre", role: "Desenvolupador front-end", company: "Pixel Studio", location: "Barcelona", lastActivity: 13, profileViews: 145, connections: 205 }
];


const searchInput = document.getElementById("search-alumni");
const filterMenu = document.getElementsByClassName("filter-btn");
const resultList = document.getElementById("alumni-list");

let activeFilter = "recent"

function showAlumni(list) {
    let alumniList = ""

    for(const person of list) {
        alumniList += `
        <article class="alumni-card">
            <div class="alumni-info">
                <h3 class="alumni-name">${person.name}</h3>
                <p class="alumni-role">${person.role} a ${person.company}</p>
                <p class="alumni-location">${person.location}</p>
                <button type="button" class="btn-action">Missatge</button>
            </div>
            <div class="alumni-photo"></div>
        </article>
        `
    }

    if (list.length === 0) {
        alumniList = `<p class="no-results">Cap alumni coincideix amb la teva cerca.</p>`
    }

    resultList.innerHTML = alumniList
}


// function getResult() {
//     const found = searchAlumni(alumni, searchInput.value)
//     const result = sortAlumni(found, activeFilter)

//     showAlumni(result)
// }


function getResult() {

    const ActualFilterState = getFilter(activeFilter)
    
    const found = searchAlumni(alumni, searchInput.value)

    const propertyName = getProperty(activeFilter)

    const result = sortAlumni(found, ActualFilterState, propertyName)

    showAlumni(result)
}

searchInput.addEventListener("input", getResult)

for (const button of filterMenu) {
    button.addEventListener("click", function() {
        activeFilter = button.value;

        for (const other of filterMenu) {
            other.classList.remove("active");
        }
        button.classList.add("active");

        getResult()
    })
}

getResult()