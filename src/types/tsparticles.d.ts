import type React from "react";

declare module "@tsparticles/react" {
  import type { Engine, Container } from "@tsparticles/engine";
  import type { FC } from "react";

  export interface ParticlesOptions {
    [key: string]: unknown;
  }

  export interface ParticlesComponentProps {
    id?: string;
    className?: string;
    options?: ParticlesOptions;
    init?: (engine: Engine) => Promise<void> | void;
    particlesLoaded?: (container?: Container) => Promise<void> | void;
  style?: React.CSSProperties;
  }

  export const Particles: FC<ParticlesComponentProps>;
  export default Particles;

  export function initParticlesEngine(
    callback: (engine: Engine) => Promise<void> | void,
  ): Promise<void>;
}

declare module "@tsparticles/engine" {
  export type Container = unknown;
  export type Engine = unknown;
  export type SingleOrMultiple<T> = T | T[];
}

declare module "@tsparticles/slim" {
  import type { Engine } from "@tsparticles/engine";

  export function loadSlim(engine: Engine): Promise<void>;
}

