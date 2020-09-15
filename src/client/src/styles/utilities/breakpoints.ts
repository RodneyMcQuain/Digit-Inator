import { SM_BREAKPOINT, MD_BREAKPOINT, LG_BREAKPOINT, XL_BREAKPOINT } from './breakpoints.scss';

const convertToPixelValue = (string: string): number => Number(string.replace('rem', ''));
export const SM_BREAKPOINT_PX = convertToPixelValue(SM_BREAKPOINT);
export const MD_BREAKPOINT_PX = convertToPixelValue(MD_BREAKPOINT);
export const LG_BREAKPOINT_PX = convertToPixelValue(LG_BREAKPOINT);
export const XL_BREAKPOINT_PX = convertToPixelValue(XL_BREAKPOINT);