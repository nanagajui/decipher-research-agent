"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AudioPlayerProps {
  src: string | null;
  title?: string;
}

export function AudioPlayer({
  src,
  title = "Audio Overview",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<Record<string, any> | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Construct the full URL for the audio file
  const getAudioUrl = (path: string | null): string | null => {
    console.log('getAudioUrl input:', path);
    
    if (!path || path === 'IN_PROGRESS' || path === 'ERROR') return null;
    
    try {
      // If it's already a full URL, return as is
      if (path.startsWith('http')) {
        console.log('Using provided URL:', path);
        return path;
      }
      
      // Handle local file paths
      const filename = path.split('/').pop();
      if (!filename) {
        console.error('No filename found in path:', path);
        return null;
      }
      
      // Always use the full backend URL in development
      // This is critical to avoid trying to load from frontend server
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8001' 
        : '';
      
      const url = `${baseUrl}/api/audio/${filename}`;
      console.log('Constructed audio URL:', url);
      return url;
    } catch (error) {
      console.error('Error constructing audio URL:', error);
      return null;
    }
  };

  const audioUrl = getAudioUrl(src);

  // Add additional debugging
  console.log('AudioPlayer render:', { 
    src, 
    audioUrl, 
    hasAudioElement: !!audioRef.current 
  });

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    // Sync initial state
    setIsPlaying(!audioElement.paused);
    setIsMuted(audioElement.muted);
    setVolume(audioElement.volume);
    
    // Set initial volume if needed
    if (volume > 0) {
      audioElement.volume = volume;
    }

    const handlePlay = () => {
      console.log('Audio event: play');
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log('Audio event: pause');
      setIsPlaying(false);
    };
    const handleEnded = () => {
      console.log('Audio event: ended');
      setIsPlaying(false);
    };
    const handleVolumeChange = () => {
      console.log('Audio event: volumechange', { 
        volume: audioElement.volume, 
        muted: audioElement.muted 
      });
      if (audioElement.volume === 0 || audioElement.muted) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
        setVolume(audioElement.volume);
      }
    };

    // Attach event listeners
    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('volumechange', handleVolumeChange);

    return () => {
      // Clean up event listeners
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      console.log('Loading new audio URL:', audioUrl);
      // Force reload when URL changes
      audioRef.current.load();
      setHasError(false);
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };


  
  // Log the audio URL for debugging and test direct fetch
  useEffect(() => {
    if (audioUrl) {
      console.log('Audio URL:', audioUrl);
      
      // Skip diagnostic fetch in production to avoid console errors
      if (process.env.NODE_ENV === 'development') {
        try {
          // Test direct fetch of the audio file with timeout and proper headers
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
          
          fetch(audioUrl, { 
            method: 'HEAD',
            signal: controller.signal,
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
              'Access-Control-Request-Method': 'HEAD',
              'Origin': window.location.origin
            }
          })
          .then(response => {
            clearTimeout(timeoutId);
            console.log('Audio file HEAD request response:', {
              status: response.status,
              statusText: response.statusText,
              headers: Object.fromEntries(response.headers.entries()),
              url: response.url
            });
          })
          .catch(error => {
            clearTimeout(timeoutId);
            // Only log if not aborted
            if (error.name !== 'AbortError') {
              console.warn('Diagnostic HEAD request failed:', error.message);
              // This is just a diagnostic check - no need to show an error to the user
            }
          });
        } catch (error) {
          // Safely handle any unexpected errors
          console.warn('Error in diagnostic fetch:', error);
        }
      }
      
      // Always try to load the audio regardless of the HEAD request
      if (audioRef.current) {
        console.log('Loading audio source:', audioUrl);
        audioRef.current.load();
      }
    }
  }, [audioUrl]);
  
  // Add additional debugging
  console.log('AudioPlayer render:', { 
    src, 
    audioUrl, 
    hasAudioElement: !!audioRef.current 
  });

  if (!audioUrl) {
    if (src === 'IN_PROGRESS') {
      return (
        <Card className="w-full">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-muted-foreground">Generating audio overview...</p>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    if (src === 'ERROR') {
      return (
        <Card className="w-full">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p>Failed to generate audio overview</p>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No audio source available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>

          <div className="space-y-3">
            <audio
              ref={audioRef}
              key={audioUrl}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onCanPlayThrough={() => {
                console.log("Audio can play through without buffering");
                setHasError(false);
              }}
              onLoadedMetadata={() => {
                console.log("Audio metadata loaded", {
                  duration: audioRef.current?.duration,
                  src: audioRef.current?.currentSrc,
                });
                setHasError(false);
              }}
              onError={(e) => {
                try {
                  const audio = e.target as HTMLAudioElement;
                  const errorInfo = {
                    errorCode: audio.error ? audio.error.code : 'unknown',
                    errorMessage: audio.error ? audio.error.message : 'unknown',
                    src: audio.currentSrc || audioUrl,
                    networkState: audio.networkState,
                    readyState: audio.readyState
                  };
                  console.error('Audio error details:', errorInfo);
                  
                  let errorMessage = 'Failed to load audio';
                  if (audio.error) {
                    switch(audio.error.code) {
                      case MediaError.MEDIA_ERR_ABORTED:
                        errorMessage = 'Playback was aborted';
                        break;
                      case MediaError.MEDIA_ERR_NETWORK:
                        errorMessage = 'Network error while loading audio';
                        break;
                      case MediaError.MEDIA_ERR_DECODE:
                        errorMessage = 'Error decoding audio';
                        break;
                      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        errorMessage = 'Audio format not supported';
                        break;
                    }
                  }
                  
                  toast.error(errorMessage, {
                    description: 'Check the console for details.'
                  });
                  setHasError(true);
                } catch (err) {
                  console.error('Error in error handler:', err);
                  toast.error('Audio playback error');
                  setHasError(true);
                }
              }}
              preload="auto"
              style={{ width: '100%', display: 'none' }}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            
            {hasError && (
              <div className="text-center p-2 border border-destructive rounded-md bg-destructive/10">
                <p className="text-sm text-destructive font-medium">Error loading audio</p>
                <a 
                  href={audioUrl || '#'} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Try direct download instead
                </a>
              </div>
            )}
          </div>


          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="h-12 w-12 rounded-full"
              disabled={!audioUrl}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider
                value={[currentTime]}
                max={duration || 0}
                step={0.1}
                onValueChange={handleSeek}
                className="mt-2"
                disabled={!audioUrl}
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="p-2"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
