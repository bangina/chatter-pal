import { RecoilRoot } from "recoil";
import Prestudy from "./pages/Prestudy";

function App() {
  return (
    <RecoilRoot>
      <main className="min-h-screen bg-gray-100 p-[20px]">
        <Prestudy />
      </main>
    </RecoilRoot>
  );
}

export default App;
