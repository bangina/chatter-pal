import { useRecoilState } from "recoil";
import { myScriptState } from "../../recoil";
import Title from "../common/Title";

function MyScript() {
  const [myScript, setMyScript] = useRecoilState(myScriptState);

  return (
    <section>
      <Title label="Script Title" />
      <input
        type="text"
        className="w-full border border-gray-300 mb-8"
        placeholder="Question. What part of the reading resonated with you most?"
      />
      <Title label="My Script" />
      <textarea
        placeholder="Paste your script, and we will generate the revised version for you 😀"
        className="w-full h-[96px] border border-gray-300 mb-8"
        value={myScript}
        onChange={(e) => setMyScript(e.target.value)}
      />
    </section>
  );
}

export default MyScript;
