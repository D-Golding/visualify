import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SiBytedance } from "react-icons/si";
import { FaUserCircle, FaRegShareSquare } from 'react-icons/fa';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { IoColorPaletteOutline, IoMusicalNotes } from "react-icons/io5";
import { TbBrandSpotify } from "react-icons/tb";

// ================ THEMES ================
const lightTheme = {
  primary: '#6200EA',  // Deep purple
  secondary: '#00E676', // Vibrant green
  background: '#FFFFFF',
  cardBg: '#F5F5F5',
  text: '#333333',
  textLight: '#666666',
  navBg: 'rgba(255, 255, 255, 0.9)',
  buttonGradient: 'linear-gradient(90deg, #6200EA 0%, #00E676 100%)',
  shadowLight: '0 4px 14px rgba(0, 0, 0, 0.1)',
  shadowMedium: '0 6px 20px rgba(0, 0, 0, 0.15)',
};

const darkTheme = {
  primary: '#BB86FC', // Light purple
  secondary: '#00E676', // Vibrant green
  background: '#121212',
  cardBg: '#1E1E1E',
  text: '#FFFFFF',
  textLight: '#BBBBBB',
  navBg: 'rgba(18, 18, 18, 0.95)',
  buttonGradient: 'linear-gradient(90deg, #BB86FC 0%, #00E676 100%)',
  shadowLight: '0 4px 14px rgba(0, 0, 0, 0.4)',
  shadowMedium: '0 6px 20px rgba(0, 0, 0, 0.5)',
};

