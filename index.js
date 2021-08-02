import express from "express";
import { schema } from "./schema/schema.js";
import cors from "cors";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";


const app = express();
dotenv.config();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen(4000,()=>console.log(`Server running on port:4000`))
