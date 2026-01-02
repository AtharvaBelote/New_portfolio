"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

class Pixel {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  depth: number;
  size: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.depth = Math.random() * 0.8 + 0.2; // depth layer
    this.size = Math.random() * 2 + 0.6;
    this.color = color;
  }

  update(ctx: CanvasRenderingContext2D, pointer: Point, radius: number) {
    const dx = this.baseX - pointer.x;
    const dy = this.baseY - pointer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // soft falloff
    const influence = Math.max(0.2, 1 - dist / radius);

    // parallax offset
    this.x = this.baseX + dx * influence * this.depth * 0.15;
    this.y = this.baseY + dy * influence * this.depth * 0.15;

    const alpha = influence * 0.9;
    ctx.fillStyle = `rgba(56,189,248,${alpha})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef<Point>({ x: -9999, y: -9999 });
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    const GAP = 10; // performance control
    const RADIUS = 200; // interaction size

    let pixels: Pixel[] = [];
    let animationId = 0;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      pixels = [];
      for (let x = 0; x < window.innerWidth; x += GAP) {
        for (let y = 0; y < window.innerHeight; y += GAP) {
          pixels.push(new Pixel(x, y, "#38bdf8"));
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mobile idle motion
      if (isMobile) {
        time.current += 0.05;
        pointer.current.x =
          window.innerWidth / 2 +
          Math.sin(time.current) * window.innerWidth * 0.25;

        pointer.current.y =
          window.innerHeight / 2 +
          Math.cos(time.current * 0.8) * window.innerHeight * 0.25;
      }

      for (const p of pixels) {
        p.update(ctx, pointer.current, RADIUS);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        pointer.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100svh",
        zIndex: -1,
        background: "#000618",
        pointerEvents: "none",
      }}
    />
  );
}
