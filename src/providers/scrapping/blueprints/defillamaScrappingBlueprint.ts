import { IPoolScrappingBlueprint, PoolBlueprintKeys, PoolField } from "../ScrappingTypes";

export const defillamaScrappingBlueprint: IPoolScrappingBlueprint = {
  poolName: PoolBlueprintKeys.defiLlama,
  //! change this later
  sourceUrl: "https://defillama.com/yields?token=USDC&token=USDT&token=USDT.E&token=DAI",
  tableSelector: "#__next > div.sc-b3542bcc-0.kIPIOz > div > main > div.sc-7b471c77-0.laCLKq > div:nth-child(2)",
  headers: [
    PoolField.Pool,
    PoolField.Project,
    PoolField.Chain,
    PoolField.TVL,
    PoolField.APY,
    PoolField.BaseAPY,
    PoolField.RewardAPY,
    PoolField.MonthlyAvgAPY,
  ],
};
