import { ApolloError, FetchResult, gql, useMutation } from '@apollo/client'

interface RemoveTransitionParams {
  where: {
    id: number
  }
}

interface RemoveTransitionResult {
  deleteOneTransition: {
    id: number
  }
}

interface RemoveTransitionHookReturnValue {
  call: (id: number) => Promise<FetchResult<RemoveTransitionResult>>
  loading: boolean
  error: ApolloError | undefined
}

/**
 * A hook to remove a transition
 * @returns - a mutation object with the call function, loading state and error state
 */
const useRemoveTransition = (): RemoveTransitionHookReturnValue => {
  const [removeTransition, { loading, error }] = useMutation<RemoveTransitionResult, RemoveTransitionParams>(REMOVE_TRANSITION)

  const call = async (id: number) => {
    return await removeTransition({ variables: {
      where: { id }
    }})
  }

  return {
    call,
    loading,
    error
  }
}

const REMOVE_TRANSITION = gql`
  mutation removeTransition($where: TransitionWhereUniqueInput!) {
    deleteOneTransition(where: $where) {
      id
    }
  }
`

export default useRemoveTransition
