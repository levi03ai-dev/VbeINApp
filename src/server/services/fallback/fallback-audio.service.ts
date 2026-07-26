import { getFallbackAudioForQuery } from "../../utils/crypto.utils";

export class FallbackAudioService {
  static getFallbackUrl(queryOrId: string): string {
    return getFallbackAudioForQuery(queryOrId || "track");
  }
}
