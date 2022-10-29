const { IdentityManager, Types } = require("@tanglelabs/identity-manager");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { createIdentity } = require("./createIdentity");

const createVC = async (name, surname, university, userAlias, alias) => {
    const manager = await IdentityManager.newInstance({
        filepath: path.resolve(__dirname, "./"),
        password: "foo",
        managerAlias: "test",
    });
    const identity = await manager.getIdentityByAlias(userAlias);
    const issuer = await manager.getIdentityByAlias(alias);
    const signedVc = await identity.credentials.create({
      keyIndex: 5,
      id: alias,
      type: "UniversityCredential",
      fragment: "#signing-method",
      recipientDid: identity.getDid(),
      body: {
        name: name,
        surname: surname,
        university: university,
      },
    });
    return signedVc.toJSON()
    
};


module.exports = {createVC};