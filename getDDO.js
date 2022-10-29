const { IdentityManager, Types } = require("@tanglelabs/identity-manager");
const path = require("path");

const getDDO = async (alias) => {
   
    const manager = await IdentityManager.newInstance({
        filepath: path.resolve(__dirname, "./"),
        password: "foo",
        managerAlias: "test",
    });

    // Issuer loading
    try {
        const identity = await manager.getIdentityByAlias(alias);
        return identity.getDocument();
    }
    catch(e) {
        return "Not_found"
    }
};


module.exports = {getDDO};