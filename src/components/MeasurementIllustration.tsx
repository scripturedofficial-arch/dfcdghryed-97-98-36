import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface MeasurementIllustrationProps {
  type: 'chest' | 'length' | 'shoulder';
  className?: string;
  clickToEnlarge?: boolean;
}

const MeasurementIllustration = ({ type, className = "", clickToEnlarge = true }: MeasurementIllustrationProps) => {
  const getSvgContent = () => {
    const baseProps = {
      width: "200",
      height: "280",
      viewBox: "0 0 200 280",
      className: "w-full max-w-[200px] mx-auto",
      role: "img"
    };

    const silhouetteProps = {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      className: "text-muted-foreground"
    };

    const measurementLineProps = {
      stroke: "hsl(var(--primary))",
      strokeWidth: "2",
      markerEnd: "url(#arrowhead)"
    };

    const labelProps = {
      fill: "hsl(var(--primary))",
      fontSize: "12",
      fontWeight: "600",
      textAnchor: "middle"
    };

    return (
      <svg {...baseProps} aria-label={`How to measure ${type}`}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="hsl(var(--primary))"
            />
          </marker>
        </defs>
        
        {/* Body silhouette */}
        <path
          {...silhouetteProps}
          d="M100 40 
             C95 35, 85 35, 80 40
             L80 60
             C75 65, 70 70, 70 80
             L70 140
             C70 150, 75 155, 80 160
             L80 240
             C80 245, 85 250, 100 250
             C115 250, 120 245, 120 240
             L120 160
             C125 155, 130 150, 130 140
             L130 80
             C130 70, 125 65, 120 60
             L120 40
             C115 35, 105 35, 100 40 Z"
        />
        
        {/* Arms */}
        <path
          {...silhouetteProps}
          d="M70 80 L50 85 L45 100 L50 115 L65 110"
        />
        <path
          {...silhouetteProps}
          d="M130 80 L150 85 L155 100 L150 115 L135 110"
        />

        {/* Measurement lines based on type */}
        {type === 'chest' && (
          <>
            <line x1="45" y1="95" x2="155" y2="95" {...measurementLineProps} />
            <line x1="45" y1="85" x2="45" y2="105" stroke="hsl(var(--primary))" strokeWidth="1" />
            <line x1="155" y1="85" x2="155" y2="105" stroke="hsl(var(--primary))" strokeWidth="1" />
            <text x="100" y="85" {...labelProps}>Chest</text>
          </>
        )}
        
        {type === 'length' && (
          <>
            <line x1="30" y1="40" x2="30" y2="250" {...measurementLineProps} />
            <line x1="25" y1="40" x2="35" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" />
            <line x1="25" y1="250" x2="35" y2="250" stroke="hsl(var(--primary))" strokeWidth="1" />
            <text x="30" y="30" {...labelProps}>Length</text>
          </>
        )}
        
        {type === 'shoulder' && (
          <>
            <line x1="80" y1="50" x2="120" y2="50" {...measurementLineProps} />
            <line x1="80" y1="45" x2="80" y2="55" stroke="hsl(var(--primary))" strokeWidth="1" />
            <line x1="120" y1="45" x2="120" y2="55" stroke="hsl(var(--primary))" strokeWidth="1" />
            <text x="100" y="40" {...labelProps}>Shoulder</text>
          </>
        )}
      </svg>
    );
  };

  const svgContent = getSvgContent();

  if (clickToEnlarge) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}>
            {svgContent}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <div className="flex justify-center p-4">
            {getSvgContent()}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <div className={className}>{svgContent}</div>;
};

export default MeasurementIllustration;