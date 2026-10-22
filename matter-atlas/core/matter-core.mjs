/**
 * Matter Atlas shared scientific record validator, v0.1.
 * Pure ES module; no dependencies, network, secrets, or DOM access.
 * No assertion that a record's science has been externally verified.
 */
export const ENTITY_KINDS = Object.freeze([
  "element", "nuclide", "ion", "compound", "material", "phase",
  "metamaterial", "functional_group", "reaction", "geological_sample",
  "geochemical_process", "excitation"
]);
export const EVIDENCE_METHODS = Object.freeze(["measured","computed","curated","derived","inferred"]);
export const RELATIONS = Object.freeze([
  "isotope_of","ion_of","component_of","has_structure","has_phase",
  "has_excitation","engineered_as","reactant_in","product_of",
  "measured_in","transforms_to","has_functional_group"
]);
const isObject = x => x !== null && typeof x === "object" && !Array.isArray(x);
const nonEmpty = x => typeof x === "string" && x.trim().length > 0;
export function validateMatterRecord(record) {
  const errors = [];
  if (!isObject(record)) return {ok:false,errors:["record must be an object"]};
  if (!nonEmpty(record.id) || !/^atlas:[a-z_]+:[A-Za-z0-9._:-]+$/.test(record.id)) errors.push("invalid stable id");
  if (!ENTITY_KINDS.includes(record.kind)) errors.push("unsupported kind");
  if (!Array.isArray(record.evidence) || record.evidence.length === 0) errors.push("at least one evidence record required");
  else record.evidence.forEach((e,i)=>{
    if (!isObject(e) || !EVIDENCE_METHODS.includes(e.method)) errors.push(`evidence[${i}] invalid method`);
    if (!nonEmpty(e?.source_url) || !/^https?:\/\//.test(e.source_url)) errors.push(`evidence[${i}] missing HTTP(S) source`);
    if (!nonEmpty(e?.license)) errors.push(`evidence[${i}] missing license/access designation`);
  });
  if (record.relations !== undefined) {
    if (!Array.isArray(record.relations)) errors.push("relations must be an array");
    else record.relations.forEach((r,i)=>{
      if (!isObject(r) || !RELATIONS.includes(r.predicate) || !nonEmpty(r.target_id)) errors.push(`relations[${i}] invalid`);
    });
  }
  if (record.properties !== undefined) {
    if (!Array.isArray(record.properties)) errors.push("properties must be an array");
    else record.properties.forEach((p,i)=>{
      if (!isObject(p) || !nonEmpty(p.name) || !nonEmpty(p.unit) || typeof p.value !== "number" || !Number.isFinite(p.value)) errors.push(`properties[${i}] invalid value/unit`);
      if (!isObject(p?.conditions)) errors.push(`properties[${i}] missing conditions object`);
    });
  }
  if (record.kind === "ion" && (!Number.isInteger(record.charge) || !nonEmpty(record.element_id))) errors.push("ion requires integer charge and element_id");
  if (record.kind === "reaction" && (!Array.isArray(record.reactants) || !Array.isArray(record.products))) errors.push("reaction requires reactants and products; conservation is a separate validation gate");
  return {ok:errors.length===0,errors};
}
/** Molar ternary fractions, not a phase-equilibrium calculation. */
export function normalizeTernary(values) {
  if (!Array.isArray(values) || values.length!==3 || values.some(v=>typeof v!=="number" || !Number.isFinite(v) || v<0)) throw new TypeError("expected three finite nonnegative amounts");
  const total=values.reduce((a,b)=>a+b,0);
  if (total<=0) throw new RangeError("ternary total must be positive");
  return values.map(v=>v/total);
}
/** Coordinates: A top, B bottom-left, C bottom-right. */
export function ternaryToXY(values) {
  const [a,b,c]=normalizeTernary(values);
  return {x:0.5*a+c,y:(1-a)*Math.sqrt(3)/2};
}
