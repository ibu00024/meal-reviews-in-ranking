import {interfaces} from "inversify";

function logger(planAndResolve: interfaces.Next): interfaces.Next {
    return (args: interfaces.NextArgs) => {
        let timestamp = new Date().toISOString();

        try {
            return planAndResolve(args);
        } catch (error) {
            console.error(`[${timestamp}] ERROR:`, error);
            throw error;
        }
    };
}

export default logger;