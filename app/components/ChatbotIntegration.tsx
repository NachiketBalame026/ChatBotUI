"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaCode, FaEnvelope, FaShareAlt, FaArrowLeft } from "react-icons/fa";

export default function ChatbotIntegration({ onPrev }: { onPrev: () => void }) {
  const [step, setStep] = useState(0);
  const [integrationSuccess, setIntegrationSuccess] = useState(false);

  const handleTestChatbot = () => {
    // Simulate opening a new window with the client's website and chatbot
    window.open("https://example.com", "_blank");
  };

  const handleIntegrate = () => {
    // Simulate integration process
    setTimeout(() => {
      setIntegrationSuccess(true);
      setStep(2);
    }, 2000);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onPrev();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Chatbot Integration & Testing</h2>
      {step === 0 && (
        <div className="space-y-4">
          <Button onClick={handleTestChatbot} className="w-full">
            Test Chatbot
          </Button>
          <Button onClick={() => setStep(1)} className="w-full">
            Integrate on Your Website
          </Button>
          <Button variant="outline" onClick={onPrev} className="w-full">
            Back
          </Button>
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Integration Instructions</h3>
            <p className="text-sm">
              Copy and paste the following code within the &lt;head&gt; tag of
              your website:
            </p>
            <pre className="bg-black text-white p-2 rounded mt-2 text-xs">
              {`<script src="https://beyondchats.com/widget.js"></script>
<script>
  BeyondChats.init({ id: 'YOUR_CHATBOT_ID' });
</script>`}
            </pre>
          </div>
          <Button onClick={() => handleIntegrate()} className="w-full">
            Test Integration
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Simulate sending email to developer
              alert("Instructions sent to developer!");
            }}
            className="w-full"
          >
            <FaEnvelope className="mr-2" />
            Email Instructions to Developer
          </Button>
          <Button variant="outline" onClick={handleBack} className="w-full">
            <FaArrowLeft className="mr-2" />
            Back
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          {integrationSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-green-100 p-6 rounded-lg text-center"
            >
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Integration Successful!
              </h3>
              <p className="mb-4">Your chatbot is now live on your website.</p>
              <div className="flex justify-center space-x-4">
                <Button>Explore Admin Panel</Button>
                <Button variant="outline">Start Talking to Your Chatbot</Button>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <Button variant="outline" size="sm">
                  <FaShareAlt className="mr-2" />
                  Share on Twitter
                </Button>
                <Button variant="outline" size="sm">
                  <FaShareAlt className="mr-2" />
                  Share on LinkedIn
                </Button>
              </div>
              <Button
                variant="ghost"
                onClick={() => setStep(0)}
                className="mt-4"
              >
                <FaArrowLeft className="mr-2" />
                Back to Integration Options
              </Button>
            </motion.div>
          ) : (
            <div className="bg-yellow-100 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-yellow-600 mb-4">
                Integration Pending
              </h3>
              <p className="mb-4">
                We haven't detected the integration on your website yet. Please
                make sure you've added the code snippet correctly.
              </p>
              <Button onClick={() => setStep(1)} variant="outline">
                <FaCode className="mr-2" />
                Review Integration Instructions
              </Button>
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mt-4 w-full"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </Button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
