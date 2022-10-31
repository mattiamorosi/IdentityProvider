const { IdentityManager } = require("@tanglelabs/identity-manager");
const path = require("path");

const createUserVc = async (name, surname, university, userAlias) => {
   
    const manager = await IdentityManager.newInstance({
        filepath: path.resolve(__dirname, "./"),
        password: "foo",
        managerAlias: "test",
    });

    // Issuer loading
    const issuer = await manager.getIdentityByAlias("http://example-ap.com");
    const identity = await manager.getIdentityByAlias(userAlias);
    const signedVc = await issuer.credentials.create({
      keyIndex: 15,
      id: "http://coodos.co",
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


module.exports = {createUserVc};