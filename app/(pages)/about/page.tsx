"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const team = [
    { name: "John Doe", role: "CEO & Founder", email: "john@example.com" },
    { name: "Jane Smith", role: "CTO", email: "jane@example.com" },
    { name: "Mike Johnson", role: "Lead Developer", email: "mike@example.com" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient-primary">About Us</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn more about our mission, vision, and the team behind this
          project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>What drives us forward</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To empower businesses with cutting-edge technology solutions that
              drive growth, innovation, and sustainable success in the digital
              age.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
            <CardDescription>Where we are heading</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To become the leading platform for data-driven decision making,
              transforming how organizations leverage their data for strategic
              advantage.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card
              key={member.name}
              className="hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 hover:border-primary hover:text-primary transition-colors"
                  >
                    <FaEnvelope className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 hover:border-primary hover:text-primary transition-colors"
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 hover:border-primary hover:text-primary transition-colors"
                  >
                    <FaTwitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 hover:border-primary hover:text-primary transition-colors"
                  >
                    <FaGithub className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
