import { useRecoilValue } from "recoil";
import Button from "../common/Button";
import Title from "../common/Title";
import { generatedScriptState } from "../../recoil";
import openAIClient from "../../api/openai/openAIClient";
import { useState } from "react";

function GeneratedScript() {
  const generatedScript = useRecoilValue(generatedScriptState);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const parsedScript = (script: string) => {
    if (!script.includes("[original_starts]")) return script;
    return script
      .replaceAll("[item_starts]", "<li style='margin-bottom: 12px;'>")
      .replaceAll("[item_ends]", "</li>")
      .replaceAll(
        "[original_starts]",
        "<span style='color:red; text-decoration:line-through'>"
      )
      .replaceAll("[original_ends]", "</span>")
      .replaceAll("[corrected_starts]", "<span style='color:green'>")
      .replaceAll("[corrected_ends]", "</span>")
      .replaceAll("[key_starts]", "<span style='font-weight:600'>")
      .replaceAll("[key_ends]", "</span>")
      .replaceAll("[changed_starts]", "<span style='color:green'>")
      .replaceAll("[changed_ends]", "</span>")
      .replaceAll(
        "[explanation_starts]",
        "<p style='font-style:italic; margin-bottom: 12px;'> ➡ "
      )
      .replaceAll("[explanation_ends]", "</p>");
  };
  const handleClickCopy = async (script: string) => {
    try {
      await navigator.clipboard.writeText(script);
      alert("복사되었습니다.");
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  };
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
  console.log(generatedScript);

  return (
    <section>
      <Title label="실행 결과" />
      {generatedScript !== "" && (
        <>
          <Button
            label="Copy"
            onClick={() => handleClickCopy(generatedScript)}
          />
          <Button
            label={isPlaying ? "멈춤" : "읽어주세요"}
            onClick={() => handleClickTTS(generatedScript)}
          />
          <article className="border border-gray-300 rounded-md p-[16px] text-[14px] tracking-tight">
            <ul
              dangerouslySetInnerHTML={{
                __html: parsedScript(generatedScript),
              }}
            />
          </article>
        </>
      )}
    </section>
  );
}

export default GeneratedScript;
