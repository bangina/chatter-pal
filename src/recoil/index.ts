import { atom } from "recoil";

export const myScriptState = atom<string>({
  key: "myScriptState",
  default: "",
});

export const generatedScriptState = atom<string | null>({
  key: "generatedScriptState",
  default: "",
});
