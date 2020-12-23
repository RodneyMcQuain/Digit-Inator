import { useState, useEffect } from 'react';

export const useTransitionIn = (transitionClass: string, baseClass: string = ""): string => {
    const [mightBeTransitionClass, setMightBeTransitionClass] = useState<string>(baseClass);
    useEffect(() => { setMightBeTransitionClass(baseClass ? `${baseClass} ${transitionClass}` : transitionClass); });
    return mightBeTransitionClass;
};