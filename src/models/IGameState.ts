import { Game } from "./Game"
import { IResult } from "./IResult"
import { Player } from "./Player"

export interface IGameSate {
    games: Game[]
    players: Player[]
results: IResult[]
}