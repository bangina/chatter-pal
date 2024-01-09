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
      return `"Please correct grammar errors and explain the reason in Korean sentence by sentence from my script provided above.
      I want the output to be like below, so that I can parse the output easily. 
      (1)each sentence starts with [item_starts] and ends with [item_ends].
      (2)if there are no grammar errors in a sentence, please write "no error".
      (2)original words that should be changed/corrected starts with [original_starts] and ends with [original_ends].
      (3)changed/corrected words should be in [changed_starts] and ends with [changed_ends].
      (4)changed/corrected words should be attached to the original words in the original sentence.
      (4)explanation on why each were changed/corrected should be in [explanation_starts] and ends with [explanation_ends].
      (5)no line break should be used.
      (6)if there are multiple errors in a sentence, please changed/correct them all.
      
      for example the output is like below;, 
      [item_starts] I didn’t take it seriously because I assumed that [original_starts]it's[original_ends] [changed_starts]it was[corrected_ends] just one of the common problems \n
      [explanation_starts]the verb should be in past tense because the sentence is in past tense. Since the author is referring to a past event, "assumed" in the previous sentence is also in the past tense. [explanation_ends] [item_ends]
      "`;
    case GeneratingType.VOCABULARY:
      return `"Rewrite the answer provided above with more sophisticated, diverse, and professional vocabulary."
      I want the output to be like below, so that I can parse the output easily. 
      (1)each sentence should start with [item_starts] and ends with [item_ends].
      (2)original sentence should start with [original_starts] and ends with [original_ends].
      (3)changed sentence should be in [changed_starts] and ends with [changed_ends].
      (4)no line break should be used.
      (5)key words of each sentence should be marked with [key_starts] and [key_ends]. 
      (5-1)key words means the words that are important in the sentence, or the words that are changed/corrected, or the words that are advanced. 
      (6)[**_starts] and [**_ends] should always be used in pairs.
      
      
      
      for example the output is like below;, 
      [item_starts]
      [original_starts]I didn’t really know much about the economic situation of the UK before reading this article.
      [original_ends] 
      [changed_starts][key_starts]Prior to[key_ends] reading this article, I [key_starts]had limited knowledge[key_ends] about the economic situation in the UK.
      [changed_ends]
      [item_ends]
      [item_starts]
      [original_starts]I was aware of the rent crisis in London, but I didn’t take it seriously because I assumed that it’s just one of the common problems that metropolitan cities are going through.
      [original_ends] 
      [changed_starts]While I was vaguely aware of the rent crisis in London, I didn't consider it a [key_starts]significant[key_ends] issue, assuming it was a common challenge typical of metropolitan areas.
      [changed_ends]
      [item_ends]
      `;
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
      if (chatCompletion.choices[0].message.content !== null) {
        setGeneratedScript(chatCompletion.choices[0].message.content);
      }
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
