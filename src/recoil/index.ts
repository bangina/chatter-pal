import { atom } from "recoil";

const atomWithSessionStorage = ({
  key,
  defaultVal,
}: {
  key: string;
  defaultVal: string | null;
}) => {
  return atom<string | null>({
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

export const myScriptState = atomWithSessionStorage({
  key: "myScriptState",
  defaultVal: "",
});
export const generatedScriptState = atomWithSessionStorage({
  key: "generatedScriptState",
  defaultVal: "",
});
