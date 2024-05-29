import { ThemeSwitchMode } from "./components/template/Theme/ThemeSwitchMode";

const App = () => {
  return (
    <div className="w-dvw h-dvh">
      <header>
        <h1>SHADCN UI THEME GENERATOR</h1>
        <p>
          Create automatic CSS variables as a color palette. Can be used for
          Shadcn UI & Tailwind CSS or any other CSS framework.
        </p>
        <small>by <a href="#">Enrick Santos</a></small>
      </header>
      <body>
        <ThemeSwitchMode/>
      </body>
    </div>
  );
};

export default App;
