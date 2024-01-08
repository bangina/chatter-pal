import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "../components/common/Button";
import GeneratedScript from "../components/prestudy/GeneratedScript";
import MyScript from "../components/prestudy/MyScript";
import OpenAI from "openai";
import { generatedScriptState, myScriptState } from "../recoil";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  maxRetries: 1,
});
function Prestudy() {
  const myScript = useRecoilValue(myScriptState);
  const setGeneratedScript = useSetRecoilState(generatedScriptState);
  const handleClickGrammarCheck = async () => {
    if (!myScript) return alert("스크립트를 입력해주세요.");
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: myScript,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      setGeneratedScript(chatCompletion.choices[0].message.content);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
  return (
    <>
      <MyScript />
      <Button onClick={handleClickGrammarCheck} label="문법 체크✅" />
      <Button label="어휘 향상🌈" />
      <Button label="대화 버전💬" />
      <GeneratedScript />
    </>
  );
}

export default Prestudy;
