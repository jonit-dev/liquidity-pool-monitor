export enum PoolField {
  Pool = "Pool",
  Project = "Project",
  TVL = "TVL",
  APY = "APY",
  Chain = "Chain",
  BaseAPY = "Base APY",
  RewardAPY = "Reward APY",
  MonthlyAvgAPY = "Monthly Avg APY",
}

export enum PoolBlueprintKeys {
  defiLlama = "defi-llama",
}

export interface IPool {
  name: string;
  project: string;
  chain: string;
  TVL: string;
  APY: number;
  baseAPY: number;
  rewardAPY: number;
  monthlyAvgAPY: number;
}

export interface IPoolScrappingBlueprint {
  poolName: string;
  sourceUrl: string;
  tableSelector: string;
  headers: PoolField[];
}
