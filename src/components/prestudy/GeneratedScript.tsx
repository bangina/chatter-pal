import { useRecoilValue } from "recoil";
import Button from "../common/Button";
import Title from "../common/Title";
import { generatedScriptState } from "../../recoil";

function GeneratedScript() {
  const generatedScript = useRecoilValue(generatedScriptState);

  return (
    <section>
      <Title label="실행 결과" />
      <Button label="Copy" />
      <Button label="Highlight" />
      <article className="border border-gray-300 rounded-md p-[16px] whitespace-pre-line">
        <p>{generatedScript}</p>
      </article>
    </section>
  );
}

export default GeneratedScript;
