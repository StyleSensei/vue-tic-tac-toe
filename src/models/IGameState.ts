import { Game } from "./Game"
import { IResult } from "./IResult"
import { Player } from "./Player"

export interface IGameState {
    games: Game[]
    players: Player[]
results: IResult[],
gameRunning: boolean,
currentPlayer:string
board:[string[],string[],string[]]
}