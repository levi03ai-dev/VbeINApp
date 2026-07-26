import { RecommendationRepositoryImpl } from "./repositories/RecommendationRepositoryImpl";
import { RankingEngine } from "./engines/RankingEngine";
import { RecommendationEngine } from "./engines/RecommendationEngine";
import { NextUpQueueGenerator } from "./engines/NextUpQueueGenerator";
import { RecommendationService } from "./services/RecommendationService";
import { CandidateGenerationService } from "./services/CandidateGenerationService";
import { SimilarityService } from "./services/SimilarityService";
import { RankingService } from "./services/RankingService";
import { HomeRecommendationModule } from "./modules/HomeRecommendationModule";
import { ExploreRecommendationModule } from "./modules/ExploreRecommendationModule";
import { SearchRecommendationModule } from "./modules/SearchRecommendationModule";
import { PlayerRecommendationModule } from "./modules/PlayerRecommendationModule";
import { RecommendationCache } from "./cache/RecommendationCache";

const repo = new RecommendationRepositoryImpl();
const ranking = new RankingEngine();
const engine = new RecommendationEngine(repo, ranking);
const queueGen = new NextUpQueueGenerator(repo, ranking);

// Advanced Core recommendation services
const candidateGen = new CandidateGenerationService(repo);
const similarityService = new SimilarityService();
const rankingService = new RankingService(similarityService);

export const recommendationService = new RecommendationService(
  engine,
  queueGen,
  candidateGen,
  rankingService
);
export const homeRecommendations = new HomeRecommendationModule(engine);
export const exploreRecommendations = new ExploreRecommendationModule(repo);
export const searchRecommendations = new SearchRecommendationModule(repo);
export const playerRecommendations = new PlayerRecommendationModule(queueGen);
export const recommendationCache = new RecommendationCache();

