import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cake,
  PartyPopper,
  Gift,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';
import FancyFramedImage from './FramedImage';
import audiofile from './invite_music.mp3'

interface MonthlyPhoto {
  month: number;
  imageUrl: string;
}

const baseImageUrl =
  'https://github.com/suyashrooongta/birthday-invite-photos/blob/main/{number}.jpg?raw=true';

const musicUrl = 'https://github.com/suyashrooongta/birthday-invite-photos/blob/main/invite_music.mp3?raw=true'

const backgroundImageUrl =
  'url(https://github.com/suyashrooongta/birthday-invite-photos/blob/main/1742627088300.jpg?raw=true)';

const monthlyPhotos: MonthlyPhoto[] = [
  {
    month: 1,
    imageUrl: baseImageUrl.replace('{number}', '1'),
  },
  { month: 2, imageUrl: baseImageUrl.replace('{number}', '2') },
  { month: 3, imageUrl: baseImageUrl.replace('{number}', '3') },
  { month: 4, imageUrl: baseImageUrl.replace('{number}', '4') },
  { month: 5, imageUrl: baseImageUrl.replace('{number}', '5') },
  { month: 6, imageUrl: baseImageUrl.replace('{number}', '6') },
  { month: 7, imageUrl: baseImageUrl.replace('{number}', '7') },
  { month: 8, imageUrl: baseImageUrl.replace('{number}', '8') },
  { month: 9, imageUrl: baseImageUrl.replace('{number}', '9') },
  { month: 10, imageUrl: baseImageUrl.replace('{number}', '10') },
  { month: 11, imageUrl: baseImageUrl.replace('{number}', '11') },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const TransitionSlide = ({ month }: { month: number }) => (
  <motion.div
    className="w-full h-screen flex items-center justify-center"
    style={{
      backgroundImage: backgroundImageUrl,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <motion.div className="text-center">
      <motion.div
        className="text-9xl font-bold text-blue-600"
        animate={{ scale: 2 }}
      >
        {month}
      </motion.div>
    </motion.div>
  </motion.div>
);

const PhotoSlide = ({ photo }: { photo: MonthlyPhoto }) => (
  <motion.div
    className="w-full h-screen bg-white flex items-center justify-center"
    style={{
      backgroundImage: backgroundImageUrl,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <FancyFramedImage
      imageUrl={photo.imageUrl}
      altText={`Ridhaan at ${photo.month} months`}
    />
  </motion.div>
);



const FirstSlide = () => (
  <motion.div
    className="w-full h-screen bg-white flex items-center justify-center"
    style={{
      backgroundImage: backgroundImageUrl,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    
  </motion.div>
);

const InvitationSlide = () => (
  <motion.div
    className="w-full h-screen flex items-center justify-center"
    style={{
      backgroundImage: backgroundImageUrl,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-3xl w-full mx-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          className="flex justify-center gap-6 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <PartyPopper className="w-12 h-12 text-blue-500" />
          <Cake className="w-12 h-12 text-pink-500" />
          <Gift className="w-12 h-12 text-purple-500" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            Ridhaan's Big Bash!
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            You are invited for Ridhaan's next birthday, the big ONE!
          </p>
        </motion.div>

        <motion.div
          className="space-y-6 text-xl text-gray-700"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3">
            <Calendar className="w-6 h-6 text-blue-500" />
            <p>Date: April 5th</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6 text-blue-500" />
            <p>Time: 12:30 PM to 2:30 PM</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MapPin className="w-6 h-6 text-blue-500" />
            <p>Location: Clubhouse, Purva Carnation, Cox Town</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const Controls = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => (
  <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 flex gap-4">
    <button
      onClick={onPrev}
      className="text-blue-600 hover:text-blue-800 transition-colors"
    >
      <SkipBack className="w-6 h-6" />
    </button>
    <button
      onClick={onPlayPause}
      className="text-blue-600 hover:text-blue-800 transition-colors"
    >
      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
    </button>
    <button
      onClick={onNext}
      className="text-blue-600 hover:text-blue-800 transition-colors"
    >
      <SkipForward className="w-6 h-6" />
    </button>
  </div>
);

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const totalSlides = monthlyPhotos.length * 2 + 3;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % totalSlides;
      if (next === 0) {
        setCycleCount((c) => c + 1);
      }
      return next;
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const isTransition = currentIndex % 2 === 1;
    const isInvitation = currentIndex === totalSlides - 1;

    if (!isPlaying || (cycleCount === 1 && isInvitation)) {
      setIsPlaying(false);
      return;
    }

    let duration;

    if (isInvitation) {
      duration = 10000; // 10 seconds for invitation
    } else if (currentIndex === 0) {
      duration = 1000;
    } else if (isTransition) {
      duration = 800; // 1 second for month number
    } else {
      duration = 2500; // 2 seconds for photos
    }

    const timer = setInterval(nextSlide, duration);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, nextSlide, cycleCount, totalSlides]);

  const renderSlide = () => {
    
    if (currentIndex === 0) {
      return <FirstSlide />;
    }
    if (currentIndex === totalSlides - 1) {
      return <InvitationSlide />;
    }

    const isTransition = currentIndex % 2 === 1;
    const photoIndex = Math.floor((currentIndex - 1) / 2);

    if (isTransition) {
      return <TransitionSlide month={photoIndex + 1} />;
    }

    return <PhotoSlide photo={monthlyPhotos[photoIndex]} />;
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">{renderSlide()}</AnimatePresence>
      <audio src={audiofile} autoPlay loop controls></audio>
      <Controls
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={nextSlide}
        onPrev={prevSlide}
      />
    </div>
  );
}

export default App;
