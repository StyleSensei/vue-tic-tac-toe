import { Player } from "./Player";

export class Game{
id: number;
winner: string

    constructor(public players: Player[]){
        this.id = Date.now();
        this.winner = ''
    }
}