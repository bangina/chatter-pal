import { useRecoilValue, useSetRecoilState } from "recoil";
import openAIClient from "../api/openai/openAIClient";
import Button from "../components/common/Button";
import GeneratedScript from "../components/prestudy/GeneratedScript";
import MyScript from "../components/prestudy/MyScript";
import { generatedScriptState, myScriptState } from "../recoil";
import { useState } from "react";

function Prestudy() {
  const [isLoading, setIsLoading] = useState(false);
  const myScript = useRecoilValue(myScriptState);
  const setGeneratedScript = useSetRecoilState(generatedScriptState);
  const createChatCompletion = async (script: string) => {
    return await openAIClient.chat.completions.create({
      messages: [
        {
          role: "user",
          content: script,
        },
      ],
      model: "gpt-3.5-turbo",
    });
  };
  const handleClickGrammarCheck = async () => {
    if (!myScript) return alert("스크립트를 입력해주세요.");
    setIsLoading(true);

    try {
      const chatCompletion = await createChatCompletion(myScript);
      setGeneratedScript(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MyScript />
      {isLoading && "loading..."}
      <Button onClick={handleClickGrammarCheck} label="문법 체크✅" />
      <Button label="어휘 향상🌈" />
      <Button label="대화 버전💬" />
      <GeneratedScript />
    </>
  );
}

export default Prestudy;
