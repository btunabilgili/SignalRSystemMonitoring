import { ServiceResponse } from "@serenity-is/corelib";
import { StatusItem } from "./StatusItem";

export interface SystemStatusResponse extends ServiceResponse {
    CpuStatus?: StatusItem;
    MemoryStatus?: StatusItem;
}
