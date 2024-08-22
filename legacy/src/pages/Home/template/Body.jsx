import PickColor from '../components/PickColor';
import { ThemeSwitchMode } from '@/components/template/Theme/ThemeSwitchMode';

const Body = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <header className="pt-20 text-center">
        <h1 className="text-4xl font-bold">
          SHADCN UI
          <br />
          THEME GENERATOR
        </h1>
        <p className="text-lg mt-3 max-w-96">
          Create automatic CSS variables as a color palette. Can be used for
          Shadcn UI.
        </p>
        <small>
          by{' '}
          <a
            className="no-underline hover:text-primary hover:border-b-[1px] transition-all"
            href="#"
          >
            Enrick Santos
          </a>
        </small>
      </header>
      <article className="flex flex-col justify-center items-center gap-7">
        <PickColor />
        <ThemeSwitchMode />
        <div className="w-full h-96 flex bg-foreground/50 rounded overflow-hidden border border-border">
          {[
            'background',
            'primary',
            'secondary',
            'muted',
            'accent',
            'border',
            'primary-foreground',
            'muted-foreground',
            'popover-foreground',
            'secondary-foreground',
            'foreground',
          ].map((color) => (
            <div key={color} className={`w-full flex-1 bg-${color}`}></div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Body;
