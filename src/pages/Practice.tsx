import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Practice: React.FC = () => {
    const { scaleId, levelId } = useParams();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4 capitalize">{scaleId?.replace('-', ' ')}</h1>
            <h2 className="text-xl mb-8">Level {levelId}</h2>

            <div className="mb-8 p-8 border rounded bg-gray-800">
                {/* Game board placeholder */}
                <p>Game Board Placeholder</p>
            </div>

            <Link to={`/scale/${scaleId}`} className="text-blue-400 hover:underline">
                Back to Levels
            </Link>
        </div>
    );
};

export default Practice;
