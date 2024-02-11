import { ApolloClient, InMemoryCache, ApolloProvider as ApolloProviderActual } from '@apollo/client'

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL as string || 'http://localhost:4000/graphql',
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