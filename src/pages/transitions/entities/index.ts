export interface Transition {
  id: number
  name?: string
  description?: string
  danceMove1: {
    id: number
    name: string
  }
  danceMove2: {
    id: number
    name: string
  }
}

export interface DanceSelectFieldType {
  danceMove1: number
  danceMove2: number
}

export interface DanceMoveItem {
  value: number
  label: string
}
