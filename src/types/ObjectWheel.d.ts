declare module '@/components/ObjectWheel' {
  export interface ObjectWheelProps {
    objects: string[];
    isSpinning: boolean;
    onSpinComplete: (object: string) => void;
  }
  
  const ObjectWheel: React.FC<ObjectWheelProps>;
  export default ObjectWheel;
} 