import PickColor from '../components/PickColor';

const Body = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <header className="pt-20 text-center">
        <h1 className="text-4xl font-bold">
          SHADCN UI
          <br />
          THEME GENERATOR
        </h1>
        <p className="text-lg max-w-xl mt-3">
          Create automatic CSS variables as a color palette. Can be used for
          Shadcn UI & Tailwind CSS or any other CSS framework.
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
      <article>
        <PickColor />
      </article>
    </div>
  );
};

export default Body;
