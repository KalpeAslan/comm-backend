import {Env} from "../utils/env.utils";
import {communicationConfig} from "./communication.config";

export function config() {
    Env.init()

    return {
        communicationConfig: communicationConfig()
    }
}