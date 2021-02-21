import {Terminal} from "../terminal";
import {TerminalGroup} from "../terminal-group";

export class AddTerminalGroupResponse {
  Value: TerminalGroup = new TerminalGroup();
  Error: any;
  RowAffected: number = 0;
}
