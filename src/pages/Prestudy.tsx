import Button from "../components/common/Button";
import GeneratedScript from "../components/prestudy/GeneratedScript";
import MyScript from "../components/prestudy/MyScript";

function Prestudy() {
  return (
    <>
      <MyScript />
      <Button label="문법 체크✅" />
      <Button label="어휘 향상🌈" />
      <Button label="대화 버전💬" />
      <GeneratedScript />
    </>
  );
}

export default Prestudy;
