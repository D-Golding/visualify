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

// Particle class
class Particle {
  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.size = Math.random() * 5 + 2;
    this.color = 'rgba(255, 255, 255, 0.8)';
    this.velocityX = Math.random() * 2 - 1;
    this.velocityY = Math.random() * 2 - 1;
    this.canvas = canvas;
    this.maxDistance = 100;
    this.speedMultiplier = 1;
    this.angle = Math.random() * Math.PI * 2;
    this.hue = Math.random() * 360;
  }

  update(frequencyData, bassBand, midBand, trebleBand) {
    // Apply magnetic force to return to origin
    const dx = this.originX - this.x;
    const dy = this.originY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate intensity multipliers based on frequency bands
    const bassInfluence = frequencyData[bassBand] / 255;
    const midInfluence = frequencyData[midBand] / 255;
    const trebleInfluence = frequencyData[trebleBand] / 255;

    // Update speed based on audio
    this.speedMultiplier = 0.5 + bassInfluence * 2;

    // Update size based on mid frequencies
    this.size = (2 + midInfluence * 8) * (distance / this.maxDistance + 0.5);

    // Return to origin with strength proportional to distance
    if (distance > this.maxDistance) {
      this.velocityX += dx * 0.003;
      this.velocityY += dy * 0.003;
    } else {
      // Random movement within allowed range
      this.angle += trebleInfluence * 0.2;
      this.velocityX += Math.cos(this.angle) * 0.1 * bassInfluence;
      this.velocityY += Math.sin(this.angle) * 0.1 * bassInfluence;
    }

    // Apply velocity limits
    const maxVelocity = 3 * this.speedMultiplier;
    const velocityLength = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
    if (velocityLength > maxVelocity) {
      this.velocityX = (this.velocityX / velocityLength) * maxVelocity;
      this.velocityY = (this.velocityY / velocityLength) * maxVelocity;
    }

    // Apply friction
    this.velocityX *= 0.95;
    this.velocityY *= 0.95;

    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Boundary check
    if (this.x < 0 || this.x > this.canvas.width) this.velocityX *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.velocityY *= -1;

    // Update color based on frequencies - using our custom palette
    // We'll rotate between the 4 palette colors based on the bass
    const colors = ['#332FD0', '#9254C8', '#E15FED', '#6EDCD9'];
    const colorIndex = Math.floor(((this.hue + bassInfluence * 100) % 360) / 90);
    const baseColor = colors[colorIndex];

    // Convert hex to rgba for opacity
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    const opacity = 0.5 + trebleInfluence * 0.5;

    this.color = `rgba(${r}, ${g}, ${b}, ${opacity})`;

    // Slowly change hue over time for variety
    this.hue = (this.hue + 0.2) % 360;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const ParticleMusicVisualizer = () => {
  // Use React.useState, React.useRef, and React.useEffect instead of destructuring
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null); // For fullscreen
  const [audioContext, setAudioContext] = React.useState(null);
  const [analyser, setAnalyser] = React.useState(null);
  const [audioElement, setAudioElement] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedSong, setSelectedSong] = React.useState('');
  const [songInfo, setSongInfo] = React.useState('No audio selected');
  const [isFullscreen, setIsFullscreen] = React.useState(false); // Track fullscreen state
  const animationRef = React.useRef(null);
  const audioSourceRef = React.useRef(null);
  const particlesRef = React.useRef([]);

  const songs = getSongData();

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

  // Handle Canvas Resize and initialize particles
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

        // Initialize particles
        initializeParticles();
      }
    };

    const initializeParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      particlesRef.current = [];
      const particleCount = 150;

      // Create particles in a grid
      const gridSize = Math.sqrt(particleCount);
      const spacingX = canvas.width / gridSize;
      const spacingY = canvas.height / gridSize;

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x = spacingX * i + spacingX/2 + (Math.random() * spacingX/2 - spacingX/4);
          const y = spacingY * j + spacingY/2 + (Math.random() * spacingY/2 - spacingY/4);
          particlesRef.current.push(new Particle(x, y, canvas));
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

          // Re-initialize particles with new dimensions
          initializeParticles();
        }, 100); // Small delay to allow fullscreen transition to complete
      }
    };

    const initializeParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      particlesRef.current = [];
      const particleCount = 150;

      // Create particles in a grid
      const gridSize = Math.sqrt(particleCount);
      const spacingX = canvas.width / gridSize;
      const spacingY = canvas.height / gridSize;

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x = spacingX * i + spacingX/2 + (Math.random() * spacingX/2 - spacingX/4);
          const y = spacingY * j + spacingY/2 + (Math.random() * spacingY/2 - spacingY/4);
          particlesRef.current.push(new Particle(x, y, canvas));
        }
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
    newAnalyser.fftSize = 512;
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
    }).catch(error => {
      console.error("Audio playback error:", error);
    });
  };

  // Particle Visualization function
  const visualize = (analyserNode) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Define frequency bands
    const bassBand = Math.floor(bufferLength * 0.08); // Lower frequencies
    const midBand = Math.floor(bufferLength * 0.4);   // Mid frequencies
    const trebleBand = Math.floor(bufferLength * 0.7); // Higher frequencies

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      // Get frequency data
      analyserNode.getByteFrequencyData(dataArray);

      // Semi-clear canvas with alpha for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate average levels for different frequency bands
      let bassSum = 0;
      let midSum = 0;
      let trebleSum = 0;

      for (let i = 0; i < bufferLength; i++) {
        if (i < bufferLength * 0.2) bassSum += dataArray[i];
        else if (i < bufferLength * 0.6) midSum += dataArray[i];
        else trebleSum += dataArray[i];
      }

      const bassAvg = bassSum / (bufferLength * 0.2);
      const midAvg = midSum / (bufferLength * 0.4);
      const trebleAvg = trebleSum / (bufferLength * 0.4);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(dataArray, bassBand, midBand, trebleBand);
        particle.draw(ctx);
      });

      // Draw connections between close particles
      if (bassAvg > 60) { // Only draw connections when bass is strong
        ctx.strokeStyle = `rgba(255, 255, 255, ${bassAvg / 255 * 0.2})`;
        ctx.lineWidth = 1;

        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x;
            const dy = particlesRef.current[i].y - particlesRef.current[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only connect close particles
            const connectionDistance = 50 + (bassAvg / 255) * 100;
            if (distance < connectionDistance) {
              const opacity = 1 - (distance / connectionDistance);

              // Choose a color from our palette based on bass intensity
              const colors = ['#332FD0', '#9254C8', '#E15FED', '#6EDCD9'];
              const colorIndex = Math.floor((bassAvg / 255) * colors.length);
              const baseColor = colors[Math.min(colorIndex, colors.length - 1)];

              // Convert hex to rgba
              const r = parseInt(baseColor.slice(1, 3), 16);
              const g = parseInt(baseColor.slice(3, 5), 16);
              const b = parseInt(baseColor.slice(5, 7), 16);

              ctx.beginPath();
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.2})`;
              ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
              ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
              ctx.stroke();
            }
          }
        }
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
    } else if (!selectedSong && songs.length > 0) {
      // If no song is selected, select the first one
      setSelectedSong(songs[0].id);
      setSongInfo(`Playing: ${songs[0].name}`);

      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
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
      <Title>Particle System Visualizer</Title>

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

export default ParticleMusicVisualizer;