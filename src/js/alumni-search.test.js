import { describe, it, expect } from "vitest"
import { searchAlumni } from "./alumni-search.js"

describe("Feature: Busqueda y exploración de miembros", () => {

    it('Scenario: buscar miembro por el nombre - cuando introduzco "Anna", veo una lista de nombres que coinciden', () => {
        
        const alumni = [
            { name: "Anna Puig", role: "Dissenyadora UX/UI", company: "Studio Nova", location: "Barcelona" },
            { name: "Marc Soler", role: "Product Manager", company: "XYZ Corp", location: "Girona" },
            { name: "Pol Ferrer", role: "Analista de dades", company: "DataLab", location: "Lleida" }
        ]

        const result = searchAlumni(alumni, "Anna")

        expect(result).toHaveLength(1)
        expect(result[0].name).toBe("Anna Puig")
    })
})
