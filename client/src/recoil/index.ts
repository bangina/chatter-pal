import { atom } from "recoil";
import { GeneratingType } from "../types/prestudy";

const atomWithSessionStorage = ({
  key,
  defaultVal,
}: {
  key: string;
  defaultVal: string;
}) => {
  return atom<string>({
    key,
    default: defaultVal,
    effects: [
      ({ setSelf, onSet }) => {
        const savedData = sessionStorage.getItem(key);
        if (savedData) setSelf(JSON.parse(savedData));

        onSet((newValue, _, isReset) => {
          isReset
            ? sessionStorage.removeItem(key)
            : sessionStorage.setItem(key, JSON.stringify(newValue));
        });
      },
    ],
  });
};

export const titleState = atomWithSessionStorage({
  key: "titleState",
  defaultVal: "",
});
export const myScriptState = atomWithSessionStorage({
  key: "myScriptState",
  defaultVal: "",
});

export type generatedScriptsStateType = {
  [key in GeneratingType]: string;
};

export const generatedScriptsState = atom<generatedScriptsStateType>({
  key: "generatedScriptsState",
  default: {
    [GeneratingType.GRAMMAR]: "",
    [GeneratingType.VOCABULARY]: "",
    [GeneratingType.CONVERSATIONAL]: "",
  },
});
