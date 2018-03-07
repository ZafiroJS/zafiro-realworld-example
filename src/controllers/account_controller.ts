import { inject } from "inversify";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { TYPE, MIDDLEWARE } from "../constants/types";
import { Repository } from "typeorm";
import { User } from "../interfaces";

@controller("/api/v1/account", MIDDLEWARE.Log)
export default class AccountController extends BaseHttpController {

    private readonly _repository: Repository<User>;

    public constructor(
        @inject(TYPE.UserRepository) repository: Repository<User>
    ) {
        super();
        this._repository = repository;
    }

    @httpGet("/")
    private async get() {
        return await this._repository.find();
    }

}
