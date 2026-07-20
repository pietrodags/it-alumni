
interface Alumni {
    name: string;
    role: string;
    company: string;
    location: string;
    lastActivity: number;
    profileViews: number;
    connections: number;
}

type FilterKey = "recent" | "popular" | "connections";

const alumni: Alumni[] = [
    { name: "Laia Puig", role: "Co-fundadora", company: "ABC Inc", location: "Barcelona", lastActivity: 1, profileViews: 412, connections: 320 },
    { name: "Marc Soler", role: "Product Manager", company: "XYZ Corp", location: "Girona", lastActivity: 4, profileViews: 298, connections: 415 },
    { name: "Emma Riera", role: "Desenvolupadora sènior", company: "Tech Solutions", location: "Remot", lastActivity: 0, profileViews: 187, connections: 152 },
    { name: "David Bosch", role: "Especialista en màrqueting", company: "Brand Co", location: "Tarragona", lastActivity: 16, profileViews: 355, connections: 268 },
    { name: "Núria Vidal", role: "Dissenyadora UX/UI", company: "Studio Nova", location: "Barcelona", lastActivity: 2, profileViews: 240, connections: 190 },
    { name: "Pol Ferrer", role: "Analista de dades", company: "DataLab", location: "Lleida", lastActivity: 45, profileViews: 96, connections: 88 },
    { name: "Aina Serra", role: "Enginyera DevOps", company: "CloudWorks", location: "Remot", lastActivity: 5, profileViews: 320, connections: 501 },
    { name: "Mikel Aguirre", role: "Desenvolupador front-end", company: "Pixel Studio", location: "Barcelona", lastActivity: 13, profileViews: 145, connections: 205 }
];


const searchInput = document.querySelector<HTMLInputElement>("#search-alumni")!;
const resultList = document.querySelector<HTMLElement>("#alumni-list")!;
const filterMenu = document.querySelectorAll<HTMLButtonElement>(".filter-btn");

let activeFilter: FilterKey = "recent";

const normalizeText = (input: string): string => input.split(' ').join('').toLowerCase();

function showAlumni(list: Alumni[]): void {
    let alumniList = "";

    for (const person of list) {
        alumniList += `
        <section class="alumni-card">
            <h3 class="alumni-name">${person.name}</h3>
            <p class="alumni-role">${person.role} a ${person.company}</p>
            <p class="alumni-location">${person.location}</p>
            <button type="button" class="btn-action">Missatge</button>
        </section>
        `;
    }

    if (list.length === 0) {
        alumniList = `<p class="no-results">Cap alumni coincideix amb la teva cerca.</p>`;
    }

    resultList.innerHTML = alumniList;
}

function getResult(): void {
    const search = normalizeText(searchInput.value);

    const result = alumni.filter(person =>
        normalizeText(person.name).includes(search)
        || normalizeText(person.role).includes(search)
        || normalizeText(person.company).includes(search)
        || normalizeText(person.location).includes(search)
    );

    if (activeFilter === "recent") {
        result.sort((a, b) => a.lastActivity - b.lastActivity);
    }

    if (activeFilter === "popular") {
        result.sort((a, b) => b.profileViews - a.profileViews);
    }

    if (activeFilter === "connections") {
        result.sort((a, b) => b.connections - a.connections);
    }

    showAlumni(result);
}

searchInput.addEventListener("input", getResult);

for (const button of filterMenu) {
    button.addEventListener("click", function () {
        activeFilter = button.value as FilterKey;

        for (const other of filterMenu) {
            other.classList.remove("active");
        }
        button.classList.add("active");

        getResult();
    });
}

getResult();
