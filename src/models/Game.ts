import { Player } from "./Player";

export class Game{
id: number;

    constructor(public players: Player[]){
        this.id = Date.now();
    }
}