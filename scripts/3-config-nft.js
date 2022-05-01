import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x6e061D36E2c2a75935929f4746c80BAb2Df5825c");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Fave Doll",
        description: "This NFT will give you access to FaveDAO!",
        image: readFileSync("scripts/assets/fave2.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();