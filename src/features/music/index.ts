import { ProviderManager, globalProviderManager } from "./data/providers/ProviderManager";
import { JioSaavnProvider } from "./data/providers/JioSaavnProvider";
import { PipedProvider } from "./data/providers/PipedProvider";
import { InvidiousProvider } from "./data/providers/InvidiousProvider";
import { MusicRepositoryImpl } from "./data/repository/MusicRepositoryImpl";
import { SearchService } from "./services/SearchService";
import { StreamService } from "./services/StreamService";
import { RecommendationService } from "./services/RecommendationService";

// Initialize core components
const providerManager = globalProviderManager;
providerManager.registerProvider(new JioSaavnProvider());
providerManager.registerProvider(new PipedProvider());
providerManager.registerProvider(new InvidiousProvider());

const musicRepository = new MusicRepositoryImpl(providerManager);

export const searchService = new SearchService(musicRepository);
export const streamService = new StreamService(musicRepository);
export const recommendationService = new RecommendationService(musicRepository);

export { ProviderManager, MusicRepositoryImpl, JioSaavnProvider, PipedProvider, InvidiousProvider };
