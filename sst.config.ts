import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/HomeAutomationStack";

export default {
  config(_input) {
    return {
      name: "home-automation",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(ExampleStack);
  }
} satisfies SSTConfig;
