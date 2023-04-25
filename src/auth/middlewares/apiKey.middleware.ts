import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {xCommApiKey} from "../../constants/common.constants";

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if(!req.headers[xCommApiKey]) return res.status(400).send({
            message: "Set 'x-comm-apikey' header",
            status: 400
        })
        next();
    }
}