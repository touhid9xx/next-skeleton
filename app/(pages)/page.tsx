"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!mounted) {
    return null;
  }

  const features = [
    {
      icon: BarChart3,
      title: "Insights",
      description:
        "Gain valuable insights from your data with advanced analytics.",
      href: "/insight",
    },
    {
      icon: TrendingUp,
      title: "Projections",
      description: "Plan ahead with accurate projections and trend analysis.",
      href: "/projection",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description:
        "Built with Next.js 16 and TanStack Query for optimal performance.",
      href: "/about",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gradient-primary">Welcome to MyApp</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A modern application built with Next.js 16, Tailwind CSS v4, and
          shadcn/ui. Experience dark/light mode with seamless theme switching.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/insight">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              href={feature.href}
              className="group p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all hover:shadow-lg hover:border-primary/50"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Link>
          );
        })}
      </section>

      <div className="mt-20 text-center">
        <p className="text-sm text-muted-foreground">
          Current theme:{" "}
          <span className="font-semibold capitalize">{theme}</span>
        </p>
      </div>
    </div>
  );
}
