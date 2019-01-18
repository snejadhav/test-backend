import * as Server from "./server";

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

process.on("uncaughtException", (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

// Define async start function
// @ts-ignore
const start = async () => {
    try {
        const server = await Server.init();
        await server.start();
        console.log("Server running at:", server.info.uri);
    } catch (err) {
        console.error("Error starting server: ", err.message);
        throw err;
    }
};

// Start the server
start();
