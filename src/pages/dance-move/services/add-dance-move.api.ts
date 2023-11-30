import { ApolloError, gql, useMutation, FetchResult } from '@apollo/client'

interface AddDanceMoveParams {
  data: {
    name: string
  }
}

interface AddDanceMoveResult {
  createOneDanceMove: {
    name: string
  }
}

interface AddDanceMoveHookReturnValue {
  call: (params: AddDanceMoveParams) => Promise<FetchResult<AddDanceMoveResult>>
  loading: boolean
  error: ApolloError | undefined
}

/**
 * A custom hook that runs a mutation to add a dance move
 * @returns an object with a `call` function to run the mutation,
 *  as well as `loading` and `error` states
 */
const useAddDanceMove = (): AddDanceMoveHookReturnValue => {
  const [addDanceMove, { loading, error }] = useMutation<AddDanceMoveResult, AddDanceMoveParams>(ADD_DANCE_MOVE)

  const call = async (parameters: AddDanceMoveParams): Promise<FetchResult<AddDanceMoveResult>> => {
    return await addDanceMove({ variables: parameters })
  }

  return { call, loading, error }
}

const ADD_DANCE_MOVE = gql`
  mutation createOneDanceMove ($data: DanceMoveCreateInput!) {
    createOneDanceMove(data: $data) {
      name
    }
  }
`

export default useAddDanceMove