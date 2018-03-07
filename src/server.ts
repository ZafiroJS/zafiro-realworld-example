import "reflect-metadata";
import chalk from "chalk";
import { createApp } from "zafiro";
import { bindings } from "./config/ioc_config";
import { expressConfig } from "./config/express_config";
import CustomAccountRepository from "./repositories/account_repository";

(async () => {

    try {
        const result = await createApp({
            database: "postgres",
            containerModules: [bindings],
            AccountRepository: CustomAccountRepository,
            expressConfig: expressConfig
        });

        result.app.listen(
            3000,
            () => console.log(
                chalk.green("Example app listening on port 3000!")
            )
        );

    } catch (e) {
        console.log(chalk.redBright(e.message));
    }

})();
