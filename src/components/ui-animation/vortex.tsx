import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "motion/react";
import { WavyBackground } from "./wavy-background";

interface VortexProps {
  children?: any;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }
    return 'dark';
  });

  const backgroundColor = React.useMemo(() => {
    if (props.backgroundColor) {
      if (props.backgroundColor.startsWith('var(--')) {
        const varName = props.backgroundColor.match(/var\(--([^)]+)\)/)?.[1];
        if (varName && typeof window !== 'undefined') {
          const value = getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`).trim();
          return value || (theme === 'dark' ? '#000000' : '#1a1a2e');
        }
      }
      return props.backgroundColor;
    }
    return theme === 'dark' ? '#000000' : '#1a1a2e';
  }, [props.backgroundColor, theme]);

  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const baseHue = props.baseHue || (theme === 'dark' ? 220 : 200); 
  const rangeHue = 100;
  const particleLightness = theme === 'dark' ? 60 : 80; 
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;

  const noise3D = createNoise3D();
  
  // Store mutable values in refs to persist across renders
  const tickRef = useRef<number>(0);
  const particlePropsRef = useRef<Float32Array>(new Float32Array(particlePropsLength));
  const centerRef = useRef<[number, number]>([0, 0]);

  const TAU: number = 2 * Math.PI;

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, [setTheme]);

  useEffect(() => {
    if (theme === "light") {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = undefined;
      }
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // Define utility functions inside useEffect to avoid dependency issues
    const rand = (n: number): number => n * Math.random();
    const randRange = (n: number): number => n - rand(2 * n);

    const fadeInOut = (t: number, m: number): number => {
      let hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    };

    const lerp = (n1: number, n2: number, speed: number): number =>
      (1 - speed) * n1 + speed * n2;

    // Define functions inside useEffect to avoid dependency issues
    const resizeFunc = (
      canvasEl: HTMLCanvasElement,
      ctxEl?: CanvasRenderingContext2D,
    ) => {
      const containerEl = containerRef.current as HTMLElement;
      if (containerEl) {
        const rect = containerEl.getBoundingClientRect();
        canvasEl.width = rect.width;
        canvasEl.height = rect.height;
      } else {
        const { innerWidth, innerHeight } = window;
        canvasEl.width = innerWidth;
        canvasEl.height = innerHeight;
      }

      centerRef.current[0] = 0.5 * canvasEl.width;
      centerRef.current[1] = 0.5 * canvasEl.height;
    };

    const initParticleFunc = (i: number) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      let x, y, vx, vy, life, ttl, speedVal, radius, hue;

      x = rand(canvasEl.width);
      y = centerRef.current[1] + randRange(rangeY);
      vx = 0;
      vy = 0;
      life = 0;
      ttl = baseTTL + rand(rangeTTL);
      speedVal = baseSpeed + rand(rangeSpeed);
      radius = baseRadius + rand(rangeRadius);
      hue = baseHue + rand(rangeHue);

      particlePropsRef.current.set([x, y, vx, vy, life, ttl, speedVal, radius, hue], i);
    };

    const initParticlesFunc = () => {
      tickRef.current = 0;
      particlePropsRef.current = new Float32Array(particlePropsLength);

      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticleFunc(i);
      }
    };

    const checkBoundsFunc = (x: number, y: number, canvasEl: HTMLCanvasElement) => {
      return x > canvasEl.width || x < 0 || y > canvasEl.height || y < 0;
    };

    const drawParticleFunc = (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number,
      ctxEl: CanvasRenderingContext2D,
    ) => {
      ctxEl.save();
      ctxEl.lineCap = "round";
      ctxEl.lineWidth = radius;
      const saturation = theme === 'dark' ? 100 : 100;
      const alpha = fadeInOut(life, ttl);
      const adjustedAlpha = theme === 'dark' ? alpha : Math.min(alpha * 1.5, 1);
      ctxEl.strokeStyle = `hsla(${hue},${saturation}%,${particleLightness}%,${adjustedAlpha})`;
      ctxEl.beginPath();
      ctxEl.moveTo(x, y);
      ctxEl.lineTo(x2, y2);
      ctxEl.stroke();
      ctxEl.closePath();
      ctxEl.restore();
    };

    const updateParticleFunc = (i: number, ctxEl: CanvasRenderingContext2D) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      let i2 = 1 + i,
        i3 = 2 + i,
        i4 = 3 + i,
        i5 = 4 + i,
        i6 = 5 + i,
        i7 = 6 + i,
        i8 = 7 + i,
        i9 = 8 + i;
      let n, x, y, vx, vy, life, ttl, speedVal, x2, y2, radius, hue;

      x = particlePropsRef.current[i];
      y = particlePropsRef.current[i2];
      n = noise3D(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * TAU;
      vx = lerp(particlePropsRef.current[i3], Math.cos(n), 0.5);
      vy = lerp(particlePropsRef.current[i4], Math.sin(n), 0.5);
      life = particlePropsRef.current[i5];
      ttl = particlePropsRef.current[i6];
      speedVal = particlePropsRef.current[i7];
      x2 = x + vx * speedVal;
      y2 = y + vy * speedVal;
      radius = particlePropsRef.current[i8];
      hue = particlePropsRef.current[i9];

      drawParticleFunc(x, y, x2, y2, life, ttl, radius, hue, ctxEl);

      life++;

      particlePropsRef.current[i] = x2;
      particlePropsRef.current[i2] = y2;
      particlePropsRef.current[i3] = vx;
      particlePropsRef.current[i4] = vy;
      particlePropsRef.current[i5] = life;

      (checkBoundsFunc(x, y, canvasEl) || life > ttl) && initParticleFunc(i);
    };

    const drawParticlesFunc = (ctxEl: CanvasRenderingContext2D) => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticleFunc(i, ctxEl);
      }
    };

    const renderGlowFunc = (
      canvasEl: HTMLCanvasElement,
      ctxEl: CanvasRenderingContext2D,
    ) => {
      ctxEl.save();
      ctxEl.filter = "blur(8px) brightness(200%)";
      ctxEl.globalCompositeOperation = "lighter";
      ctxEl.drawImage(canvasEl, 0, 0);
      ctxEl.restore();

      ctxEl.save();
      ctxEl.filter = "blur(4px) brightness(200%)";
      ctxEl.globalCompositeOperation = "lighter";
      ctxEl.drawImage(canvasEl, 0, 0);
      ctxEl.restore();
    };

    const renderToScreenFunc = (
      canvasEl: HTMLCanvasElement,
      ctxEl: CanvasRenderingContext2D,
    ) => {
      ctxEl.save();
      ctxEl.globalCompositeOperation = "lighter";
      ctxEl.drawImage(canvasEl, 0, 0);
      ctxEl.restore();
    };

    const drawFunc = (canvasEl: HTMLCanvasElement, ctxEl: CanvasRenderingContext2D) => {
      // Dark mode - original vortex animation
      tickRef.current++;

      ctxEl.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctxEl.fillStyle = backgroundColor;
      ctxEl.fillRect(0, 0, canvasEl.width, canvasEl.height);

      drawParticlesFunc(ctxEl);
      renderGlowFunc(canvasEl, ctxEl);
      renderToScreenFunc(canvasEl, ctxEl);

      animationFrameId.current = window.requestAnimationFrame(() =>
        drawFunc(canvasEl, ctxEl),
      );
    };

    const handleResize = () => {
      const canvasEl = canvasRef.current;
      const ctxEl = canvasEl?.getContext("2d");
      if (canvasEl && ctxEl) {
        resizeFunc(canvasEl, ctxEl);
      }
    };

    resizeFunc(canvas, ctx);

    initParticlesFunc();
    drawFunc(canvas, ctx);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [
    backgroundColor,
    theme,
    TAU,
    baseHue,
    baseRadius,
    baseSpeed,
    noise3D,
    particleLightness,
    particlePropsLength,
    rangeRadius,
    rangeSpeed,
    rangeY,
    particlePropCount,
    baseTTL,
    rangeTTL,
    noiseSteps,
    xOff,
    yOff,
    zOff,
  ]);

  if (theme === 'light') {
    return (
      <WavyBackground
        className={props.className}
        containerClassName={props.containerClassName}
        colors={["#5e0097", "#7d00c7", "#a200ff"]}
        backgroundFill="#ffffff"
        waveWidth={150}
        waveOpacity={0.5}
        blur={5}
      >
        {props.children}
      </WavyBackground>
    );
  }

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: 'translateZ(0)'
        }}
      >
        <canvas 
          ref={canvasRef} 
          className="pointer-events-none w-full h-full" 
          style={{ display: 'block', width: '100%', height: '100%' }}
        ></canvas>
      </motion.div>
      {/* Content foreground layer - rendered second, on top of canvas */}
      <div 
        className={cn("absolute inset-0 h-full w-full", props.className)}
        style={{ 
          zIndex: 1000,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'auto',
          transform: 'translateZ(1px)',
          willChange: 'transform'
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

