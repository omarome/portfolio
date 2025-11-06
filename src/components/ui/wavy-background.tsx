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
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const containerRef = useRef<HTMLDivElement>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  
  const init = () => {
    // Use setTimeout to ensure container is rendered
    setTimeout(() => {
      canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      
      ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const rect = container.getBoundingClientRect();
      w = ctx.canvas.width = rect.width || window.innerWidth;
      h = ctx.canvas.height = rect.height || window.innerHeight;
      
      // Only apply blur if it's greater than 0
      if (blur > 0) {
        ctx.filter = `blur(${blur}px)`;
      }
      nt = 0;
      
      const handleResize = () => {
        if (container && canvas && ctx) {
          const rect = container.getBoundingClientRect();
          w = ctx.canvas.width = rect.width || window.innerWidth;
          h = ctx.canvas.height = rect.height || window.innerHeight;
          if (blur > 0) {
            ctx.filter = `blur(${blur}px)`;
          }
        }
      };
      
      resizeHandlerRef.current = handleResize;
      window.addEventListener("resize", handleResize);
      render();
    }, 100);
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];
  const drawWave = (n: number) => {
    if (!ctx || !w || !h) return;
    nt += getSpeed();
    for (i = 0; i < n; i++) {
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
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // Center the wave vertically
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    if (!ctx || !w || !h) {
      animationId = requestAnimationFrame(render);
      return;
    }
    // Clear and fill background
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = backgroundFill || "black";
    ctx.fillRect(0, 0, w, h);
    
    // Draw waves - draw fewer waves for better visibility
    ctx.globalAlpha = 1;
    drawWave(9); // Reduced from 5 to 3 to show distinct colors
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (resizeHandlerRef.current) {
        window.removeEventListener("resize", resizeHandlerRef.current);
      }
    };
  }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity, animationId]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

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
