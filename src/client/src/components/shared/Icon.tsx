import React from 'react';

interface IconProps {
    icon: JSX.Element;
    className?: string;
}

const Icon = ({ icon, className }: IconProps) => <span className={`icon ${className}`}>{icon}</span>

export default Icon;