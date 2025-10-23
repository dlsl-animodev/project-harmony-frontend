"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AudioWaveProps {
    className?: string;
    barCount?: number;
    barWidth?: number;
    barGap?: number;
}

export const AudioWave: React.FC<AudioWaveProps> = ({
    className = "",
    barWidth = 16,
    barGap = 6,
}) => {
    const isMobile = useIsMobile();

    // don't render until after mount so useIsTablet has stabilized (avoids initial flash)
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    if (!mounted)
        return (
            <span
                className={`audio-wave-bar bg-transparent`}
                style={{
                    width: `${barWidth}px`,
                }}
            />
        );

    const computedBarCount = isMobile ? 6 : 16;

    const center = (computedBarCount - 1) / 2;
    const bars = Array.from({ length: computedBarCount }).map((_, i) => {
        const offset = Math.abs(i - center);
        const delayMs = Math.round(offset * 80);
        return (
            <span
                key={i}
                className={`audio-wave-bar bg-gradient-to-b from-primary to-pink-500`}
                style={{
                    width: `${barWidth}px`,
                    marginLeft: i === 0 ? 0 : `${barGap}px`,
                    animationDelay: `${delayMs}ms`,
                }}
            />
        );
    });

    return (
        <div
            aria-hidden
            className={`pointer-events-none z-[-50]  lg:flex items-end ${className}`}
            style={{ gap: `${barGap}px` }}
        >
            {bars}
        </div>
    );
};

export default AudioWave;
