export interface SlotProps {
    selected: boolean;
    onPress: (position: Position) => void
}
export interface GridSlot {
    value: boolean;
    id: string;
}

export type Row = GridSlot[]

export type Grid = Row[]

export interface Position {
    x: number;
    y: number
}