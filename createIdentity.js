const { IdentityManager, Types } = require("@tanglelabs/identity-manager");
const path = require("path");

const createIdentity = async (alias) => {
    const manager = await IdentityManager.newInstance({
        filepath: path.resolve(__dirname, "./"),
        password: "foo",
        managerAlias: "test",
    });
    try {
        const did = await manager.createDid({   // DID loaded on mainnet and PoW made locally
            alias: alias,
            store: {
                type: Types.Fs,
                options: { filepath: path.resolve(__dirname, "./creds") },  //file to save credentials
            },
        });
        return (did.getDid().toJSON());
    }
    catch (e) {
        return "alias_used";
    }
};


module.exports = {createIdentity};