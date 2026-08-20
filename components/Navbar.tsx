"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, BarChart3, TrendingUp, Info, Menu, User } from "lucide-react";
import { ThemeToggle } from "@/app/theme/ThemeToggle";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/insight", label: "Insights", icon: BarChart3 },
  { href: "/projection", label: "Projections", icon: TrendingUp },
  { href: "/about", label: "About", icon: Info },
];

// NavItems component moved outside
function NavItems() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {navItems.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;
        return (
          <NavigationMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  active && "bg-accent text-accent-foreground",
                )}
                active={active}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        );
      })}
    </>
  );
}

// Main Navbar component
export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!mounted) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Cafe London
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavItems />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle showPalettePicker={true} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 text-lg font-medium transition-colors hover:text-primary",
                          active ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Theme</span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const root = document.documentElement;
                              root.setAttribute("data-theme", "light");
                            }}
                            className="h-8 px-3"
                          >
                            Light
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const root = document.documentElement;
                              root.setAttribute("data-theme", "dark");
                            }}
                            className="h-8 px-3"
                          >
                            Dark
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const root = document.documentElement;
                              root.removeAttribute("data-theme");
                            }}
                            className="h-8 px-3"
                          >
                            System
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium">Palette</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              const root = document.documentElement;
                              root.style.setProperty(
                                "--primary",
                                "hsl(222.2 47.4% 11.2%)",
                              );
                              localStorage.setItem("color-palette", "default");
                            }}
                            className="w-6 h-6 rounded-full border border-border"
                            style={{
                              backgroundColor: "hsl(222.2 47.4% 11.2%)",
                            }}
                          />
                          <button
                            onClick={() => {
                              const root = document.documentElement;
                              root.style.setProperty(
                                "--primary",
                                "hsl(210 100% 50%)",
                              );
                              localStorage.setItem("color-palette", "blue");
                            }}
                            className="w-6 h-6 rounded-full border border-border"
                            style={{ backgroundColor: "hsl(210 100% 50%)" }}
                          />
                          <button
                            onClick={() => {
                              const root = document.documentElement;
                              root.style.setProperty(
                                "--primary",
                                "hsl(270 100% 50%)",
                              );
                              localStorage.setItem("color-palette", "purple");
                            }}
                            className="w-6 h-6 rounded-full border border-border"
                            style={{ backgroundColor: "hsl(270 100% 50%)" }}
                          />
                          <button
                            onClick={() => {
                              const root = document.documentElement;
                              root.style.setProperty(
                                "--primary",
                                "hsl(150 100% 40%)",
                              );
                              localStorage.setItem("color-palette", "green");
                            }}
                            className="w-6 h-6 rounded-full border border-border"
                            style={{ backgroundColor: "hsl(150 100% 40%)" }}
                          />
                          <button
                            onClick={() => {
                              const root = document.documentElement;
                              root.style.setProperty(
                                "--primary",
                                "hsl(25 95% 53%)",
                              );
                              localStorage.setItem("color-palette", "orange");
                            }}
                            className="w-6 h-6 rounded-full border border-border"
                            style={{ backgroundColor: "hsl(25 95% 53%)" }}
                          />
                          <button
                            onClick={() => {
                              const root = document.documentElement;
                              root.style.setProperty(
                                "--primary",
                                "hsl(340 100% 50%)",
                              );
                              localStorage.setItem("color-palette", "pink");
                            }}
                            className="w-6 h-6 rounded-full border border-border"
                            style={{ backgroundColor: "hsl(340 100% 50%)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
