import { describe, it, expect } from "vitest"
import { searchAlumni } from "./alumni-search.js"

describe("Feature: Cerca i exploració de membres - EP3", () => {

    it('Scenario: cercar membres per nom — quan introdueixo "Anna", veig una llista de membres que hi coincideixen', () => {
        
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
