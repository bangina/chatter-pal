import { atom } from "recoil";

export const myScriptState = atom<string>({
  key: "myScriptState",
  default: "",
});
