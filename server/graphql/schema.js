import { makeExecutableSchema } from "graphql-tools";

import signInType from "./types/signin";
import resolvers from "./resolvers";

/*
    Parsing fails when these types do not have at least one field
    See https://github.com/apollographql/graphql-tools/issues/293
    Field hello is kept as the test field - it does not modify database in any way
    Querying this field will always return the string "World"
 */
const rootQuery = `
    type Query {
        hello: String
    }
    
    type Mutation {
        hello: String
    }
`;

export default makeExecutableSchema({
    typeDefs: [rootQuery, signInType],
    resolvers: resolvers,
});
