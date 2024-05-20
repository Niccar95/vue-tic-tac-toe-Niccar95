export class Player {
  constructor(
    public name: string,
    public x: boolean,
    public o: boolean,
    public start: number
  ) {
    this.name = name;
    this.x = x;
    this.o = o;
    this.start = start;
  }
}
