import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const loadingMessages = [
  "Fetching data sources...",
  "Analyzing risk patterns...",
  "Simulating risk models...",
  "Computing multi-category risk items...",
  "Finalizing assessment...",
];

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= loadingMessages.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <div className="space-y-4">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mx-auto h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
          />
          
          <motion.h3
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xl font-semibold text-foreground"
          >
            {loadingMessages[messageIndex]}
          </motion.h3>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
