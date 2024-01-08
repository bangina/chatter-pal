import { useRecoilValue, useSetRecoilState } from "recoil";
import openAIClient from "../api/openai/openAIClient";
import Button from "../components/common/Button";
import GeneratedScript from "../components/prestudy/GeneratedScript";
import MyScript from "../components/prestudy/MyScript";
import { generatedScriptState, myScriptState } from "../recoil";
import { useState } from "react";
import { GeneratingType } from "../types/prestudy";
const systemMessage = (type: GeneratingType) => {
  switch (type) {
    case GeneratingType.GRAMMAR:
      return "Please correct grammar errors from my script provided above. I want the output to be like below; (1) full rewritten script(corrected texts should be font-weight 700 and red color text.) (2) bullet-point format list of grammar errors you corrected and detailed explanation on why each were corrected.";
    case GeneratingType.VOCABULARY:
      return "Rewrite the answer provided above with more sophisticated, diverse, and professional vocabulary.";
    case GeneratingType.CONVERSATIONAL:
      return "Rewrite the answer provided above a suitable version for verbal communication.";
  }
};
function Prestudy() {
  const [isLoading, setIsLoading] = useState(false);
  const myScript = useRecoilValue(myScriptState);
  const setGeneratedScript = useSetRecoilState(generatedScriptState);
  const createChatCompletion = async ({
    content,
    type,
  }: {
    content: string;
    type: GeneratingType;
  }) => {
    return await openAIClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessage(type),
        },
        {
          role: "user",
          content: `[MY SCRIPT starts] ${content} [MY SCRIPT ends]`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
  };
  const handleClickGenerateBtn = async (generatingType: GeneratingType) => {
    if (!myScript) return alert("스크립트를 입력해주세요.");
    setIsLoading(true);

    try {
      const chatCompletion = await createChatCompletion({
        content: myScript,
        type: generatingType,
      });
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
      <Button
        onClick={() => handleClickGenerateBtn(GeneratingType.GRAMMAR)}
        label="문법 체크✅"
      />
      <Button
        onClick={() => handleClickGenerateBtn(GeneratingType.VOCABULARY)}
        label="어휘 향상🌈"
      />
      <Button
        onClick={() => handleClickGenerateBtn(GeneratingType.CONVERSATIONAL)}
        label="대화 버전💬"
      />
      <GeneratedScript />
    </>
  );
}

export default Prestudy;
