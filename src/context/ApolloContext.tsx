import { ApolloClient, InMemoryCache, ApolloProvider as ApolloProviderActual } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://perceuse-api-dev-08218182df5d.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ApolloProviderActual client={client}>
      {children}
    </ApolloProviderActual>
  )
}

export default ApolloProvider