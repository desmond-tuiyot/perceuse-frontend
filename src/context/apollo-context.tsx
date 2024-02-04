import { ApolloClient, InMemoryCache, ApolloProvider as ApolloProviderActual } from '@apollo/client'

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
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