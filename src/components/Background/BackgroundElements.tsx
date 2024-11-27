import React from 'react';

export const StarField: React.FC = React.memo(() => (
    <div className="star-field">
        {[...Array(7)].map((_, i) => (
            <div key={i} className="star" />
        ))}
    </div>
));

export const CloudField: React.FC = React.memo(() => (
    <div className="cloud-field">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="cloud" />
        ))}
    </div>
));