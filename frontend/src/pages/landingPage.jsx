import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SiBytedance } from "react-icons/si";
import { FaUserCircle, FaRegShareSquare } from 'react-icons/fa';
import { IoColorPaletteOutline, IoMusicalNotes } from "react-icons/io5";
import MusicVisualizerCarousel from './swiperComponent.jsx';
import { TbBrandSpotify } from "react-icons/tb";
import vid1 from '../assets/vid1.mp4';
import teamImg from '../assets/team.jpeg';
import pic1 from '../assets/pic3.jpeg'; // Tech innovation
import pic2 from '../assets/pic2.jpeg'; // Multilingual
import pic3 from '../assets/pic5.jpeg'; // Ready to experience
import pic4 from '../assets/pic4.jpeg'; // header

// Define custom icon components
const IconMusic = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const IconPalette = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5"></circle>
    <circle cx="17.5" cy="10.5" r=".5"></circle>
    <circle cx="8.5" cy="7.5" r=".5"></circle>
    <circle cx="6.5" cy="12.5" r=".5"></circle>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
  </svg>
);

const IconCode = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const IconSun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const IconMoon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const IconChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const IconHeadphones = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const IconMaximize = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

// Create theme objects for light and dark mode
const themes = {
  light: {
    primary: '#332FD0',
    secondary: '#9254C8',
    accent1: '#E15FED',
    accent2: '#6EDCD9',
    light: '#FFFFFF',
    background: '#F8F9FC',
    text: '#2A2C3E',
    textLight: '#6C6F82',
    card: '#FFFFFF',
    border: '#E2E5EF'
  },
  dark: {
    primary: '#332FD0',
    secondary: '#9254C8',
    accent1: '#E15FED',
    accent2: '#6EDCD9',
    light: '#FFFFFF',
    background: '#121318',
    text: '#E2E5EF',
    textLight: '#A0A4B8',
    card: '#1E1F26',
    border: '#2D2F3B'
  }
};

// Global styles including animations
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Inter', sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    scroll-behavior: smooth;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.secondary};
    }
  }

  button {
    font-family: 'Inter', sans-serif;
  }
  
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
  
  @keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// Page container
const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  color: ${props => props.theme.text};
  line-height: 1.6;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
  padding-top: 60px; /* Added to account for fixed header */
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Hero section styles
const HeroSection = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 60px;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${pic4});
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  text-align: center;
  color: ${props => props.theme.light};
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(51,47,208,0.4) 100%);
  z-index: 1;
`;

// Header and title styles - Fixed header
const SubHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 15px 0;
  background-color: ${props => `${props.theme.background}E6`};
  backdrop-filter: blur(10px);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  
  svg {
    font-size: 1.8rem;
    margin-right: 0.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  margin-left: 30px;
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
  
  svg {
    stroke-width: 2px;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  margin-left: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.theme.text};
  }
`;

const TitleIcon = styled.div`
  font-size: 24px;
  color: ${props => props.theme.light};
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  
  svg {
    animation: float 3s ease-in-out infinite;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 56px;
  font-weight: 800;
  background: linear-gradient(to right, 
    ${props => props.theme.primary}, 
    ${props => props.theme.secondary}, 
    ${props => props.theme.accent1}, 
    ${props => props.theme.accent2});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 15px;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
  text-shadow: 0 5px 30px rgba(225, 95, 237, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.primary}, ${props => props.theme.accent2});
    border-radius: 2px;
  }
`;

const PageSubtitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: ${props => props.theme.light};
  margin-bottom: 30px;
  font-weight: 400;
  letter-spacing: 0.5px;
  max-width: 700px;
  margin: 0 auto;
`;

const ComingSoonBadge = styled.div`
  background: linear-gradient(to right, ${props => props.theme.accent1}, ${props => props.theme.accent2});
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 600;
  margin-bottom: 30px;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(110, 220, 217, 0.3);
  animation: pulse 2s infinite ease-in-out;
`;

// Main content styling
const IntroText = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: ${props => props.theme.text};
  max-width: 800px;
  margin: 0 auto 40px;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
`;

