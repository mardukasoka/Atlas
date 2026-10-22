# Atlas ↔ Automated Laboratory Integration v0.1

Status: architectural specification only. No live instrument access, execution, deployment, or integration enabled.

## Goal
Link verified Matter Atlas entities (nuclides, compounds, materials, phases, metamaterials, reactions) to supervised physical experiments, with traceable evidence flowing back into the knowledge graph.

## Strict boundaries
1. Atlas records: scientific knowledge, with provenance and confidence.
2. Science Council: proposes hypotheses and candidate experiments, not authorization.
3. Simulation: produces predictions, never relabeled as observations.
4. Protocol registry: versioned experimental intent, material and equipment requirements, hazards, controls, acceptance criteria, calibration requirements.
5. Human and institutional approvals: named responsible operator, laboratory permissions, safety assessment, applicable legal and ethical checks.
6. Laboratory adapter: allowlisted instrument capabilities, read-only discovery first; commands only after explicit scoped authorization and local interlocks.
7. Measurement: immutable raw observations, instrument metadata, sample identity, units, uncertainty, calibration, timestamps, software versions and chain of custody.
8. Verification: independent quality-control, replication where warranted, contradictions retained; only reviewed claims promoted into Atlas.

## Entities
- hypothesis: links to source claims and predicted outcomes
- experiment_proposal: target hypothesis, protocol version, simulation references
- protocol: procedures, constraints, approvals and permitted instrument actions
- sample: physical identifier, composition, preparation, location and custody
- instrument: vendor/model, capabilities, firmware, calibration and access permissions
- experiment_run: protocol hash, operator, time, environment, sample IDs, status
- observation: raw data reference, units, uncertainty, instrument provenance
- finding: evidence links, review decision, limitations, replication state

## Interoperability candidates for evaluation
- SiLA 2 for lab device interoperability
- OPC UA for industrial devices where appropriate
- AnIML for analytical data exchange
- Allotrope Data Format / ontologies for lab data
- ISA-Tab / ISA-JSON for investigation-study-assay metadata
- FAIR data principles and persistent identifiers

These are candidates, not endorsed implementations or verified connector compatibility.

## Security and operational gates
- No direct LLM-to-instrument commands; signed, constrained requests through a local laboratory gateway.
- Separate planning credentials from execution credentials; least privilege and expiry.
- Local emergency stop, independent hardware interlocks, operator override and offline-safe behaviour.
- No hazardous chemistry, biological or other regulated experiment execution without institutional review and appropriate approvals.
- Prevent replay, require idempotency where applicable, log command/response hashes, timeouts and abort paths.
- External data and lab messages are untrusted input; enforce schemas and approval policies.
- Read-only mock adapter first, then simulated equipment, then supervised low-risk bench trials.

## Acceptance sequence
[ ] Inventory existing Atlas modules and avoid duplicate registries
[ ] Establish stable IDs and provenance links
[ ] Define JSON Schema and validate records
[ ] Build read-only simulated laboratory adapter
[ ] Verify measurement ingestion, units and calibration
[ ] Test failure modes, aborts and audit logging
[ ] Review regulatory, safety, cost and licensing implications
[ ] Obtain explicit human approval before any physical actuation

## Design invariant
Facts are not simulations. Simulations are not judgments. Judgments are not laws. Laws are not interfaces.
