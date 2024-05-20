import { provide } from "inversify-binding-decorators";
import puppeteer from "puppeteer";
import { IPool, PoolBlueprintKeys, PoolField } from "./ScrappingTypes";
import { poolBlueprintsIndex } from "./blueprints";

@provide(DynamicPageScrapper)
export class DynamicPageScrapper {
  async fetchDynamicContent(poolBlueprintKey: PoolBlueprintKeys): Promise<IPool[]> {
    console.log(`Fetching blueprint for key: ${poolBlueprintKey}`);
    const poolBlueprint = poolBlueprintsIndex[poolBlueprintKey];

    if (!poolBlueprint) {
      throw new Error(`Pool blueprint not found for key: ${poolBlueprintKey}`);
    }
    console.log("Blueprint found:", poolBlueprint);

    console.log("Launching browser...");
    const browser = await puppeteer.launch({}); // Set headless to false to visualize the browser
    const page = await browser.newPage();

    console.log(`Navigating to URL: ${poolBlueprint.sourceUrl}`);
    await page.goto(poolBlueprint.sourceUrl, { waitUntil: "networkidle0" });

    console.log("Waiting for content to load...");
    await page.waitForSelector(poolBlueprint.tableSelector, { visible: true, timeout: 60000 }); //

    // Take a screenshot after the page loads
    console.log("Taking screenshot of the loaded page...");
    await page.screenshot({ path: "loaded_page.png" });

    console.log("Evaluating page content...");
    const data = await page.evaluate((poolBlueprint) => {
      const results: IPool[] = [];
      console.log(`Selecting rows with selector: ${poolBlueprint.tableSelector}`);

      const rows = document.querySelectorAll(`${poolBlueprint.tableSelector} tr`);

      if (!rows.length) {
        console.error("No rows found.");
        return [];
      }

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const pool: Partial<IPool> = {};

        poolBlueprint.headers.forEach((header, index) => {
          console.log(`Processing header: ${header}`);
          switch (header) {
            case PoolField.Pool:
              pool.name = cells[index]?.innerText || "";
              break;
            case PoolField.Project:
              pool.project = cells[index]?.innerText || "";
              break;
            case PoolField.Chain:
              pool.chain = cells[index]?.innerText || "";
              break;
            case PoolField.TVL:
              pool.TVL = cells[index]?.innerText || "";
              break;
            case PoolField.APY:
              pool.APY = parseFloat(cells[index]?.innerText || "0");
              break;
            case PoolField.BaseAPY:
              pool.baseAPY = parseFloat(cells[index]?.innerText || "0");
              break;
            case PoolField.RewardAPY:
              pool.rewardAPY = parseFloat(cells[index]?.innerText || "0");
              break;
            case PoolField.MonthlyAvgAPY:
              pool.monthlyAvgAPY = parseFloat(cells[index]?.innerText || "0");
              break;
          }
        });

        console.log("Adding pool:", pool);
        results.push(pool as IPool);
      });

      return results;
    }, poolBlueprint);

    console.log("Closing browser...");
    await page.close();
    await browser.close();
    console.log("Data fetched:", data);
    return data;
  }
}