// Visualizer container
const VisualizerSection = styled.section`
  position: relative;
  padding: 50px 0;
  margin: 40px 0;
`;

const CustomVisualizerWrapper = styled.div`
  width: 100%;
max-width: 100%;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.12'});
  background: linear-gradient(145deg, #18181f, #0d0d0d);
  position: relative;
  z-index: 2;
  
  /* Create a subtle colored border effect */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      ${props => props.theme.primary}, 
      ${props => props.theme.secondary}, 
      ${props => props.theme.accent1}, 
      ${props => props.theme.accent2});
    z-index: -1;
    border-radius: 18px;
    filter: blur(10px);
    opacity: 0.7;
  }
  
  /* Ensure the wrapper doesn't add constraints in fullscreen mode */
  .visualizer-container:fullscreen & {
    max-width: 100%;
    width: 100%;
    border-radius: 0;
    margin: 0;
    height: 100vh;
    
    &::before {
      display: none;
    }
  }
`;

const VisualizerControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  svg {
    stroke-width: 1.5px;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  color: white;
  
  .track-art {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    margin-right: 10px;
    background: linear-gradient(45deg, ${props => props.theme.secondary}, ${props => props.theme.accent1});
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .track-details {
    .track-name {
      font-weight: 500;
      font-size: 14px;
    }
    
    .track-artist {
      font-size: 12px;
      opacity: 0.7;
    }
  }
`;

// Section styling
const SectionContainer = styled.section`
  margin: 80px 0;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.text};
  font-size: 28px;
  margin-bottom: 25px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: color 0.3s ease;
  justify-content: center; /* Added to center the title */
  text-align: center; /* Added to ensure text is centered */
  
  svg {
    color: ${props => props.theme.secondary};
  }
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, ${props => props.theme.border}, transparent);
    margin-left: 15px;
    transition: background 0.3s ease;
    display: none; /* Hide the line that was to the right of the title */
  }
`;

const SectionContent = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: ${props => props.theme.textLight};
  transition: color 0.3s ease;
  text-align: center; /* Added to center the content text */
  
  p {
    margin-bottom: 20px;
    margin-left: auto; /* Added to center the paragraph */
    margin-right: auto; /* Added to center the paragraph */
    max-width: 800px; /* Optional: Add a max-width for better readability */
  }
  
  strong {
    color: ${props => props.theme.text};
    font-weight: 600;
    transition: color 0.3s ease;
  }
`;

// Feature cards grid
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin: 40px 0;
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.card};
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, ${props => props.isDark ? '0.2' : '0.05'});
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.border};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
    border-color: rgba(146, 84, 200, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, 
    ${props => props.color || props.theme.primary}20, 
    ${props => props.color || props.theme.secondary}10);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  svg {
    color: ${props => props.color || props.theme.primary};
    stroke-width: 1.5px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  color: ${props => props.theme.text};
  font-weight: 600;
  transition: color 0.3s ease;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${props => props.theme.textLight};
  margin: 0;
  transition: color 0.3s ease;
`;

// How It Works section
const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
`;

const StepCard = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 30px;
    right: -10%;
    width: 20%;
    height: 2px;
    background: linear-gradient(to right, ${props => props.theme.accent2}, transparent);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

// Updated StepNumber with interactive hover effect
const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.primary}, ${props => props.theme.secondary});
  color: white;
  border-radius: 50%;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(51, 47, 208, 0.3);
  transition: all 0.3s ease-in-out;
  position: relative;
  cursor: pointer;
  
  /* Interactive hover effect */
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 8px 25px rgba(51, 47, 208, 0.5);
    
    &::after {
      opacity: 1;
      transform: scale(1.2);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(135deg, ${props => props.theme.accent1}, ${props => props.theme.accent2});
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: all 0.3s ease;
    transform: scale(0.8);
  }
`;

const StepText = styled.p`
  font-weight: 500;
  color: ${props => props.theme.text};
  max-width: 200px;
`;

// Newsletter signup
const NewsletterSection = styled.div`
  margin: 60px 0;
  padding: 40px;
  background: ${props => props.theme.card};
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, ${props => props.isDark ? '0.25' : '0.07'});
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, 
      ${props => props.theme.primary}, 
      ${props => props.theme.secondary}, 
      ${props => props.theme.accent1}, 
      ${props => props.theme.accent2});
  }
