import { ApolloError, gql, useMutation, FetchResult } from '@apollo/client'

interface RemoveDanceMoveParams {
  where: {
    id: number
  }
}

interface RemoveDanceMoveResult {
  deleteOneDanceMove: {
    id: number
  }
}

interface RemoveDanceMoveHookReturnValue {
  call: (id: number) => Promise<FetchResult<RemoveDanceMoveResult>>
  loading: boolean
  error: ApolloError | undefined
}

/**
 * A custom hook that runs a mutation to remove a dance move
 * @returns a function to run the mutation, as well as `loading` and `error` states
 */
const useRemoveDanceMove = (): RemoveDanceMoveHookReturnValue => {
  const [removeDanceMove, { loading, error }] = useMutation<RemoveDanceMoveResult, RemoveDanceMoveParams>(REMOVE_DANCE_MOVE)

  const call = async (id: number): Promise<FetchResult<RemoveDanceMoveResult>> => {
    return await removeDanceMove({ variables: {
      where: { id }
    }})
  }

  return { call, loading, error }
}


const REMOVE_DANCE_MOVE = gql`
  mutation deleteOneDanceMove ($where: DanceMoveWhereUniqueInput!) {
    deleteOneDanceMove(where: $where) {
      id
    }
  }
`

export default useRemoveDanceMove
