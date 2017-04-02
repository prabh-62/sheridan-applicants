'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require('graphql')
const {getInquiryById, getInquiries, createInquiry} = require('./data')
const {nodeInterface} = require('./interface')

const PORT = process.env.PORT || 3000
const server = express()

const inquiryType = new GraphQLObjectType({
  name: 'Inquiry',
  description: 'Student inquiry about the speific course',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: ' The id of the inquiry Object'
    },
    firstName: {
      type: GraphQLString,
      description: 'First name of the user'
    },
    lastName: {
      type: GraphQLString,
      description: 'Last name of the user'
    },
    email: {
      type: GraphQLString,
      description: 'Contact email of the user'
    },
    program: {
      type: GraphQLString,
      description: 'Program user is interest in'
    },
    request: {
      type: GraphQLString,
      description: 'Program Inquiry'
    },
    requestDate: {
      type: GraphQLString,
      description: 'Date the inquiry was made'
    }
  },
  interfaces: [nodeInterface]
})
exports.inquiryType = inquiryType

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    inquiries: {
      type: new GraphQLList(inquiryType),
      resolve: getInquiries
    },
    inquiry: {
      type: inquiryType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the video'
        }
      },
      resolve: (_, args) => {
        return getInquiryById(args.id)
      }
    }
  }
})

const inquiryInputType = new GraphQLInputObjectType({
  name: 'inquiryInput',
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'First name of the user'
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Last name of the user'
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Contact email of the user'
    },
    program: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Program user is interest in'
    },
    request: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Program Inquiry'
    },
    requestDate: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Date the inquiry was made'
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: ' The root mutation type',
  fields: {
    createInquiry: {
      type: inquiryType,
      args: {
        inquiry: {
          type: new GraphQLNonNull(inquiryInputType)
        }
      },
      resolve: (_, args) => {
        return createInquiry(args.inquiry)
      }
    }
  }
})
const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

const config = graphqlHTTP({
  schema,
  graphiql: true
})

server.use(cors())
server.use('/graphql', config)

server.listen(PORT, () => {
  console.log(`Listening on http://locahost:${PORT}`)
})