`;

const NewsletterTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: ${props => props.theme.text};
`;

const NewsletterDescription = styled.p`
  color: ${props => props.theme.textLight};
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  max-width: 500px;
`;

const EmailInput = styled.input`
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.border};
  background: ${props => props.isDark ? 'rgba(30, 31, 38, 0.6)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.theme.text};
  font-size: 14px;
  flex: 1;
  min-width: 250px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}30;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, ${props => props.theme.primary}, ${props => props.theme.secondary});
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(51, 47, 208, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(51, 47, 208, 0.3);
  }
`;

// Team section styling with centered image
const TeamSection = styled.section`
  margin: 80px 0;
  text-align: center;
`;

const TeamImage = styled.img`
  max-width: 90%;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
  margin: 40px auto 0;
  display: block; /* This ensures proper centering */
`;

// Testimonials section
const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin: 40px 0;
`;

const TestimonialCard = styled.div`
  background: ${props => props.theme.card};
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, ${props => props.isDark ? '0.2' : '0.05'});
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.border};
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
    border-color: rgba(146, 84, 200, 0.3);
  }
  
  &::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 60px;
    color: ${props => props.theme.primary}20;
    font-family: Georgia, serif;
    line-height: 0;
  }
`;

const Quote = styled.p`
  font-style: italic;
  color: ${props => props.theme.textLight};
  margin: 20px 0;
  position: relative;
  z-index: 1;
`;

const Author = styled.p`
  font-weight: 600;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  &::before {
    content: '— ';
    margin-right: 5px;
  }
`;

// CTA Section styling
const CTASection = styled.div`
  margin: 80px 0 40px;
  padding: 80px 40px;
  position: relative;
  text-align: center;
  overflow: hidden;
  border-radius: 16px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${pic3});
    background-size: cover;
    background-position: center;
    opacity: 0.8;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(42, 44, 62, 0.85) 0%, rgba(51, 47, 208, 0.75) 100%);
    z-index: 1;
  }
`;

const CTATitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  color: ${props => props.theme.light};
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

const CTAText = styled.p`
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto 30px;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 2;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(to right, ${props => props.theme.primary}, ${props => props.theme.secondary});
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(51, 47, 208, 0.3);
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(51, 47, 208, 0.4);
    color: white;
  }
  
  svg {
    stroke-width: 2px;
  }
`;

// Footer styling
const Footer = styled.footer`
  margin-top: 80px;
  padding: 40px 0 20px;
  text-align: center;
  color: ${props => props.theme.textLight};
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(to right, ${props => props.theme.primary}, ${props => props.theme.accent2});
    border-radius: 3px;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.textLight};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-3px);
  }
`;

// Additional styles for fullscreen mode
const FullscreenPageStyles = createGlobalStyle`
  /* Hide page content when visualizer is in fullscreen mode */
  .visualizer-container:fullscreen ~ * {
    display: none;
  }
  
  /* Ensure visualizer takes full height and width */
  .visualizer-container:fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: #000;
    padding: 0;
    margin: 0;
    width: 100vw !important;
    height: 100vh !important;
    max-width: none;
  }
  
  /* Ensure canvas container fills available space */
  .visualizer-container:fullscreen .canvas-container {
    height: 100vh !important;
    border-radius: 0;
  }
