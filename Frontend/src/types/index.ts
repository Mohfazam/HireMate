export interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }
  
  export interface HeroSectionProps {
    className?: string;
  }
  
  export interface VisualFXProps {
    className?: string;
  }
  
  export interface LandingLayoutProps {
    children?: React.ReactNode;
  }
  
  export interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  export interface StatCardProps {
    value: string;
    label: string;
    description: string;
  }
  
  export interface ImpactStatProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    description: string;
    trend?: 'up' | 'down';
  }