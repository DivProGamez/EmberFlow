'use client';
import type { Video } from "@/lib/data";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function VideoDisplay({ video }: { video: Video }) {
  return (
    <AnimatePresence>
      <motion.div
        key={video.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75 }}
        className="absolute inset-0"
      >
        <Image
          src={video.videoUrl}
          alt={video.title}
          fill
          priority
          className="object-cover"
          data-ai-hint={video.videoHint}
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>
    </AnimatePresence>
  );
}

// Dummy AnimatePresence and motion for type-checking without the dependency
namespace FakeFramer {
  export const AnimatePresence = ({children}: {children: React.ReactNode}) => <>{children}</>;
  export const motion = { div: (props: any) => <div {...props} /> };
}
