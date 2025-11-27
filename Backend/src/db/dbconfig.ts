import sql from 'mssql';
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// MSSQL DB Configuration using environment variables
export const Config = {
    sqlConfig: {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DB,
        port: 1433, // Default MSSQL port
        connectionTimeout: 15000,
        requestTimeout: 15000,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000,
        },
        options: {
            encryption: false, // Set to true if using Azure
            trustServerCertificate: true, // Set to true for local dev
            enableArithAbort: true,
        },
    },
};

let globalPool: sql.ConnectionPool | null = null;

// Initialize the Database Connection
export const initDatabaseConnection = async () => {
    if (globalPool && globalPool.connected) {
        console.log("Using existing Database Connection Pool");
        return globalPool;
    }

    try {
        console.log("Initializing new Database Connection Pool...");
        // @ts-ignore
        globalPool = await sql.connect(Config.sqlConfig);
        console.log("Successfully connected to MSSQL DB");
        return globalPool;

    } catch (error) {
        console.error("DB Connection Failed:", error);
        globalPool = null;
        throw error;
    }
};

// Helper to get the active pool in services
export const getDbPool = (): sql.ConnectionPool => {
    if (!globalPool || !globalPool.connected) {
        throw new Error('Database connection pool has not been initialized. Please call initDatabaseConnection first.');
    }
    return globalPool;
};

export default initDatabaseConnection;