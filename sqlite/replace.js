import agriculturalEconomicsArray from "../data/agriculturalEconomicsArray";
import agriculturalExtensionArray from "../data/agriculturalExtensionArray";
import animalScienceArray from "../data/animalScienceArray";
import cropProtectionArray from "../data/cropProtectionArray";
import cropScienceArray from "../data/cropScienceArray";
import soilScienceArray from "../data/soilScienceArray";

import replaceArray from "replace-in-file";

const replace = (name) => {
  if (name === "agriculturalEconomicsArray.js") {
    replaceArray(name, agriculturalEconomicsArray);
  } else if (name === "agriculturalExtensionArray.js") {
    replaceArray(name, agriculturalExtensionArray);
  } else if (name === "animalScienceArray.js") {
    replaceArray(name, animalScienceArray);
  } else if (name === "cropProtectionArray.js") {
    replaceArray(name, cropProtectionArray);
  } else if (name === "cropScienceArray.js") {
    replaceArray(name, cropScienceArray);
  } else if (name === "soilScienceArray.js") {
    replaceArray(name, soilScienceArray);
  }
};

export default replace;
