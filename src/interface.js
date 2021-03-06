const {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')
const {videoType} = require('./index')

const nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolveType: object => {
    if (object.title) {
      return videoType
    }
    return null
  }
})

exports.nodeInterface = nodeInterface
