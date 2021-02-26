import {Terminal} from "../terminal";
import {TerminalGroup} from "../terminal-group";
import {Group} from "../group";

export class AddGroupResponse {
  Value: Group = new Group();
  Error: any;
  RowAffected: number = 0;
}
