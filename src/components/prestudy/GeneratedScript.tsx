import { useRecoilValue } from "recoil";
import Button from "../common/Button";
import Title from "../common/Title";
import { generatedScriptState } from "../../recoil";
import openAIClient from "../../api/openai/openAIClient";
import { useState } from "react";
const parseScript = (script: string) => {
  const replacements = [
    {
      searchFor: "[item_starts]",
      replaceWith: "<li style='margin-bottom: 12px;'>",
    },
    { searchFor: "[item_ends]", replaceWith: "</li>" },
    {
      searchFor: "[original_starts]",
      replaceWith: "<span style='color:red; text-decoration:line-through'>",
    },
    { searchFor: "[original_ends]", replaceWith: "</span>" },
    {
      searchFor: "[corrected_starts]",
      replaceWith: "<span style='color:green'>",
    },
    { searchFor: "[corrected_ends]", replaceWith: "</span>" },
    {
      searchFor: "[key_starts]",
      replaceWith: "<span style='font-weight:600'>",
    },
    { searchFor: "[key_ends]", replaceWith: "</span>" },
    {
      searchFor: "[changed_starts]",
      replaceWith: "<span style='color:green'>",
    },
    { searchFor: "[changed_ends]", replaceWith: "</span>" },
    {
      searchFor: "[explanation_starts]",
      replaceWith: "<p style='font-style:italic; margin-bottom: 12px;'> ➡ ",
    },
    { searchFor: "[explanation_ends]", replaceWith: "</p>" },
  ];

  return replacements.reduce((text, { searchFor, replaceWith }) => {
    return text.replaceAll(searchFor, replaceWith);
  }, script);
};
const copyToClipboard = async (script: string) => {
  try {
    await navigator.clipboard.writeText(script);
    alert("복사되었습니다.");
  } catch (error) {
    alert("복사에 실패했습니다.");
  }
};

function GeneratedScript() {
  const generatedScript = useRecoilValue(generatedScriptState);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (audio: HTMLAudioElement) => {
    audio.play();
    setIsPlaying(true);
  };
  const pauseAudio = (audio: HTMLAudioElement) => {
    audio.pause();
    setIsPlaying(false);
  };
  const createAndPlayAudio = (audioURL: string) => {
    const newAudio = new Audio(audioURL);
    setAudio(newAudio);
    playAudio(newAudio);
  };
  const handleClickTTS = async (script: string) => {
    // if the audio is already in the sessionstorage, play it
    const storedAudioURL = sessionStorage.getItem("audio");
    if (storedAudioURL) {
      if (!audio) {
        createAndPlayAudio(storedAudioURL);
      } else {
        isPlaying ? pauseAudio(audio) : playAudio(audio);
      }
      return;
    }

    // if the audio is not in the sessionstorage, make a request to the openai api and play it
    const mp3 = await openAIClient.audio.speech.create({
      model: "tts-1",
      input: script,
      voice: "alloy",
      response_format: "mp3",
    });
    const audioBlob = await mp3.arrayBuffer();
    const audioURL = window.URL.createObjectURL(
      new Blob([audioBlob], { type: "audio/mp3" })
    );

    createAndPlayAudio(audioURL);

    // store the audio in the sessionstorage so that it can be replayed without making another request
    sessionStorage.setItem("audio", audioURL);
  };

  return (
    <section>
      <Title label="실행 결과" />
      {generatedScript !== "" && (
        <>
          <Button
            label="Copy"
            onClick={() => copyToClipboard(generatedScript)}
          />
          <Button
            label={isPlaying ? "멈춤" : "읽어주세요"}
            onClick={() => handleClickTTS(generatedScript)}
          />
          <article className="border border-gray-300 rounded-md p-[16px] text-[14px] tracking-tight">
            <ul
              dangerouslySetInnerHTML={{
                __html: parseScript(generatedScript),
              }}
            />
          </article>
        </>
      )}
    </section>
  );
}

export default GeneratedScript;
