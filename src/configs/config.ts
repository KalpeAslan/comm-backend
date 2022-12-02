import {Env} from "../utils/env.utils";
import {communicationConfig} from "./communication.config";
import {authConfig} from "./auth.config";

export function config() {
    Env.init()
    return {
        communication: communicationConfig(),
        auth: authConfig()
    }
}