import { Player } from "./Player";

export class Game{
id: number;

    constructor(public player: Player[]){
        this.id = Date.now();
    }
}