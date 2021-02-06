import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export const MAX_WIDTH: number = width
export const MAX_HEIGHT: number = height

const BLOCKS = Math.floor(MAX_WIDTH / 23)


export const ROWS = BLOCKS
export const COLS = BLOCKS