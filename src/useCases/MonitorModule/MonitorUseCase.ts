import { DynamicPageScrapper } from "@providers/scrapping/DynamicPageScrapper";
import { IPool, PoolBlueprintKeys } from "@providers/scrapping/ScrappingTypes";
import { provide } from "inversify-binding-decorators";

@provide(MonitorUseCase)
export class MonitorUseCase {
  constructor(private dynamicPageScrapper: DynamicPageScrapper) {}

  public async getPoolData(poolBlueprintKey: PoolBlueprintKeys): Promise<IPool[]> {
    return await this.dynamicPageScrapper.fetchDynamicContent(poolBlueprintKey);
  }
}
