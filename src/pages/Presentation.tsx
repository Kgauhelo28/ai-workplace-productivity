import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid3x3,
  X,
  Play,
  Sparkles,
} from 'lucide-react';
import { slides, type SlideData } from '@/lib/presentation/slides';

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  const totalSlides = slides.length;
  const slide = slides[currentSlide];

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentSlide(index);
    setShowOverview(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showOverview) {
        if (e.key === 'Escape') setShowOverview(false);
        return;
      }
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(totalSlides - 1);
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'Escape':
          if (isFullscreen) toggleFullscreen();
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, toggleFullscreen, isFullscreen, totalSlides, showOverview]);

  const themeClasses: Record<SlideData['theme'], string> = {
    gradient: 'bg-gradient-to-br from-primary-700 via-primary-800 to-accent-800',
    dark: 'bg-slate-900',
    light: 'bg-slate-50',
  };

  const isDark = slide.theme === 'gradient' || slide.theme === 'dark';

  return (
    <div className={`relative w-full h-[calc(100vh-120px)] min-h-[600px] rounded-2xl overflow-hidden border ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-elevated ${themeClasses[slide.theme]} transition-colors duration-500`}>
      {/* Slide Content */}
      <div
        key={currentSlide}
        className="absolute inset-0 overflow-y-auto scrollbar-thin animate-fade-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) goNext();
        }}
      >
        <div className="min-h-full flex flex-col">
          {/* Slide Header (for non-title/section/closing slides) */}
          {slide.title && slide.type !== 'title' && slide.type !== 'section' && slide.type !== 'closing' && (
            <div className={`px-8 lg:px-12 pt-8 pb-2 flex-shrink-0 ${isDark ? 'text-white' : ''}`}>
              <div className="flex items-center gap-3 mb-2">
                {slide.icon && (
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-primary-50 text-primary-600'}`}>
                    {slide.icon}
                  </div>
                )}
                <div>
                  <h2 className={`font-display font-bold text-xl lg:text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <p className={`text-sm mt-0.5 ${isDark ? 'text-white/60' : 'text-slate-500'}`}>{slide.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Slide Body */}
          <div className={`flex-1 px-8 lg:px-12 pb-8 ${slide.title || slide.type === 'section' || slide.type === 'closing' ? 'flex' : ''} ${isDark && !slide.title ? '' : ''}`}>
            {slide.content}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className={`absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 lg:px-6 py-3 ${isDark ? 'bg-black/30' : 'bg-white/80'} backdrop-blur-md border-t ${isDark ? 'border-white/10' : 'border-slate-200/60'} z-20`}>
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className={`p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isDark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-slate-600'} min-w-[60px] text-center`}>
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={goNext}
            disabled={currentSlide === totalSlides - 1}
            className={`p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isDark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="hidden md:flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? isDark ? 'w-6 bg-white' : 'w-6 bg-primary-600'
                  : isDark ? 'w-1.5 bg-white/30 hover:bg-white/50' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowOverview(true)}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Slide overview"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Overview Modal */}
      {showOverview && (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col animate-fade-in" onClick={() => setShowOverview(false)}>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <Grid3x3 className="w-5 h-5 text-white" />
              <h3 className="font-display font-semibold text-white text-lg">All Slides</h3>
            </div>
            <button
              onClick={() => setShowOverview(false)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {slides.map((s, i) => {
                const sIsDark = s.theme === 'gradient' || s.theme === 'dark';
                return (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      goTo(i);
                    }}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      i === currentSlide ? 'border-primary-400 ring-2 ring-primary-400/50' : 'border-white/10 hover:border-white/30'
                    } ${s.theme === 'gradient' ? 'bg-gradient-to-br from-primary-700 to-accent-800' : s.theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}
                  >
                    <div className="absolute inset-0 p-3 flex flex-col">
                      {s.title ? (
                        <>
                          <p className={`text-xs font-display font-bold leading-tight ${sIsDark ? 'text-white' : 'text-slate-900'} line-clamp-2`}>
                            {s.title}
                          </p>
                          {s.subtitle && (
                            <p className={`text-[10px] mt-1 line-clamp-1 ${sIsDark ? 'text-white/50' : 'text-slate-400'}`}>
                              {s.subtitle}
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          {s.type === 'title' || s.type === 'closing' ? (
                            <Sparkles className={`w-6 h-6 ${sIsDark ? 'text-white/60' : 'text-slate-400'}`} />
                          ) : (
                            <Play className={`w-6 h-6 ${sIsDark ? 'text-white/60' : 'text-slate-400'}`} />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-1 right-2 text-[10px] font-mono font-bold text-white/40">
                      {i + 1}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Click hint for first slide */}
      {currentSlide === 0 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/50 text-xs animate-pulse-soft pointer-events-none">
          <ChevronRight className="w-4 h-4" />
          Click or press arrow keys to navigate
        </div>
      )}
    </div>
  );
}
