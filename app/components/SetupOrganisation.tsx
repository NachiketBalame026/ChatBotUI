"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const dummyWebpages = [
  { url: "/home", status: "scraped" },
  { url: "/about", status: "scraped" },
  { url: "/products", status: "pending" },
  { url: "/contact", status: "detected" },
];

export default function SetupOrganisation({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [step, setStep] = useState(0);
  const [scrapingProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Setup Organisation</h2>
      {step === 0 ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              type="text"
              placeholder="BeyondChats Inc."
              required
            />
          </div>
          <div>
            <Label htmlFor="website-url">Company Website URL</Label>
            <Input
              id="website-url"
              type="url"
              placeholder="https://beyondchats.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="company-description">Company Description</Label>
            <Textarea
              id="company-description"
              placeholder="Describe your company..."
              required
            />
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrev}>
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Website Scraping Progress
            </h3>
            <Progress value={scrapingProgress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">
              {scrapingProgress < 100
                ? "Scraping in progress..."
                : "Scraping complete!"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Detected Webpages</h3>
            <ul className="space-y-2">
              {dummyWebpages.map((page) => (
                <li
                  key={page.url}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded"
                >
                  <span>{page.url}</span>
                  <span
                    className={`text-sm ${
                      page.status === "scraped"
                        ? "text-green-600"
                        : page.status === "pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {page.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button onClick={onNext}>Continue to Integration</Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
