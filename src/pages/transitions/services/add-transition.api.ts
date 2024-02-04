import { ApolloError, gql, useMutation, FetchResult } from '@apollo/client'

interface AddTransitionParams {
  danceMove1Id: number
  danceMove2Id: number
  name?: string
  description?: string
}

interface AddTransitionResult {
  createTransition: {
    id: number
  }
}

interface AddTransitionHookReturnValue {
  call: (params: AddTransitionParams) => Promise<FetchResult<AddTransitionResult>>
  loading: boolean
  error: ApolloError | undefined
}

/**
 * A custom hook that runs a mutation to add a transition
 * @returns an object with a `call` function to run the mutation,
 *  as well as `loading` and `error` states
 */
const useAddTransition = (): AddTransitionHookReturnValue => {
  const [addTransition, { loading, error }] = useMutation<AddTransitionResult, AddTransitionParams>(CREATE_TRANSITION)

  const call = async (parameters: AddTransitionParams): Promise<FetchResult<AddTransitionResult>> => {
    return await addTransition({ variables: parameters })
  }

  return { call, loading, error }
}

const CREATE_TRANSITION = gql`
  mutation createTransition(
    $danceMove1Id: Float!,
    $danceMove2Id: Float!,
    $name: String,
    $description: String
  ) {
    createTransition(
      danceMove1Id: $danceMove1Id,
      danceMove2Id: $danceMove2Id,
      name: $name,
      description: $description
    ) {
      id
    }
  }
`

export default useAddTransition