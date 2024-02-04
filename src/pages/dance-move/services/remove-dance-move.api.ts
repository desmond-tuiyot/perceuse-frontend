import { ApolloError, gql, useMutation, FetchResult } from '@apollo/client'

interface RemoveDanceMoveParams {
  where: {
    id: string
  }
}

interface RemoveDanceMoveResult {
  deleteOneDanceMove: {
    id: string
  }
}

interface RemoveDanceMoveHookReturnValue {
  call: (id: string) => Promise<FetchResult<RemoveDanceMoveResult>>
  loading: boolean
  error: ApolloError | undefined
}

const useRemoveDanceMove = (): RemoveDanceMoveHookReturnValue => {
  const [removeDanceMove, { loading, error }] = useMutation<RemoveDanceMoveResult, RemoveDanceMoveParams>(REMOVE_DANCE_MOVE)

  const call = async (id: string): Promise<FetchResult<RemoveDanceMoveResult>> => {
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