// ================ TRANSLATIONS ================
const translations = {
  en: {
    hero: {
      title: "Transform Your Music into Visual Art",
      subtitle: "Experience your favourite Spotify tracks like never before with stunning real-time visualisations",
      cta: "Sign up for updates",
      comingSoon: "Coming Soon"
    },
    features: {
      title: "Features",
      feature1: {
        title: "Real-time Visualisation",
        desc: "Watch your music come to life with responsive animations that react to beat, frequency, and more",
      },
      feature2: {
        title: "Spotify Integration",
        desc: "Seamlessly connect with Spotify to visualise any track in your library",
      },
      feature3: {
        title: "Customisable Themes",
        desc: "Create and save your own visualisation presets with our intuitive editor",
      },
      feature4: {
        title: "Share Your Creations",
        desc: "Export and share your visualisations with friends or the Visualify community",
      },
    },
    how: {
      title: "How It Works",
      step1: "Connect your Spotify account",
      step2: "Choose a track or playlist",
      step3: "Select a visualisation style or create your own",
      step4: "Watch your music transform into visual art",
    },
    showcase: {
      title: "Visualisation Showcase",
      desc: "A glimpse of what's possible with Visualify",
    },
    testimonials: {
      title: "What Our Users Say",
      testimonial1: {
        quote: "Visualify completely changed how I experience my favourite tracks. The visualisations are hypnotic!",
        author: "Alex K.",
      },
      testimonial2: {
        quote: "As a DJ, I use Visualify for my live shows. The audience loves the visual element it adds to my sets.",
        author: "DJ Pulse",
      },
      testimonial3: {
        quote: "The customisation options are endless. I've created unique visuals for each of my playlists.",
        author: "Maya T.",
      },
    },
    team: {
      title: "Meet Our Team",
      desc: "The passionate creators behind Visualify",
    },
    cta: {
      title: "Ready to Experience Music in a New Way?",
      subtitle: "Sign up to be the first to know when Visualify launches",
      button: "Keep me updated",
      email: "Your email address",
    },
    footer: {
      links: {
        about: "About",
        features: "Features",
        pricing: "Pricing",
        contact: "Contact",
        privacy: "Privacy",
        terms: "Terms",
      },
      copyright: "© 2025 Visualify. All rights reserved.",
    },
  },
  de: {
    hero: {
      title: "Verwandle deine Musik in visuelle Kunst",
      subtitle: "Erlebe deine Lieblings-Spotify-Tracks wie nie zuvor mit atemberaubenden Echtzeit-Visualisierungen",
      cta: "Für Updates anmelden",
      comingSoon: "Demnächst verfügbar"
    },
    features: {
      title: "Funktionen",
      feature1: {
        title: "Echtzeit-Visualisierung",
        desc: "Sieh zu, wie deine Musik durch reaktive Animationen lebendig wird, die auf Beat, Frequenz und mehr reagieren",
      },
      feature2: {
        title: "Spotify-Integration",
        desc: "Verbinde dich nahtlos mit Spotify, um jeden Track in deiner Bibliothek zu visualisieren",
      },
      feature3: {
        title: "Anpassbare Themes",
        desc: "Erstelle und speichere deine eigenen Visualisierungsvoreinstellungen mit unserem intuitiven Editor",
      },
      feature4: {
        title: "Teile deine Kreationen",
        desc: "Exportiere und teile deine Visualisierungen mit Freunden oder der Visualify-Community",
      },
    },
    how: {
      title: "Wie es funktioniert",
      step1: "Verbinde dein Spotify-Konto",
      step2: "Wähle einen Track oder eine Playlist",
      step3: "Wähle einen Visualisierungsstil oder erstelle deinen eigenen",
      step4: "Sieh zu, wie sich deine Musik in visuelle Kunst verwandelt",
    },
    showcase: {
      title: "Visualisierungs-Showcase",
      desc: "Ein Einblick in die Möglichkeiten mit Visualify",
    },
    testimonials: {
      title: "Was unsere Nutzer sagen",
      testimonial1: {
        quote: "Visualify hat völlig verändert, wie ich meine Lieblingstracks erlebe. Die Visualisierungen sind hypnotisch!",
        author: "Alex K.",
      },
      testimonial2: {
        quote: "Als DJ nutze ich Visualify für meine Live-Shows. Das Publikum liebt das visuelle Element, das es meinen Sets hinzufügt.",
        author: "DJ Pulse",
      },
      testimonial3: {
        quote: "Die Anpassungsmöglichkeiten sind endlos. Ich habe einzigartige Visualisierungen für jede meiner Playlists erstellt.",
        author: "Maya T.",
      },
    },
    team: {
      title: "Unser Team",
      desc: "Die leidenschaftlichen Köpfe hinter Visualify",
    },
    cta: {
      title: "Bereit, Musik auf eine neue Art zu erleben?",
      subtitle: "Melde dich an, um als Erster zu erfahren, wenn Visualify startet",
      button: "Halte mich auf dem Laufenden",
      email: "Deine E-Mail-Adresse",
    },
    footer: {
      links: {
        about: "Über uns",
        features: "Funktionen",
        pricing: "Preise",
        contact: "Kontakt",
        privacy: "Datenschutz",
        terms: "AGB",
      },
      copyright: "© 2025 Visualify. Alle Rechte vorbehalten.",
    },
  }
};

// ================ GLOBAL STYLES ================
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

// ================ STYLED COMPONENTS ================
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.navBg};
  padding: 1rem 0;
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: ${props => props.theme.shadowLight};
  transition: all 0.3s ease;
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  
  svg {
    font-size: 2.2rem;
    margin-right: 0.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const Button = styled.button`
  background: ${props => props.theme.buttonGradient};
  color: white;
  border: none;
  padding: ${props => props.small ? '0.5rem 1rem' : '0.8rem 1.5rem'};
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1.2rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadowMedium};
  }
`;

const SpotifyButton = styled(Button)`
  background: #1DB954;
`;

const HeroSection = styled.section`
  padding: 8rem 0 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const HeroVideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${props => props.theme.background} 0%,
      rgba(0, 0, 0, 0.3) 40%,
      rgba(0, 0, 0, 0.3) 60%,
      ${props => props.theme.background} 100%
    );
  }
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  z-index: 1;
  margin-top: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: ${props => props.theme.buttonGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textLight};
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Section = styled.section`
  padding: 5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${props => props.theme.buttonGradient};
    border-radius: 2px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadowLight};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadowMedium};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.primary};
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.textLight};
  font-size: 0.9rem;
`;

const HowItWorksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 3rem;
`;

const StepCard = styled.div`
  flex: 1;
  min-width: 220px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 2.5rem;
    right: -10%;
    width: 20%;
    height: 3px;
    background: ${props => props.theme.secondary};
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const StepNumber = styled.div`
  background: ${props => props.theme.buttonGradient};
  color: white;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const StepText = styled.p`
  font-weight: 500;
`;

