import { useRecoilValue } from "recoil";
import Button from "../common/Button";
import Title from "../common/Title";
import { generatedScriptState } from "../../recoil";
function GeneratedScript() {
  const generatedScript = useRecoilValue(generatedScriptState);
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
