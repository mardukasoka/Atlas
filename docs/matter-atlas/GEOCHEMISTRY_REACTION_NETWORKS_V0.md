# Matter Atlas — Geochemistry and Reaction Networks v0.1

Status: source inventory and integration specification, not yet implemented or deployed.
Parent: COMPOUNDS_METAMATERIALS_V0.md

## New linked entity types
- ion: element/isotope reference, oxidation state, coordination number, ionic radius (source and convention), hydration and environmental conditions. Ionic potential z/r is contextual and requires consistent units.
- geological_sample: sample ID, location precision, lithology, measurements, analytical method, uncertainty, age, provenance and licence.
- functional_group: controlled SMARTS patterns with aromaticity/protonation rules and test examples.
- reaction: atom-mapped reactants/products where licensed, transformation class, balanced stoichiometry, conditions, yield, mechanism evidence, provenance and safety classification.
- pathway: ordered reaction edges; distinguish recorded synthesis from hypothetical model-generated route.
- geochemical_process: weathering, dissolution, precipitation, redox, sorption, mineral transformation; P–T–pH–Eh constraints.

## Reference registry and access constraints
| Resource | Scope | Intake |
|---|---|---|
| Railsback Earth Scientist's Periodic Table | geochemical ionic classifications | attribution and link; review reproduction rights |
| EarthChem | rock/geochemical sample datasets | dataset-level metadata, permitted APIs/downloads |
| WebElements | element/ion reference | external links and manually verified facts; no bulk scraping |
| DataEarth periodic portal | alternative periodic representations | external reference, check source and rights |
| ChemSpider (RSC) | chemical structures and identifiers | API/terms review before integration |
| Organic Chemistry Portal | named reactions and mechanisms | links and curated classification; no bulk copying |
| CompoundChem reaction map | functional group transformation taxonomy | link only pending reproduction permission |
| Reaxys | commercial synthesis literature | metadata links only pending licence |
| CAS SciFinder | commercial synthesis literature | metadata links only pending licence |

## Cross-links
Nuclide -> Element -> Ion -> Mineral/Compound -> Material/Phase -> Metamaterial.
Compound -> Functional group -> Reaction -> Compound.
Sample -> Composition -> Ternary weathering plot.
Excitation (quasiparticle) is a cross-cutting relation to material/phase, not a chemical species.

## Interface
- Mobile-first dual explorer: Ionic Periodic Table and Reaction Network.
- Filter ionic chart by oxidation state, coordination, radius convention, aqueous/geological context.
- Reaction graph nodes = compounds or functional groups; arrows = evidenced transformation classes; no unsupported synthesis recipes.
- Diagram selector: compositional ternary, equilibrium phase diagram, geochemical alteration trajectory; each clearly labeled.
- Provenance badges: measured, computed, curated, inferred; include license, date and source.

## Validation gates
- [ ] Verify reference URLs and licensing/API availability
- [ ] Test ionic radius provenance (Shannon conventions) and z/r dimensions
- [ ] Balance reaction records; enforce atom and charge conservation
- [ ] Validate SMARTS patterns against known positive and negative examples
- [ ] Separate documented pathways from generated suggestions
- [ ] Accessibility, low-memory mobile performance and offline fallback
- [ ] Human scientific review before merge or deployment

## Source links
- http://railsback.org/PT.html
- https://www.earthchem.org/
- https://www.webelements.com/
- https://dataearth.cz/doku.php/en/periodic/start
- https://www.chemspider.com/
- https://www.organic-chemistry.org/
- https://www.compoundchem.com/wp-content/uploads/2020/10/Organic-reactions-map-2020.pdf
- https://www.reaxys.com/
- https://scifinder.cas.org/
