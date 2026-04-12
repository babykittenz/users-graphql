// developmental playground can be commented out
import expressPlayground from "graphql-playground-middleware-express";

import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { userSchema as schema } from "./schema/userSchema";

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/graphql", createHandler({ schema }));

// developmental playground can be commented out
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
