# Matter Atlas — Compounds, Phase Equilibria & Metamaterials (v0.1)

Status: proposed integration, isolated feature branch; no deployment.

## Scientific boundaries
- Nuclide: nuclear species; element: proton-number identity; compound: chemically bonded composition; material: phase/mixture/microstructure; metamaterial: engineered architecture.
- Quasiparticles are collective excitations and cross-link to phases, structures and metamaterials; they are not a subtype of compound.
- Distinguish composition triangles from equilibrium phase diagrams and geological alteration diagrams.
- Distinguish DFT-derived 0 K convex hull predictions from measured finite-temperature phase equilibria.

## Entity schema (draft)
```json
{
  "id":"atlas:compound:example",
  "kind":"compound",
  "formula":"TiO2",
  "elements":["Ti","O"],
  "identifiers":{"materials_project":[],"doi":[]},
  "structures":[],
  "properties":[],
  "evidence":[{"source_url":"","method":"measured|computed|derived","conditions":{},"retrieved_at":"","license":""}],
  "relations":[{"predicate":"has_phase|has_excitation|component_of|engineered_as","target_id":""}]
}
```
Store materials, phases, diagrams and metamaterial architectures as separate entity kinds with stable IDs. Property records require units, conditions, provenance and uncertainty when available.

## Initial pages
1. Compounds & Molecules
2. Materials & Crystal Structures (reuse existing allotropes/crystals)
3. Phase Diagrams (binary, ternary, P–T, Pourbaix; labelled by scientific type)
4. Metamaterials & Architected Matter
5. Cross-links to Nuclides, Exotic Atoms, Quasiparticles and Transitions

## First demo datasets
- Ti–O: computed composition/phase reference; do not fabricate hull data.
- A–CN–K: normalized molar oxide weathering composition, CaO* corrected; never label as thermodynamic equilibrium.
- Titanium/polyurethane hollow-strut lattice: material + geometry + manufacturing case study; mechanical modes not asserted as newly observed quasiparticles.

## Integration design
- Mobile-first static HTML/SVG canvas; keyboard and touch accessible, lazy-loaded data; no API keys in client.
- Source adapters: Materials Project via server-side mp-api with user-supplied secret; NIST/SpringerMaterials metadata and links only absent redistribution permission.
- Scientific processing: existing pymatgen; 3Dmol.js for supported molecular views; CAD export through existing build123d/Trimesh pipeline, behind human approval.
- Transpiler project remains on hold: define interchange formats (JSON, CIF, POSCAR, STL/3MF) but do not claim arbitrary lossless conversion.

## Acceptance gates
- [ ] Repository site entrypoint/navigation audit and integration path verified
- [ ] Schema validated against example records
- [ ] Ternary normalization tests (zero total, negative values, vertex sums)
- [ ] Source/license and computational/experimental badges
- [ ] Mobile performance and offline fallback tested
- [ ] No unreviewed deployment or CAD fabrication
- [ ] Council review and PR before merge

## References
- https://docs.materialsproject.org/methodology/materials-methodology/thermodynamic-stability/phase-diagrams-pds
- https://docs.materialsproject.org/downloading-data/using-the-api/getting-started
- https://github.com/materialsproject/pymatgen
- https://www.nist.gov/srd/nist-standard-reference-database-31
- https://materials.springer.com/
- https://doi.org/10.1002/adma.74641
