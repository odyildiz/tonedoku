
import React from 'react';
import type { ScaleDefinition } from '../../types/scales';
import ScaleCard from './ScaleCard';

interface ScaleCategoryProps {
    title: string;
    scales: ScaleDefinition[];
    onScaleSelect: (scaleId: string) => void;
}

const ScaleCategory: React.FC<ScaleCategoryProps> = ({ title, scales, onScaleSelect }) => {
    return (
        <section className="w-full space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-[var(--color-text)] pl-2 sm:pl-3 border-l-4 border-[var(--color-primary)]">
                {title}
            </h2>

            {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 4 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {scales.map((scale) => (
                    <ScaleCard
                        key={scale.id}
                        scale={scale}
                        onClick={onScaleSelect}
                    />
                ))}
            </div>
        </section>
    );
};

export default ScaleCategory;
