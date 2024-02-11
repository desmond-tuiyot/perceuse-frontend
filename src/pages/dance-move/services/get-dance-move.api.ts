import { QueryResult, gql, useQuery } from '@apollo/client'
import { DanceMove } from '../entities'

interface DanceMoveQueryResult {
  danceMoves: DanceMove[]
}

/**
 * A custom hook that fetches all dance moves
 * @returns an object with data, loading, and error properties
 */
const useGetDanceMoves = (): QueryResult<DanceMoveQueryResult> => {
  return useQuery<DanceMoveQueryResult>(GET_DANCE_MOVES)
}

const GET_DANCE_MOVES = gql`
  query getDanceMoves {
    danceMoves {
      id
      name
    }
  }
`

export default useGetDanceMoves