const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const VideoCard = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadowLight};
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ComingSoonBadge = styled.div`
  background: ${props => props.theme.secondary};
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  margin-bottom: 2rem;
  display: inline-block;
`;

const TestimonialsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

const TestimonialCard = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadowLight};
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  position: relative;
  
  &:before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 4rem;
    color: ${props => props.theme.primary};
    opacity: 0.2;
  }
`;

const Quote = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const Author = styled.p`
  font-weight: 600;
  color: ${props => props.theme.primary};
`;

const TeamSection = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const TeamImage = styled.img`
  max-width: 100%;
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadowMedium};
  margin-top: 2rem;
`;

const CTASection = styled.section`
  background: ${props => props.theme.cardBg};
  padding: 5rem 0;
  text-align: center;
`;

const EmailInput = styled.input`
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: none;
  margin-right: 0.5rem;
  width: 300px;
  max-width: 100%;
  box-shadow: ${props => props.theme.shadowLight};
  
  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.shadowMedium};
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    width: 100%;
  }
`;

const Footer = styled.footer`
  background: ${props => props.theme.cardBg};
  padding: 3rem 0;
  margin-top: 5rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LinkTitle = styled.h4`
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
`;

const FooterLink = styled.a`
  color: ${props => props.theme.textLight};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.textLight}20;
  color: ${props => props.theme.textLight};
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const LangToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

// ================ MAIN COMPONENT ================
const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  // Check system preference for dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'de' : 'en');
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />

      {/* Navbar */}
      <Navbar>
        <NavContainer>
          <Logo>
            <SiBytedance />
            Visualify
          </Logo>
          <NavLinks>
            <NavLink href="#features">{lang === 'en' ? 'Features' : 'Funktionen'}</NavLink>
            <NavLink href="#how">{lang === 'en' ? 'How It Works' : 'Funktionsweise'}</NavLink>
            <NavLink href="#showcase">{lang === 'en' ? 'Showcase' : 'Beispiele'}</NavLink>
            <ThemeToggle onClick={toggleTheme}>
              {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </ThemeToggle>
            <LangToggle onClick={toggleLang}>
              {lang === 'en' ? 'DE' : 'EN'}
            </LangToggle>
            <Button small>
              <FaUserCircle />
              {lang === 'en' ? 'Sign up' : 'Registrieren'}
            </Button>
          </NavLinks>
        </NavContainer>
      </Navbar>

      {/* Hero Section */}
      <HeroSection>
        <HeroVideoBackground>
          <video autoPlay loop muted>
            <source src="/vid1.mp4" type="video/mp4" />
          </video>
        </HeroVideoBackground>
        <HeroContent>
          <ComingSoonBadge>{t.hero.comingSoon}</ComingSoonBadge>
          <HeroTitle>{t.hero.title}</HeroTitle>
          <HeroSubtitle>{t.hero.subtitle}</HeroSubtitle>
          <ButtonGroup>
            <Button>{t.hero.cta}</Button>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <Section id="features">
        <Container>
          <SectionTitle>{t.features.title}</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>
                <IoMusicalNotes />
              </FeatureIcon>
              <FeatureTitle>{t.features.feature1.title}</FeatureTitle>
              <FeatureDescription>{t.features.feature1.desc}</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <TbBrandSpotify />
              </FeatureIcon>
              <FeatureTitle>{t.features.feature2.title}</FeatureTitle>
              <FeatureDescription>{t.features.feature2.desc}</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <IoColorPaletteOutline />
              </FeatureIcon>
              <FeatureTitle>{t.features.feature3.title}</FeatureTitle>
              <FeatureDescription>{t.features.feature3.desc}</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <FaRegShareSquare />
              </FeatureIcon>
              <FeatureTitle>{t.features.feature4.title}</FeatureTitle>
              <FeatureDescription>{t.features.feature4.desc}</FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </Container>
      </Section>

      {/* How It Works Section */}
      <Section id="how">
        <Container>
          <SectionTitle>{t.how.title}</SectionTitle>
          <HowItWorksContainer>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepText>{t.how.step1}</StepText>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepText>{t.how.step2}</StepText>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepText>{t.how.step3}</StepText>
            </StepCard>
            <StepCard>
              <StepNumber>4</StepNumber>
              <StepText>{t.how.step4}</StepText>
            </StepCard>
          </HowItWorksContainer>
        </Container>
      </Section>

      {/* Showcase Section */}
      <Section id="showcase">
        <Container>
          <SectionTitle>{t.showcase.title}</SectionTitle>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>{t.showcase.desc}</p>
          <ShowcaseGrid>
            <VideoCard>
              <video controls>
                <source src="/vid2.mp4" type="video/mp4" />
              </video>
            </VideoCard>
            <VideoCard>
              <video controls>
                <source src="/vid3.mp4" type="video/mp4" />
              </video>
            </VideoCard>
            <VideoCard>
              <video controls>
                <source src="/vid4.mp4" type="video/mp4" />
              </video>
            </VideoCard>
          </ShowcaseGrid>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <Container>
          <SectionTitle>{t.testimonials.title}</SectionTitle>
          <TestimonialsContainer>
            <TestimonialCard>
              <Quote>{t.testimonials.testimonial1.quote}</Quote>
              <Author>{t.testimonials.testimonial1.author}</Author>
            </TestimonialCard>
            <TestimonialCard>
              <Quote>{t.testimonials.testimonial2.quote}</Quote>
              <Author>{t.testimonials.testimonial2.author}</Author>
            </TestimonialCard>
            <TestimonialCard>
              <Quote>{t.testimonials.testimonial3.quote}</Quote>
              <Author>{t.testimonials.testimonial3.author}</Author>
            </TestimonialCard>
          </TestimonialsContainer>
        </Container>
      </Section>

      {/* Team Section */}
      <Section>
        <Container>
          <SectionTitle>{t.team.title}</SectionTitle>
          <p style={{ textAlign: 'center' }}>{t.team.desc}</p>
          <TeamSection>
            <TeamImage src="/team.jpeg" alt="Visualify team" />
          </TeamSection>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection>
        <Container>
          <HeroTitle>{t.cta.title}</HeroTitle>
          <HeroSubtitle>{t.cta.subtitle}</HeroSubtitle>
          <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <EmailInput type="email" placeholder={t.cta.email} />
            <Button>{t.cta.button}</Button>
          </div>
        </Container>
      </CTASection>

      {/* Footer */}
      <Footer>
        <Container>
          <FooterContent>
            <FooterLogo>
              <Logo>
                <SiBytedance />
                Visualify
              </Logo>
              <p>Transforming sound into stunning visuals</p>
            </FooterLogo>
            <FooterLinks>
              <LinkGroup>
                <LinkTitle>{lang === 'en' ? 'Company' : 'Unternehmen'}</LinkTitle>
                <FooterLink href="#">{t.footer.links.about}</FooterLink>
                <FooterLink href="#">{t.footer.links.features}</FooterLink>
                <FooterLink href="#">{t.footer.links.pricing}</FooterLink>
              </LinkGroup>
              <LinkGroup>
                <LinkTitle>{lang === 'en' ? 'Support' : 'Support'}</LinkTitle>
                <FooterLink href="#">FAQ</FooterLink>
                <FooterLink href="#">{t.footer.links.contact}</FooterLink>
                <FooterLink href="#">{lang === 'en' ? 'Help Center' : 'Hilfezentrum'}</FooterLink>
              </LinkGroup>
              <LinkGroup>
                <LinkTitle>{lang === 'en' ? 'Legal' : 'Rechtliches'}</LinkTitle>
                <FooterLink href="#">{t.footer.links.privacy}</FooterLink>
                <FooterLink href="#">{t.footer.links.terms}</FooterLink>
                <FooterLink href="#">{lang === 'en' ? 'Cookies' : 'Cookies'}</FooterLink>
              </LinkGroup>
            </FooterLinks>
          </FooterContent>
          <Copyright>
            {t.footer.copyright}
          </Copyright>
        </Container>
      </Footer>
    </ThemeProvider>
  );
};

export default LandingPage;