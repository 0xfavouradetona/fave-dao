import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const editionDrop = sdk.getEditionDrop("0x6e061D36E2c2a75935929f4746c80BAb2Df5825c");

// This is the address to our ERC-20 token contract.
const token = sdk.getToken("0xedd9E5D49Ff908d42166173C91669CbB702B7899");

(async () => {
    try {
        // Grab all the addressof people who own our membership NFT,
        // Which has a tokenId of 0.
        const walletAddress = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddress === 0) {
            console.log(
                "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
            ); 
            process.exit(0);
        }

        // Loop through the array of addresses.
        const airdropTargets = walletAddress.map((address) => {
            // Pck a random # between 1000 and 10000.
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            // Set up the targets.
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };

            return airdropTarget;
        });

        // Call transferBatch on all our airdrop targets.
        console.log("🌈 Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (err) {
        console.error("Failed to airdrop tokens", err);
    }
})();