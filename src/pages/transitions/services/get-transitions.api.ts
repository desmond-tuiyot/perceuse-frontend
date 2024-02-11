import { QueryResult, gql, useQuery } from '@apollo/client'

import { Transition } from '../entities'

interface GetTransitionsResult {
  transitions: Transition[]
}

const useGetTransitions = (): QueryResult<GetTransitionsResult> => {
  return useQuery<GetTransitionsResult>(GET_TRANSITIONS)
}

const GET_TRANSITIONS = gql`
  query getTransitions {
    transitions {
      id
      name
      description
      danceMove1 {
        id
        name
      }
      danceMove2 {
        id
        name
      }
    }
  }
`

export default useGetTransitions