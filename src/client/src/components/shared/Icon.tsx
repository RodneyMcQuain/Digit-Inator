import React from 'react';

interface IconProps {
    icon: JSX.Element;
}

const Icon = ({ icon }: IconProps) => <span className="icon">{icon}</span>

export default Icon;