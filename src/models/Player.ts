export class Player {
  id: number;
  currentPlayer: boolean;
  constructor(public playerName: string) {
    this.id = Date.now();
    this.currentPlayer = false;
  }
}
