"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AudioWaveProps {
    className?: string;
    barCount?: number;
    barWidth?: number; 
    barGap?: number; 
};

export const AudioWave: React.FC<AudioWaveProps> = ({
    className = "",
    barCount = 16,
    barWidth = 16,
    barGap = 6,
}) => {
    const isMobile = useIsMobile();
    if (isMobile) {
        barCount = 10;
    }

    const center = (barCount - 1) / 2;
    const bars = Array.from({ length: barCount }).map((_, i) => {
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
            className={`pointer-events-none absolute bottom-9 right-10 z-[-50]  lg:flex items-end ${className}`}
            style={{ gap: `${barGap}px` }}
        >
            {bars}
        </div>
    );
};

export default AudioWave;
