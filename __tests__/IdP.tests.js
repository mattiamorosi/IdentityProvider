const { Document, Credential } = require("@iota/identity-wasm/node");
const { createAP } = require("../createAP");
const { createIdentity } = require("../createIdentity");
const { createUserVc } = require("../createUserVc");
const { getDDO } = require("../getDDO");
jest.setTimeout(300000)

// createIdentity tests

test ("Should create a DID", async()=> {
    expect(
        await createIdentity("alias"+Math.random()*1000)
    ).toContain("did:iota");
})

test("Should return alias_used (existing alias)", async () => {
    expect(
        await createIdentity("Alias")
    ).toBe("alias_used");
});

// getDDO tests

test ("Should return a DID Document", async()=> {
    expect (
        await getDDO("Alias")
    ).toBeInstanceOf(Document);
})


test ("Should return a DID Document", async()=> {
    expect (
        await getDDO("Aliasncaonkson")
    ).toBe("Not_found");
})

// createAP tests

test ("Should create an AP", async()=> {
    expect(
        await createAP("alias"+Math.random()*1000)
    ).toContain("did:iota");
})

test("Should return alias_used (existing alias)", async () => {
    expect(
        await createAP("Alias")
    ).toBe("alias_used");
});

//createUserVc tests

test ("Should return a VC", async()=> {
    expect (
        await createUserVc("name", "surname", "university","Alias")
    ).toBeInstanceOf(Object);
})