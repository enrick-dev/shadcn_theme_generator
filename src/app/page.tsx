'use client';
import { PickColor, StyleProvider } from '@/components/theme/StyleCustomTheme';
import { useState } from 'react';

export default function Home() {
  return (
    <StyleProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col gap-8 justify-center items-center theme-custom">
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

            {/* <PickColor />
          <ThemeSwitchMode /> */}
            <div className="w-96 h-96 flex bg-foreground/50 rounded overflow-hidden border border-border">
              {[
                'background',
                'popover',
                'primary',
                'secondary',
                'destructive',
                'foreground',
                'card',
                'card-foreground',
                'popover-foreground',
                'primary-foreground',
                'secondary-foreground',
                'muted',
                'muted-foreground',
                'accent',
                'accent-foreground',
                'destructive-foreground',
                'border',
                'input',
                'ring',
              ].map((color) => (
                <div key={color} className={`w-full flex-1 bg-${color}`}></div>
              ))}
            </div>
          </article>
        </div>
      </main>
    </StyleProvider>
  );
}
