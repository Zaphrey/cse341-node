const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function main() {
    dotenv.config();

    const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustercse341.mngxo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCSE341`;
    const client = new MongoClient(connectionString);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    };
};

module.exports = {
    main,
}