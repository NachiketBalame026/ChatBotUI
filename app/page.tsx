"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserRegistration from "./components/UserRegistration";
import SetupOrganisation from "./components/SetupOrganisation";
import ChatbotIntegration from "./components/ChatbotIntegration";

const steps = [
  "User Registration",
  "Setup Organisation",
  "Chatbot Integration",
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">BeyondChats Setup</h1>
          <p className="mt-2">Create your intelligent chatbot in minutes</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{step}</span>
                {index < steps.length - 1 && (
                  <div
                    className={`h-px w-full mx-2 ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <UserRegistration onNext={nextStep} />}
              {currentStep === 1 && (
                <SetupOrganisation onNext={nextStep} onPrev={prevStep} />
              )}
              {currentStep === 2 && <ChatbotIntegration onPrev={prevStep} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
