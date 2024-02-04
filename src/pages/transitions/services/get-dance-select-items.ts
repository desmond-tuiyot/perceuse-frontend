import { Form, FormInstance } from 'antd'

import { DanceSelectFieldType, DanceMoveItem } from '../entities'
import useGetDanceMoves from '../../dance-move/services/get-dance-move.api'
import useGetTransitions from './get-transitions.api'
import { DanceMove } from '../../dance-move/entities'

interface GetDanceSelectItemsParams {
  form: FormInstance<DanceSelectFieldType>
  item1Id: string
  item2Id: string
}

interface GetDanceSelectItemsHook {
  itemsList1: DanceMoveItem[]
  itemsList2: DanceMoveItem[]
}

/**
 * A custom hook that returns the list of dance moves that can be selected for each select input
 * @param item1Id - the id of the first select input form item
 * @param item2Id - the id of the second select input form item
 * @param form - the form instance
 * @returns a list of dance moves that can be displayed/selected for each select input
 */
const useGetDanceSelectItems = (args: GetDanceSelectItemsParams): GetDanceSelectItemsHook => {
  const { item1Id, item2Id, form } = args
  const danceMovesHook = useGetDanceMoves()
  const transitionsHook = useGetTransitions()
  
  const selectedMove1 = Form.useWatch(item1Id, form)
  const selectedMove2 = Form.useWatch(item2Id, form)

  /**
   * @param selectedMove - the id of the selected dance move
   * @returns an array of dance moves that do not include the selected move
   */
  const getUnselectedMoves = (selectedMove: number): DanceMove[] => {
    return danceMovesHook?.data?.danceMoves.filter(move => move.id !== selectedMove) || []
  }

  /**
   * Checks if a transition already exists between two dance moves
   * @param move1Id - the id of the first dance move
   * @param move2Id - the id of the second dance move
   * @returns boolean - true if a transition exists, false otherwise
   */
  const checkIfTransitionExists = (move1Id: number, move2Id: number): boolean => {
    const transitions = transitionsHook?.data?.transitions || []
    return transitions.some(transition => {
      return (transition.danceMove1.id === move1Id && transition.danceMove2.id === move2Id) ||
        (transition.danceMove1.id === move2Id && transition.danceMove2.id === move1Id)
    })
  }

  /**
   * @param danceMoves - an array of dance moves
   * @returns an array of objects with `value` and `label` properties - format is compatible
   * with the `Select` component from Ant Design
   */
  const formatDanceSelectItems = (danceMoves: DanceMove[]): DanceMoveItem[] => {
    return danceMoves.map(move => ({
      value: move.id,
      label: move.name
    }))
  }

  /**
   * @param selectedMove - the id of the selected dance move
   * @returns list of dance moves that can be selected for the select input
   */
  const getDanceSelectItems = (selectedMove: number): DanceMoveItem[] => {
    const unselectedMoves = getUnselectedMoves(selectedMove)
    const movesWithoutExistingTransitions = unselectedMoves.filter(move => !checkIfTransitionExists(move.id, selectedMove))
    return formatDanceSelectItems(movesWithoutExistingTransitions)
  }

  return {
    itemsList1: getDanceSelectItems(selectedMove2),
    itemsList2: getDanceSelectItems(selectedMove1)
  }
}

export default useGetDanceSelectItems
