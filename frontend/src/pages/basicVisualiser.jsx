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
  getSongData,
  FullscreenStyles // Import the FullscreenStyles component
} from './standardStyling.jsx';

const BasicMusicVisualizer = () => {
  // Use React.useState, React.useRef, and React.useEffect instead of destructuring
  const canvasRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const containerRef = React.useRef(null); // New ref for the container element for fullscreen
  const [audioContext, setAudioContext] = React.useState(null);
  const [analyser, setAnalyser] = React.useState(null);
  const [audioElement, setAudioElement] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedSong, setSelectedSong] = React.useState('');
  const [songInfo, setSongInfo] = React.useState('No audio selected');
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false); // Track fullscreen state
  const animationRef = React.useRef(null);
  const audioSourceRef = React.useRef(null);
  const pulseFactorRef = React.useRef(1); // Store pulseFactor in a ref to avoid the initialization issue

  const songs = getSongData();

  // Define custom colors for bars
  const barColors = ['#332FD0', '#9254C8', '#E15FED', '#6EDCD9'];

  // Define glow colors that match our palette
  const glowColors = [
    'rgba(51, 47, 208, 0.3)',   // Blue glow
    'rgba(146, 84, 200, 0.3)',  // Purple glow
    'rgba(225, 95, 237, 0.3)',  // Pink glow
    'rgba(110, 220, 217, 0.3)'  // Teal glow
  ];

  // Load background video
  React.useEffect(() => {
    // Create video element
    const video = document.createElement('video');
    video.src = '/src/assets/vid1.mp4';
    video.loop = true;
    video.muted = true; // Important: mute the video to allow autoplay
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

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
    newAnalyser.fftSize = 256;
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

  // Enhanced visualization function with video background and custom colors
  const visualize = (analyserNode) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Track bass values for pulsing between frames
    let lastBassValue = 0;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      // Get frequency data
      analyserNode.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate bass response (average of the first few frequency bins)
      const bassFrequencies = dataArray.slice(0, 5);
      const bassAverage = bassFrequencies.reduce((sum, value) => sum + value, 0) / bassFrequencies.length;

      // Create a smooth pulsing effect based on bass
      if (bassAverage > lastBassValue + 10) {
        // Bass is increasing - pulse outward
        pulseFactorRef.current = 1 + (bassAverage / 255) * 0.15; // Scale to max 15% increase
      } else {
        // Return gradually to normal
        pulseFactorRef.current = 1 + (pulseFactorRef.current - 1) * 0.85; // Decay factor
      }
      lastBassValue = bassAverage;

      // Draw video frame as background if loaded - with subtle pulse effect
      if (videoRef.current && !videoRef.current.paused) {
        // Apply zoom effect (cropping 20% off each side)
        const zoomFactor = 1.4; // Zoom in by 40% (removing ~20% from each side)

        // Combine zoom and pulse factors
        const totalScaleX = zoomFactor * pulseFactorRef.current;
        const totalScaleY = zoomFactor * pulseFactorRef.current;

        // Calculate final dimensions
        const scaledWidth = canvas.width * totalScaleX;
        const scaledHeight = canvas.height * totalScaleY;

        // Calculate offsets to center the zoomed video
        const offsetX = (scaledWidth - canvas.width) / 2;
        const offsetY = (scaledHeight - canvas.height) / 2;

        // Draw the scaled and zoomed video frame
        ctx.drawImage(
          videoRef.current,
          -offsetX, -offsetY,
          scaledWidth, scaledHeight
        );
      }

      // Calculate the height restriction (only bottom 60% of canvas)
      const maxBarHeightPercent = 0.60;
      const barAreaHeight = canvas.height * maxBarHeightPercent;
      const barStartY = canvas.height - barAreaHeight;

      // Draw bars - with thicker bars, increased spacing and more transparency
      // Reduce number of bars significantly for thicker appearance
      const visualizationBars = Math.floor(bufferLength / 3); // Fewer bars
      const barWidth = (canvas.width / visualizationBars) * 1.8; // Much thicker bars
      const barSpacing = 6; // Increased spacing between bars
      let x = 0;

      for (let i = 0; i < visualizationBars; i++) {
        // Skip some frequency data for more variation by using a wider step
        const dataIndex = Math.floor(i * (bufferLength / visualizationBars));

        // Get frequency value (0-255)
        const value = dataArray[dataIndex];

        // Add variable multiplier based on position to create a wave-like effect
        const position = i / visualizationBars; // 0 to 1 based on position
        const waveEffect = 0.8 + Math.sin(position * Math.PI) * 0.6; // Creates a wave pattern

        // Combined height multiplier with variation
        const heightMultiplier = 1.2 * waveEffect;

        // Calculate bar height - restricted to max 60% of canvas height
        const barHeight = (value / 255) * barAreaHeight * heightMultiplier;

        // Select color from our custom palette (cycle through the colors)
        const colorIndex = i % barColors.length;

        // Convert hex to rgba to add transparency
        const hexColor = barColors[colorIndex];
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        // Add 0.2 alpha for 80% transparency (much more transparent)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;

        // Create a subtle glow effect with increased glow size for visibility at high transparency
        ctx.shadowColor = glowColors[colorIndex];
        ctx.shadowBlur = 25; // Further increased blur for visibility with high transparency
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw bar (starting from the bottom 25% line)
        const barX = x + (barSpacing / 2); // Center the bar in its space
        ctx.fillRect(barX, canvas.height - barHeight, barWidth - barSpacing, barHeight);

        // Reset shadow for next iteration
        ctx.shadowBlur = 0;

        x += barWidth;
      }
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

    // Make sure video is playing when a song is selected
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(err => {
        console.error("Error playing video on song selection:", err);
      });
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

      // Make sure video is playing when audio plays
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(err => {
          console.error("Error playing video on play button:", err);
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

      // Note: We keep the video playing even when audio is paused
      // This creates a background ambient effect
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
    <>
      {/* Apply fullscreen styles */}
      <FullscreenStyles />

      <VisualizerContainer className="visualizer-container" ref={containerRef}>
        <Title>Music Visualizer</Title>

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
    </>
  );
};

export default BasicMusicVisualizer;