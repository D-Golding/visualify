import styled, { createGlobalStyle } from 'styled-components';

// Define enhanced color scheme with your custom colors
export const COLORS = {
  background: '#111',
  canvasBackground: 'transparent', // Changed to transparent for image background
  primary: '#332FD0',             // Using your first color
  secondary: '#9254C8',           // Using your second color
  accent1: '#E15FED',             // Using your third color
  accent2: '#6EDCD9',             // Using your fourth color
  text: '#ffffff',
  controlsBg: 'rgba(0, 0, 0, 0.7)',
  controlsBorder: 'rgba(255, 255, 255, 0.2)',
};

// Global styles for fullscreen mode - IMPROVED VERSION
export const FullscreenStyles = createGlobalStyle`
  /* Set the container to fill the entire screen with no margins or padding */
  .visualizer-container:fullscreen {
    padding: 0 !important;
    margin: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    display: flex !important;
    flex-direction: column !important;
    background-color: ${COLORS.background} !important;
    overflow: hidden !important;
    max-width: none !important; /* Override any max-width */
  }
  
  /* Make the canvas container take all available space */
  .visualizer-container:fullscreen .canvas-container {
    flex: 1 !important;
    height: 100vh !important;
    width: 100vw !important;
    margin: 0 !important;
    border-radius: 0 !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }
  
  /* Make the canvas itself fill its container entirely */
  .visualizer-container:fullscreen canvas {
    width: 100vw !important;
    height: 100vh !important;
    border-radius: 0 !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }
  
  /* Move controls to bottom overlay */
  .visualizer-container:fullscreen .controls {
    position: fixed !important;
    bottom: 20px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: auto !important;
    min-width: 300px !important;
    padding: 15px !important;
    background: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(10px) !important;
    border-radius: 15px !important;
    opacity: 0.7 !important;
    transition: opacity 0.3s ease !important;
    z-index: 1000 !important;
  }
  
  .visualizer-container:fullscreen .controls:hover {
    opacity: 1 !important;
  }
  
  /* Put title at the top of the screen */
  .visualizer-container:fullscreen h1 {
    position: fixed !important;
    top: 10px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    font-size: 16px !important;
    opacity: 0.5 !important;
    transition: opacity 0.3s ease !important;
    z-index: 1000 !important;
    margin: 0 !important;
    padding: 5px 15px !important;
    background: rgba(0, 0, 0, 0.6) !important;
    border-radius: 15px !important;
  }
  
  .visualizer-container:fullscreen h1:hover {
    opacity: 1 !important;
  }
  
  /* Position song info near the controls */
  .visualizer-container:fullscreen div:last-child {
    position: fixed !important;
    bottom: 80px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    opacity: 0.5 !important;
    transition: opacity 0.3s ease !important;
    z-index: 1000 !important;
    background: rgba(0, 0, 0, 0.6) !important;
    padding: 5px 15px !important;
    border-radius: 10px !important;
  }
  
  .visualizer-container:fullscreen div:last-child:hover {
    opacity: 1 !important;
  }
`;

// Main container for all visualizers - made more elegant
export const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 400px;
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  font-family: 'Montserrat', Arial, sans-serif;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
  
  /* When embedded, respect parent's width */
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  
  /* Fullscreen transition */
  transition: all 0.3s ease;
  
  /* Specific styles for fullscreen mode handled by createGlobalStyle above */
`;

// Title styling - more modern
export const Title = styled.h1`
  margin-bottom: 12px;
  font-size: 20px;
  letter-spacing: 1.5px;
  font-weight: 600;
  color: ${COLORS.text};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
`;

// Canvas container with transparent background
export const CanvasContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

// Canvas styling - enhanced for better visual experience
export const VisualizerCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.canvasBackground};
  border-radius: 8px;
  display: block;
`;

// Circle canvas styling (specifically for the circular visualizer)
export const CircleCanvas = styled(VisualizerCanvas)`
  border-radius: 50%;
`;

// Controls container - glass morphism style
export const Controls = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
  max-width: 600px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
`;

// Button styling - glowing effect
export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.primary ? COLORS.primary : COLORS.secondary};
  color: ${COLORS.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(${props => props.primary ? '51, 47, 208' : '146, 84, 200'}, 0.5);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 12px rgba(${props => props.primary ? '51, 47, 208' : '146, 84, 200'}, 0.8);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

// Song selector styling - more elegant
export const SongSelector = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  background-color: ${COLORS.controlsBg};
  color: ${COLORS.text};
  border: 1px solid ${COLORS.controlsBorder};
  cursor: pointer;
  width: auto;
  min-width: 120px;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, ${COLORS.accent2} 50%), 
                    linear-gradient(135deg, ${COLORS.accent2} 50%, transparent 50%);
  background-position: calc(100% - 15px) center, calc(100% - 10px) center;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(110, 220, 217, 0.4);
    border-color: ${COLORS.accent2};
  }
`;

// Song info display - subtle glow
export const SongInfo = styled.div`
  margin-top: 12px;
  font-size: 13px;
  color: ${COLORS.text};
  font-weight: 300;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(110, 220, 217, 0.7);
`;

// Range slider container
export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
  max-width: 600px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const SliderLabel = styled.label`
  font-size: 13px;
  color: ${COLORS.text};
  font-weight: 500;
`;

// Enhanced slider with custom colors
export const Slider = styled.input`
  width: 150px;
  height: 6px;
  border-radius: 3px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, ${COLORS.primary}, ${COLORS.accent1});
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${COLORS.accent2};
    cursor: pointer;
    box-shadow: 0 0 8px rgba(110, 220, 217, 0.7);
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${COLORS.accent2};
    cursor: pointer;
    border: none;
    box-shadow: 0 0 8px rgba(110, 220, 217, 0.7);
  }
`;

export const SliderValue = styled.span`
  font-size: 13px;
  color: ${COLORS.text};
  min-width: 30px;
  text-align: center;
  font-weight: 300;
`;

// Helper function to get standardized song data with configurable file path
export const getSongData = (basePath = '') => {
  // If basePath is provided, ensure it ends with a slash
  const audioPath = basePath ? (basePath.endsWith('/') ? basePath : `${basePath}/`) : '';

  return [
    { id: 'song1', name: 'Song 1', path: '/src/assets/song1.mp3' },
    { id: 'song2', name: 'Song 2', path: '/src/assets/song2.mp3' },
    { id: 'song3', name: 'Song 3', path: '/src/assets/song3.mp3' },
    { id: 'song4', name: 'Song 4', path: '/src/assets/song4.mp3' },
    { id: 'song5', name: 'Song 5', path: '/src/assets/song5.mp3' },
  ];
};