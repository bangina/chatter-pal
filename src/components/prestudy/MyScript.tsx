import { myScriptState } from "../../recoil";
import Title from "../common/Title";
import { useRecoilState } from "recoil";

function MyScript() {
  const [myScript, setMyScript] = useRecoilState(myScriptState);
  return (
    <section>
      <Title label="내가 쓴 스크립트" />
      <textarea
        placeholder="스크립트를 입력하세요."
        className="w-full h-[96px] border border-gray-300"
        value={myScript}
        onChange={(e) => setMyScript(e.target.value)}
      />
    </section>
  );
}

export default MyScript;
