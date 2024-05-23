export class Player {
  id: number;
  currentPlayer: boolean;
  symbol:string
  points:number
  constructor(public playerName: string) {
    this.id = Date.now();
    this.currentPlayer = false;
    this.symbol = '0'
    this.points = 0
  }
}
