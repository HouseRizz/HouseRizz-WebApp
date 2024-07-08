module.exports = {
  // Replace this with a container that you own.
  containerIdentifier: "iCloud.krishmittal.HouseRizz-Seller",

  environment: "development",

  serverToServerKeyAuth: {
    // Generate a key ID through CloudKit Dashboard and insert it here.
    keyID: "1ec212063bb1f6d6d3878c97741e717eb980cbe6f74d9c13f55f3bee040b557a",

    // This should reference the private key file that you used to generate the above key ID.
    privateKeyFile: __dirname + "/eckey.pem",
  },
};
