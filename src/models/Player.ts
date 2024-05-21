export class Player {
  id: number;
  currentPlayer: boolean;
  symbol:string
  constructor(public playerName: string) {
    this.id = Date.now();
    this.currentPlayer = false;
    this.symbol = '0'
  }
}
