import { PoolBlueprintKeys } from "@providers/scrapping/ScrappingTypes";
import { Request, Response } from "express";
import { controller, httpGet, interfaces, request, requestParam, response } from "inversify-express-utils";
import { MonitorUseCase } from "./MonitorUseCase";

@controller("/monitors")
export class MonitorController implements interfaces.Controller {
  constructor(private monitorUseCase: MonitorUseCase) {}

  @httpGet("/:poolId")
  private async getPoolData(@request() req: Request, @response() res: Response, @requestParam() params): Promise<any> {
    const poolId = params.poolId as PoolBlueprintKeys;

    const result = await this.monitorUseCase.getPoolData(poolId);

    return res.status(200).send(result);
  }
}
