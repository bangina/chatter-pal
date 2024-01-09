import { useRecoilValue } from "recoil";
import Button from "../common/Button";
import Title from "../common/Title";
import { generatedScriptState } from "../../recoil";
function GeneratedScript() {
  const generatedScript = useRecoilValue(generatedScriptState);
  const parsedScript = (script: string) => {
    if (!script.includes("[original_starts]")) return script;
    return script
      .replaceAll(
        "[item_starts]",
        "<li style='margin-bottom: 12px;'>"
      )
      .replaceAll("[item_ends]", "</li>")
      .replaceAll(
        "[original_starts]",
        "<span style='color:red; text-decoration:line-through'>"
      )
      .replaceAll("[original_ends]", "</span>")
      .replaceAll("[corrected_starts]", "<span style='color:green'>")
      .replaceAll("[corrected_ends]", "</span>")
      .replaceAll(
        "[explanation_starts]",
        "<p style='font-style:italic; margin-bottom: 12px;'> ➡ "
      )
      .replaceAll("[explanation_ends]", "</p>");
  };
  console.log(generatedScript);
  return (
    <section>
      <Title label="실행 결과" />
      <Button label="Copy" />
      <Button label="Highlight" />
      <article className="border border-gray-300 rounded-md p-[16px] text-[14px] tracking-tight">
        {generatedScript && (
          <ul
            dangerouslySetInnerHTML={{ __html: parsedScript(generatedScript) }}
          />
        )}
      </article>
    </section>
  );
}

export default GeneratedScript;
