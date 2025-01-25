export class Player {
  id: number;
  isCurrentPlayer: boolean;
  symbol:string
  points:number
  constructor(public playerName: string) {
    this.id = Date.now();
    this.isCurrentPlayer = false;
    this.symbol = '0'
    this.points = 0
  }
}
