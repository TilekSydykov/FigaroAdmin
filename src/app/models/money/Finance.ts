import {Nominal} from "./Nominal";

export class Finance {
  nominals: Array<Nominal> = new Array<Nominal>();
  sum: number = 0;
  constructor(data: string) {
    this.nominals = JSON.parse(data);
    this.nominals.forEach(i => {
      this.sum += Number(i.n) * i.c
    })
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  }

}
