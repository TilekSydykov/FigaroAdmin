import {Terminal} from "../terminal";

export class AddTerminalResponse {
  Value: Terminal = new Terminal();
  Error: any;
  RowAffected: number = 0;
}
