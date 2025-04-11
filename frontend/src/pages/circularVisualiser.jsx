import React from 'react';
import {
  VisualizerContainer,
  Title,
  CanvasContainer,
  VisualizerCanvas,
  Controls,
  Button,
  SongSelector,
  SongInfo,
  getSongData
} from './standardStyling.jsx';

const CircularMusicVisualizer = () => {
  // Use React.useState, React.useRef, and React.useEffect instead of destructuring
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null); // For fullscreen
  const videoRef = React.useRef(null); // Reference for background video
  const [audioContext, setAudioContext] = React.useState(null);
  const [analyser, setAnalyser] = React.useState(null);
  const [audioElement, setAudioElement] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedSong, setSelectedSong] = React.useState('');
  const [songInfo, setSongInfo] = React.useState('No audio selected');
  const [isFullscreen, setIsFullscreen] = React.useState(false); // Track fullscreen state
  const [videoLoaded, setVideoLoaded] = React.useState(false); // Track video loading
  const animationRef = React.useRef(null);
  const audioSourceRef = React.useRef(null);

  // Metallic color palette with more depth
  const visualizerColors = [
    '#E6E6E6',    // Base light silver
    '#D0D0D0',    // Mid-tone silver
    '#B0B0B0',    // Medium silver
    '#909090',    // Dark silver
    '#707070',    // Deep silver
    '#505050'     // Near-black silver
  ];

  const songs = getSongData();

  // Load background video
  React.useEffect(() => {
    // Create video element
    const video = document.createElement('video');
    video.src = '/src/assets/circlevid1.mov';
    video.loop = true; // Ensure video loops
    video.muted = true; // Important: mute the video to allow autoplay
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Force looping with event listener as backup
    video.addEventListener('ended', () => {
      video.play().catch(err => {
        console.error("Error replaying video after end:", err);
      });
    });

    // Set up event listeners
    video.onloadeddata = () => {
      videoRef.current = video;
      setVideoLoaded(true);

      // Start playing the video right away
      video.play().catch(err => {
        console.error("Error playing video:", err);
      });
    };

    video.onerror = (err) => {
      console.error("Error loading video:", err);
    };

    // Handle cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  // Initialize Audio Context
  React.useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    setAudioContext(new AudioContext());

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioSourceRef.current) {
        audioSourceRef.current.disconnect();
      }
    };
  }, []);

  // Handle Canvas Resize
  React.useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // If in fullscreen mode, use the entire viewport dimensions
        if (document.fullscreenElement) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        } else {
          // Otherwise use the container dimensions
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Setup fullscreen change detection
  React.useEffect(() => {
    const fullscreenChangeHandler = () => {
      const isCurrentlyFullscreen = document.fullscreenElement !== null;
      setIsFullscreen(isCurrentlyFullscreen);

      // Force canvas resize when fullscreen state changes
      if (canvasRef.current) {
        setTimeout(() => {
          if (isCurrentlyFullscreen) {
            // When in fullscreen, use the entire viewport dimensions
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
          } else {
            // When exiting fullscreen, revert to container dimensions
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
          }
        }, 100); // Small delay to allow fullscreen transition to complete
      }
    };

    // Add event listeners for all browser variants
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
    document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);

    return () => {
      // Clean up event listeners
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
    };
  }, []);

  // Setup Audio Processing
  const setupAudio = (url) => {
    if (!audioContext) return;

    // Clean up previous audio
    if (audioElement) {
      audioElement.pause();
      if (audioSourceRef.current) {
        audioSourceRef.current.disconnect();
      }
    }

    // Create new audio element
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    setAudioElement(audio);

    // Create audio analyser
    const newAnalyser = audioContext.createAnalyser();
    newAnalyser.fftSize = 1024; // Higher resolution for better frequency analysis
    setAnalyser(newAnalyser);

    // Connect the nodes
    const source = audioContext.createMediaElementSource(audio);
    audioSourceRef.current = source;
    source.connect(newAnalyser);
    newAnalyser.connect(audioContext.destination);

    // Start visualization
    visualize(newAnalyser);

    // Play
    audio.play().then(() => {
      setIsPlaying(true);

      // Make sure video is playing when audio starts
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(err => {
          console.error("Error playing video after audio start:", err);
        });
      }
    }).catch(error => {
      console.error("Audio playback error:", error);
    });
  };

  // Visualization function with metallic effect
  const visualize = (analyserNode) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let time = 0;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      // Get frequency data
      analyserNode.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video background if loaded
      if (videoRef.current && videoLoaded) {
        try {
          const videoWidth = videoRef.current.videoWidth;
          const videoHeight = videoRef.current.videoHeight;

          // Calculate scaling to cover the entire canvas while maintaining aspect ratio
          const scale = Math.max(
            canvas.width / videoWidth,
            canvas.height / videoHeight
          );

          const scaledWidth = videoWidth * scale;
          const scaledHeight = videoHeight * scale;

          // Center the video
          const x = (canvas.width - scaledWidth) / 2;
          const y = (canvas.height - scaledHeight) / 2;

          ctx.drawImage(videoRef.current, x, y, scaledWidth, scaledHeight);

          // If the video is paused, try to play it
          if (videoRef.current.paused) {
            videoRef.current.play().catch(err => {
              console.error("Error resuming paused video:", err);
            });
          }
        } catch (err) {
          console.error("Error drawing video:", err);
        }
      } else {
        // If video isn't loaded, fill with dark background
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;

      // Center circle
      const centerRadius = radius / 12;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;
      ctx.fill();

      const segments = 180;
      const segmentAngle = (2 * Math.PI) / segments;
      const lengthMultiplier = 1.8;

      for (let i = 0; i < segments; i++) {
        const frequencyBin = Math.floor((segments - i - 1) * (bufferLength / segments * 0.75));
        const value = dataArray[frequencyBin];
        const barHeight = (value / 255) * (radius * 0.8) * lengthMultiplier;

        const startAngle = i * segmentAngle;

        // Calculate segment coordinates
        const innerX = centerX + Math.cos(startAngle) * (centerRadius * 1.5);
        const innerY = centerY + Math.sin(startAngle) * (centerRadius * 1.5);
        const outerX = centerX + Math.cos(startAngle) * (centerRadius * 1.5 + barHeight);
        const outerY = centerY + Math.sin(startAngle) * (centerRadius * 1.5 + barHeight);

        // Metallic color selection
        const normalizedValue = value / 255;
        const colorIndex = Math.min(Math.floor(normalizedValue * visualizerColors.length), visualizerColors.length - 1);
        const baseColor = visualizerColors[colorIndex];

        // Convert hex to rgb
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);

        // Create metallic gradient effect
        const gradient = ctx.createLinearGradient(innerX, innerY, outerX, outerY);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.6)`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, 0.3)`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.8)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.6)`);

        // Metallic highlight
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.lineWidth = radius / 35; // Slightly thinner for metallic look
        ctx.strokeStyle = gradient;
        ctx.lineCap = 'round'; // Rounded ends for a smoother look
        ctx.stroke();

        // Add subtle metallic shimmer for high-intensity frequencies
        if (value > 180) {
          const shimmerGradient = ctx.createLinearGradient(innerX, innerY, outerX, outerY);
          shimmerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
          shimmerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
          shimmerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');

          ctx.beginPath();
          ctx.moveTo(innerX, innerY);
          ctx.lineTo(outerX, outerY);
          ctx.lineWidth = radius / 25; // Slightly wider shimmer
          ctx.strokeStyle = shimmerGradient;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      time += 0.01;
    };

    draw();
  };

  // Handle song selection
  const handleSongChange = (e) => {
    const songId = e.target.value;
    if (!songId) {
      setSelectedSong('');
      setSongInfo('No audio selected');
      if (audioElement) {
        audioElement.pause();
        setIsPlaying(false);
      }
      return;
    }

    const song = songs.find(s => s.id === songId);
    setSelectedSong(songId);
    setSongInfo(`Playing: ${song.name}`);

    // Resume AudioContext if it's suspended (browsers require user interaction)
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }

    setupAudio(song.path);
  };

  // Play button handler
  const handlePlay = () => {
    if (audioElement && !isPlaying) {
      audioElement.play();
      setIsPlaying(true);

      // Resume AudioContext if suspended
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Make sure video is playing when audio starts
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(err => {
          console.error("Error playing video after audio start:", err);
        });
      }
    } else if (!selectedSong && songs.length > 0) {
      // If no song is selected, select the first one
      setSelectedSong(songs[0].id);
      setSongInfo(`Playing: ${songs[0].name}`);

      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Make sure video is playing
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(err => {
          console.error("Error playing video on auto-play:", err);
        });
      }

      setupAudio(songs[0].path);
    }
  };

  // Pause button handler
  const handlePause = () => {
    if (audioElement && isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      const container = containerRef.current;
      if (container) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) { /* Safari */
          container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { /* IE11 */
          container.msRequestFullscreen();
        }
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
  };

  return (
    <VisualizerContainer className="visualizer-container" ref={containerRef}>
      <Title>Vinyl Record Visualizer</Title>

      <CanvasContainer className="canvas-container">
        <VisualizerCanvas ref={canvasRef} />
      </CanvasContainer>

      <Controls className="controls">
        <SongSelector
          value={selectedSong}
          onChange={handleSongChange}
        >
          <option value="">Select a song</option>
          {songs.map(song => (
            <option key={song.id} value={song.id}>{song.name}</option>
          ))}
        </SongSelector>

        <Button primary onClick={handlePlay}>Play</Button>
        <Button onClick={handlePause}>Pause</Button>
        <Button
          onClick={toggleFullscreen}
          style={{
            backgroundColor: isFullscreen ? '#E15FED' : '#6EDCD9',
            boxShadow: `0 0 8px rgba(${isFullscreen ? '225, 95, 237' : '110, 220, 217'}, 0.5)`
          }}
        >
          {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
        </Button>
      </Controls>

      <SongInfo>{songInfo}</SongInfo>
    </VisualizerContainer>
  );
};

export default CircularMusicVisualizer;