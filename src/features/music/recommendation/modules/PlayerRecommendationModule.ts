import type { RecommendationContext } from "../domain/models/RecommendationContext";
import { NextUpQueueGenerator } from "../engines/NextUpQueueGenerator";

export class PlayerRecommendationModule {
  constructor(private queueGen: NextUpQueueGenerator) {}

  async getAutoRadio(context: RecommendationContext) {
    return this.queueGen.generateRadio(context, 50);
  }
}
