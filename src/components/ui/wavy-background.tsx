import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // Store mutable values in refs to persist across renders
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const timeRef = useRef<number>(0);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctxRef.current = ctx;

      const applyDimensions = () => {
        if (!container || !ctxRef.current) return;
        const rect = container.getBoundingClientRect();
        const w = rect.width || window.innerWidth;
        const h = rect.height || window.innerHeight;
        ctxRef.current.canvas.width = w;
        ctxRef.current.canvas.height = h;
        dimensionsRef.current = { w, h };
        if (blur > 0) {
          ctxRef.current.filter = `blur(${blur}px)`;
        } else {
          ctxRef.current.filter = "none";
        }
      };

      const drawWave = (n: number) => {
        const ctx = ctxRef.current;
        const { w, h } = dimensionsRef.current;
        if (!ctx || !w || !h) return;
        
        timeRef.current += getSpeed();
        for (let i = 0; i < n; i++) {
          ctx.beginPath();
          ctx.lineWidth = waveWidth || 50;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          const color = waveColors[i % waveColors.length];
          // Use rgba format for better opacity control
          const alpha = waveOpacity || 0.8;
          // Convert hex to rgb
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          for (let x = 0; x < w; x += 5) {
            const y = noise(x / 800, 0.3 * i, timeRef.current) * 100;
            ctx.lineTo(x, y + h * 0.5); // Center the wave vertically
          }
          ctx.stroke();
          ctx.closePath();
        }
      };

      const render = () => {
        const ctx = ctxRef.current;
        const { w, h } = dimensionsRef.current;
        if (!ctx || !w || !h) {
          animationIdRef.current = requestAnimationFrame(render);
          return;
        }
        // Clear and fill background
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = backgroundFill || "black";
        ctx.fillRect(0, 0, w, h);
        
        // Draw waves
        ctx.globalAlpha = 1;
        drawWave(9);
        animationIdRef.current = requestAnimationFrame(render);
      };

      applyDimensions();
      timeRef.current = 0;

      const handleResize = () => {
        applyDimensions();
      };

      resizeHandlerRef.current = handleResize;
      window.addEventListener("resize", handleResize);
      render();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      if (resizeHandlerRef.current) {
        window.removeEventListener("resize", resizeHandlerRef.current);
        resizeHandlerRef.current = null;
      }
    };
  }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, [setIsSafari]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 pointer-events-none"
        ref={canvasRef}
        id="canvas"
        style={{
          zIndex: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div 
        className={cn("absolute inset-0 h-full w-full", className)}
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
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
