import { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void;
  onFaceDetected?: (detected: boolean) => void;
  mode?: 'register' | 'verify';
}

export function WebcamCapture({ onCapture, onFaceDetected, mode = 'register' }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(null);
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setFaceDetected(false);
      setIsScanning(false);
    }
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(imageData);
      }
    }
  }, [onCapture]);

  // Simulate face detection
  useEffect(() => {
    if (isStreaming && mode === 'verify') {
      setIsScanning(true);
      const interval = setInterval(() => {
        const detected = Math.random() > 0.3;
        setFaceDetected(detected);
        onFaceDetected?.(detected);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStreaming, mode, onFaceDetected]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border-2 border-border">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        {!isStreaming && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Camera className="w-12 h-12" />
            <p className="text-sm font-medium">Camera not started</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-destructive p-4">
            <AlertCircle className="w-12 h-12" />
            <p className="text-sm text-center">{error}</p>
          </div>
        )}

        {isScanning && isStreaming && (
          <>
            {/* Scanning overlay */}
            <div className="absolute inset-0 border-2 border-primary/50 rounded-xl pointer-events-none">
              <div className="absolute left-0 right-0 h-0.5 bg-primary/70 animate-scan" />
            </div>
            <div className={cn(
              "absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold",
              faceDetected
                ? "bg-success/90 text-success-foreground"
                : "bg-muted/90 text-muted-foreground"
            )}>
              {faceDetected ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Face Detected
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Scanning...
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex gap-3">
        {!isStreaming ? (
          <Button onClick={startCamera} className="flex-1 gap-2">
            <Camera className="w-4 h-4" />
            Start Camera
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={stopCamera} className="flex-1 gap-2">
              <RefreshCw className="w-4 h-4" />
              Stop Camera
            </Button>
            <Button onClick={captureImage} className="flex-1 gap-2">
              {mode === 'register' ? 'Capture Face' : 'Verify & Mark'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
