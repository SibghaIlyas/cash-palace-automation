import type { Page, Request } from "@playwright/test";
import fs from "fs";

export function attachTransferRequestLogger(page: Page) {
  const hits: { url: string; method: string; postData?: string }[] = [];
    console.log("logger function");
  page.on("request", (req: Request) => {
    const method = req.method().toUpperCase();
    
    if (method !== "POST") {
         console.log("i am returning")
         return;
    }
        

    const url = req.url();
    const postData = req.postData() ?? undefined;

    // Heuristic: transfer payload usually contains "recipient" + "amount"
    if (postData && /recipient/i.test(postData) && /amount/i.test(postData)) {
      hits.push({ url, method, postData });
      fs.writeFileSync(
        "transfer-api-discovery.json",
        JSON.stringify({ discoveredAt: new Date().toISOString(), hits }, null, 2),
        "utf-8"
      );
      
    }
    else console.log("No call was sent!!!")
  });
}
