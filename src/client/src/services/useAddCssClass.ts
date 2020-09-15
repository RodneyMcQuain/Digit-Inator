import { useState } from "react";

type MightBeCss = [string, (isClass: boolean) => void];

export const useAddCssClass = (className: string): MightBeCss => {
    const [css, setCss] = useState<string>("");

    const shouldAddClass = (isClass: boolean): void => {
        const mightBeClass = isClass ? className : "";
        setCss(mightBeClass);
    };

    return [css, shouldAddClass]; 
}