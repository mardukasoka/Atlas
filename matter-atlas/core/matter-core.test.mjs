import test from "node:test";
import assert from "node:assert/strict";
import {normalizeTernary,ternaryToXY,validateMatterRecord} from "./matter-core.mjs";
test("ternary vertices",()=>{
 assert.deepEqual(ternaryToXY([1,0,0]),{x:0.5,y:0});
 assert.equal(ternaryToXY([0,0,1]).x,1);
 assert.equal(ternaryToXY([0,1,0]).x,0);
});
test("normalizes molar ratios",()=>{
 const x=normalizeTernary([55,30,15]);assert.deepEqual(x,[0.55,0.3,0.15]);
});
test("rejects zero, negative, and invalid input",()=>{
 for (const v of [[0,0,0],[-1,2,3],[1,NaN,2],[1,2]]) assert.throws(()=>normalizeTernary(v));
});
test("requires provenance",()=>{
 const x=validateMatterRecord({id:"atlas:compound:TiO2",kind:"compound",evidence:[]});
 assert.equal(x.ok,false);
});
test("accepts a sourced placeholder record without fabricated properties",()=>{
 const x=validateMatterRecord({id:"atlas:compound:TiO2",kind:"compound",evidence:[{method:"curated",source_url:"https://example.org/reference",license:"rights-review-pending"}],relations:[]});
 assert.equal(x.ok,true);
});