`;

// Main component
const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Add scroll listener for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('visualifyDarkMode', (!isDarkMode).toString());
  };

  // Toggle fullscreen function
  const toggleFullscreen = () => {
    const visualizerElement = document.querySelector('.visualizer-container');

    if (!document.fullscreenElement) {
      if (visualizerElement) {
        visualizerElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setIsFullscreen(true);
      } else {
        // If the swiper component is active, find the swiper container
        const swiperContainer = document.querySelector('.swiper-container') ||
                                document.querySelector('.swiper') ||
                                document.querySelector('.swiper-wrapper');

        if (swiperContainer) {
          swiperContainer.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
          setIsFullscreen(true);
        }
      }
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
  <ThemeProvider theme={isDarkMode ? themes.dark : themes.light}>
    <GlobalStyle />
    <PageContainer>
      {/* Fixed SubHeader with enhanced shadow when scrolled */}
      <SubHeader style={{
        boxShadow: isScrolled
          ? `0 4px 20px rgba(0, 0, 0, ${isDarkMode ? '0.3' : '0.1'})`
          : `0 2px 10px rgba(0, 0, 0, ${isDarkMode ? '0.2' : '0.05'})`
      }}>
        <NavMenu>
          <Logo>
            <SiBytedance />
            Visualify
          </Logo>
          <NavLinks>
            <NavLink href="#features"><IconMusic size={16} /> Features</NavLink>
            <NavLink href="#how"><IconCode size={16} /> How It Works</NavLink>
            <NavLink href="#team"><IconGlobe size={16} /> Our Team</NavLink>
            <ThemeToggle onClick={toggleTheme} isDark={isDarkMode}>
              {isDarkMode ? <IconSun size={16} /> : <IconMoon size={16} />}
            </ThemeToggle>
          </NavLinks>
        </NavMenu>
      </SubHeader>

      <HeroSection>
        <HeroImage />
        <HeroOverlay />
        <HeroContent>
          <ComingSoonBadge>Coming Soon</ComingSoonBadge>
          <TitleIcon><IconMusic size={32} /></TitleIcon>
          <PageTitle>VISUALIFY</PageTitle>
          <PageSubtitle>Transform Your Music into Visual Art with Stunning Real-time Visualisations</PageSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <IntroText>
          Experience your favourite Spotify tracks like never before with Visualify.
          Our interactive music visualiser creates stunning visual representations that react to every beat,
          frequency, and mood of your music.
        </IntroText>

        {/* Visualisation Showcase section moved to appear first */}
        <SectionContainer>
          <SectionTitle>
            <IconMusic size={24} /> Visualisation Showcase
          </SectionTitle>
          <SectionContent>
            <p>A glimpse of what's possible with Visualify. Our visualisations range from classic waveforms to particle systems,
              geometric patterns, and more—all reacting in real-time to your music.</p>
          </SectionContent>

          {/* The visualizer component moved to the showcase section */}
          <VisualizerSection isDark={isDarkMode}>
            <CustomVisualizerWrapper isDark={isDarkMode}>
              <VisualizerControls>
                <TrackInfo>
                  <div className="track-art">
                    <IconHeadphones size={16} />
                  </div>
                  <div className="track-details">
                    <div className="track-name">VISUALIFY Demo</div>
                    <div className="track-artist">Multiple Visualisers</div>
                  </div>
                </TrackInfo>
                <div>
                  <ControlButton>
                    <IconSettings size={18} />
                  </ControlButton>
                  <ControlButton onClick={toggleFullscreen}>
                    <IconMaximize size={18} />
                  </ControlButton>
                </div>
              </VisualizerControls>
              <MusicVisualizerCarousel />
            </CustomVisualizerWrapper>
          </VisualizerSection>
        </SectionContainer>

        <SectionContainer id="features">
          <SectionTitle>
            <IconPalette size={24} /> Features
          </SectionTitle>
          <SectionContent>
            <p>Visualify brings your music to life with stunning visualisations and seamless Spotify integration.
              Choose from multiple visualisation styles, customise your experience, and share your creations with friends.</p>
          </SectionContent>

          <FeaturesGrid>
            <FeatureCard isDark={isDarkMode}>
              <FeatureIcon color={themes.light.primary}>
                <IconMusic size={24} />
              </FeatureIcon>
              <FeatureTitle>Real-time Visualisation</FeatureTitle>
              <FeatureDescription>
                Watch your music come to life with responsive animations that react to beat, frequency, and more.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard isDark={isDarkMode}>
              <FeatureIcon color={themes.light.secondary}>
                <TbBrandSpotify size={24} />
              </FeatureIcon>
              <FeatureTitle>Spotify Integration</FeatureTitle>
              <FeatureDescription>
                Seamlessly connect with Spotify to visualise any track in your library.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard isDark={isDarkMode}>
              <FeatureIcon color={themes.light.accent1}>
                <IoColorPaletteOutline size={24} />
              </FeatureIcon>
              <FeatureTitle>Customisable Themes</FeatureTitle>
              <FeatureDescription>
                Create and save your own visualisation presets with our intuitive editor.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard isDark={isDarkMode}>
              <FeatureIcon color={themes.light.accent2}>
                <FaRegShareSquare size={24} />
              </FeatureIcon>
              <FeatureTitle>Share Your Creations</FeatureTitle>
              <FeatureDescription>
                Export and share your visualisations with friends or the Visualify community.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </SectionContainer>

        <SectionContainer id="how">
          <SectionTitle>
            <IconCode size={24} /> How It Works
          </SectionTitle>
          <SectionContent>
            <p>Using Visualify is simple and intuitive. Connect your Spotify account, select your favourite music,
              and watch as our algorithms transform sound into stunning visual art in real-time.</p>
          </SectionContent>

          <StepsContainer>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepText>Connect your Spotify account</StepText>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepText>Choose a track or playlist</StepText>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepText>Select a visualisation style or create your own</StepText>
            </StepCard>
            <StepCard>
              <StepNumber>4</StepNumber>
              <StepText>Watch your music transform into visual art</StepText>
            </StepCard>
          </StepsContainer>
        </SectionContainer>

        <SectionContainer id="testimonials">
          <SectionTitle>
            <IconHeadphones size={24} /> What Our Beta Users Say
          </SectionTitle>
          <TestimonialsContainer>
            <TestimonialCard isDark={isDarkMode}>
              <Quote>Visualify completely changed how I experience my favourite tracks. The visualisations are hypnotic!</Quote>
              <Author>Alex K.</Author>
            </TestimonialCard>
            <TestimonialCard isDark={isDarkMode}>
              <Quote>As a DJ, I use Visualify for my live shows. The audience loves the visual element it adds to my sets.</Quote>
              <Author>DJ Pulse</Author>
            </TestimonialCard>
            <TestimonialCard isDark={isDarkMode}>
              <Quote>The customisation options are endless. I've created unique visuals for each of my playlists.</Quote>
              <Author>Maya T.</Author>
            </TestimonialCard>
          </TestimonialsContainer>
        </SectionContainer>

        <SectionContainer id="team">
          <SectionTitle>
            <IconGlobe size={24} /> Meet Our Team
          </SectionTitle>
          <SectionContent>
            <p>The passionate creators behind Visualify. We're a team of developers, designers, and music enthusiasts
              dedicated to creating the best music visualisation experience possible.</p>
          </SectionContent>
          <TeamImage src={teamImg} alt="Visualify team" isDark={isDarkMode} />
        </SectionContainer>

        <NewsletterSection isDark={isDarkMode}>
          <NewsletterTitle>Stay Updated</NewsletterTitle>
          <NewsletterDescription>
            Be the first to know when Visualify launches. Sign up for our newsletter to receive updates on our progress
            and get early access to the beta.
          </NewsletterDescription>
          <NewsletterForm>
            <EmailInput
              type="email"
              placeholder="Your email address"
              isDark={isDarkMode}
            />
            <SubmitButton>Get Early Access</SubmitButton>
          </NewsletterForm>
        </NewsletterSection>

        <CTASection>
          <CTATitle>Ready to Experience Music in a New Way?</CTATitle>
          <CTAText>
            Visualify is coming soon. Sign up for early access and be among the first to transform your
            favourite tracks into stunning visual landscapes.
          </CTAText>
          <CTAButton href="#subscribe">
            Keep Me Posted <IconChevronDown size={18} />
          </CTAButton>
        </CTASection>

        <Footer>
          <FooterText>
            © 2025 Visualify - Transforming sound into stunning visuals
          </FooterText>
          <SocialLinks>
            {/* Social media links would go here */}
          </SocialLinks>
        </Footer>
      </ContentContainer>
      <FullscreenPageStyles />
    </PageContainer>
  </ThemeProvider>
);
};

export default LandingPage;