"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server = require("./server");
console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);
process.on("uncaughtException", (error) => {
    console.error(`uncaughtException ${error.message}`);
});
// Catch unhandling rejected promises
process.on("unhandledRejection", (reason) => {
    console.error(`unhandledRejection ${reason}`);
});
// Define async start function
// @ts-ignore
const start = async () => {
    try {
        const server = await Server.init();
        await server.start();
        console.log("Server running at:", server.info.uri);
    }
    catch (err) {
        console.error("Error starting server: ", err.message);
        throw err;
    }
};
// Start the server
start();
