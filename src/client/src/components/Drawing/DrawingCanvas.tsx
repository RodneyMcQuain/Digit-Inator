import React, { useEffect, useRef, MutableRefObject } from 'react';
import { getViewportWidth, getViewportHeight } from '../../services/dimensions';
import styles from '../../styles/components/DrawingCanvas.module.scss';

interface DrawingCanvasProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    strokeColor: string;
}

interface Point {
    x: number;
    y: number;
}

const BRUSH_SIZE_PX = 20;
const CANVAS_SIZE_PX = 300;

const DrawingCanvas = ({ canvasRef, strokeColor }: DrawingCanvasProps) => {
    useDrawingCanvas(canvasRef, strokeColor);

    return <canvas className={styles['drawing-canvas']} ref={canvasRef} />;
};

const useDrawingCanvas = (canvasRef: MutableRefObject<HTMLCanvasElement>, strokeColor: string) => {
    const previousX = useRef<number>(0);
    const previousY = useRef<number>(0);
    const isDrawing = useRef<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const setDimensionsLocal = () => setDimensions(canvas);
        setDimensionsLocal();
        const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d') as any;
        const start = (): void => { isDrawing.current = true; };
        const stop = (): void => { isDrawing.current = false; };
        const mouseMove = (e: MouseEvent) => {
            const points = {
                x: e.pageX,
                y: e.pageY,
            };
            draw(canvas, ctx, isDrawing.current, points, previousX, previousY, strokeColor);
        };
        const touchMove = (e: TouchEvent) => {
            const touchData = e.touches[0];
            const points = {
                x: touchData.pageX,
                y: touchData.pageY,
            };
            draw(canvas, ctx, isDrawing.current, points, previousX, previousY, strokeColor);
        };
        const touchStart = (e: TouchEvent) => {
            start();
            const touchData = e.touches[0];
            previousX.current = touchData.pageX - canvas.offsetLeft;
            previousY.current = touchData.pageY - canvas.offsetTop;
        };

        window.addEventListener('resize', setDimensionsLocal);

        canvas.addEventListener('mousedown', start, false);
        canvas.addEventListener('touchstart', touchStart, false);

        canvas.addEventListener('mouseup', stop, false);
        canvas.addEventListener('touchend', stop, false);

        canvas.addEventListener('mouseleave', stop, false);

        canvas.addEventListener('mousemove', mouseMove, false);
        canvas.addEventListener('touchmove', touchMove, false);

        return () => {
            window.addEventListener('resize', setDimensionsLocal);

            canvas.removeEventListener('mousedown', start);
            canvas.removeEventListener('touchstart', start);

            canvas.removeEventListener('mouseup', stop);
            canvas.removeEventListener('touchend', stop);

            canvas.removeEventListener('mouseleave', stop);

            canvas.removeEventListener('mousemove', mouseMove);
            canvas.removeEventListener('touchmove', touchMove);
        };
    }, [canvasRef, strokeColor]);

    return canvasRef;
};

const setDimensions = (canvas: HTMLCanvasElement) => {
    const viewportWidth = getViewportWidth();
    const viewportHeight = getViewportHeight();

    const HORIZONTAL_PADDING = 10;
    const newWidth = Math.min(viewportWidth - (HORIZONTAL_PADDING * 2), CANVAS_SIZE_PX);
    setCanvasPropertyIfChanged('width', newWidth, canvas);

    const newHeight = Math.min(viewportHeight * 0.75, CANVAS_SIZE_PX);
    setCanvasPropertyIfChanged('height', newHeight, canvas);
}

// This check is needed to prevent the canvas from being cleared when it's not necessary
type CanvasProperty = 'width' | 'height';
const setCanvasPropertyIfChanged = (property: CanvasProperty, newValue: number, canvas: HTMLCanvasElement): void => {
    if (newValue !== canvas[property])
        canvas[property] = newValue;
};

const draw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    isDrawing: boolean,
    cursorLocation: Point,
    previousX: MutableRefObject<number>,
    previousY: MutableRefObject<number>,
    strokeColor: string
) => {
    const currentX = cursorLocation.x - canvas.offsetLeft;
    const currentY = cursorLocation.y - canvas.offsetTop;

    if (isDrawing)
        drawline(ctx, currentX, currentY, previousX.current, previousY.current, strokeColor);

    previousX.current = currentX;
    previousY.current = currentY;
};

const drawline = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeColor: string
) => {
    ctx.strokeStyle = strokeColor;
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH_SIZE_PX;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
};

export default DrawingCanvas;