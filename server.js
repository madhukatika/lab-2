const express = require('express')
const GraphQL = require('express-graphql').graphqlHTTP
const {
GraphQLSchema,
GraphQLObjectType,
GraphQLString,
GraphQLInt,
GraphQLNonNull,
GraphQLList
} = require('graphql')
const app = express()
const employees = [
{id: 1, emp_name:"madhu",emp_designation:'IT-Manager',emp_address:"hyd"},
{id: 2, emp_name:"mani",emp_designation:'Developers',emp_address:"banguloor"},
{id: 3, emp_name:"deepa",emp_designation:'Tester',emp_address:"delhi"},
]
const EmployeeType = new GraphQLObjectType({
name:"Employee",
description:"Employee Schema",
fields:()=>({
id:{
type: new GraphQLNonNull(GraphQLInt)
 },
 emp_name:{

type: new GraphQLNonNull(GraphQLString)
 },

emp_designation:{

type: new GraphQLNonNull(GraphQLString)
},
emp_address:{
type: new GraphQLNonNull(GraphQLString)
 }
})

})
// Example GraphQL Query for Employees Data
const RootQueryType = new GraphQLObjectType({
name:"Query",
description:"Root Query",
 fields:()=>({
employee:{
type: EmployeeType,
description:"Fetch me a single employee",
args:{
id:{ type: GraphQLInt }
},
resolve: (parent, args)=> employees.find(item => item.id === args.id )
},
employees:{
type: new GraphQLList(EmployeeType),
description:"Fetch me all employees",
 resolve: ()=> employees
 },
})

})
// create a schema object using GraphQLSchema
const schema = new GraphQLSchema({
query:RootQueryType
})
// start the server with GraphQL
app.use('/',GraphQL({
schema:schema,
graphiql:true

}))
const PORT = 8081
app.listen(PORT,()=> console.log('GraphQL Server is Running!'))