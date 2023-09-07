import Index from "./src/Index";
import { LoginProvider } from "./src/services/LoginContext";


export default function App() {
  return (
    <LoginProvider>
      <Index />
    </LoginProvider>
  );
}
