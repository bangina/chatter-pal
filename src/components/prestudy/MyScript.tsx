import Title from "../common/Title";

function MyScript() {
  return (
    <section>
      <Title label="내가 쓴 스크립트" />
      <textarea
        placeholder="스크립트를 입력하세요."
        className="w-full h-[96px] border border-gray-300"
      />
    </section>
  );
}

export default MyScript;
