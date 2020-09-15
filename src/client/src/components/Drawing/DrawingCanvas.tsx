import React, { useEffect, useRef, MutableRefObject } from 'react';
import { getViewportWidth, getViewportHeight } from '../../services/dimensions';
import styles from '../../styles/components/DrawingCanvas.module.scss';
import { LIGHT_WHITE } from '../../styles/utilities/colors.scss';

interface DrawingCanvasProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
}

interface Point {
    x: number;
    y: number;
}

const BRUSH_SIZE_PX = 2.5;
const DRAW_COLOR = LIGHT_WHITE;

const DrawingCanvas = ({ canvasRef }: DrawingCanvasProps) => {
    useDrawingCanvas(canvasRef);

    return <canvas className={styles['drawing-canvas']} ref={canvasRef} />;
};

const useDrawingCanvas = (canvasRef: MutableRefObject<HTMLCanvasElement>) => {
    const previousX = useRef<number>(0);
    const previousY = useRef<number>(0);
    const isDrawing = useRef<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = getViewportWidth() * 0.9;
        canvas.height = getViewportHeight() * 0.75;
        const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d') as any;
        const start = (): void => { isDrawing.current = true; };
        const stop = (): void => { isDrawing.current = false; };
        const mouseMove = (e: MouseEvent) => {
            const points = {
                x: e.pageX,
                y: e.pageY,
            };
            draw(canvas, ctx, isDrawing.current, points, previousX, previousY);
        };
        const touchMove = (e: TouchEvent) => {
            const touchData = e.touches[0];
            const points = {
                x: touchData.pageX,
                y: touchData.pageY,
            };
            draw(canvas, ctx, isDrawing.current, points, previousX, previousY);
        };
        const touchStart = (e: TouchEvent) => {
            start();
            const touchData = e.touches[0];
            previousX.current = touchData.pageX - canvas.offsetLeft;
            previousY.current = touchData.pageY - canvas.offsetTop;
        };

        canvasRef.current.addEventListener('mousedown', start, false);
        canvasRef.current.addEventListener('touchstart', touchStart, false);

        canvasRef.current.addEventListener('mouseup', stop, false);
        canvasRef.current.addEventListener('touchend', stop, false);

        canvasRef.current.addEventListener('mouseleave', stop, false);

        canvasRef.current.addEventListener('mousemove', mouseMove, false);
        canvasRef.current.addEventListener('touchmove', touchMove, false);

        return () => {
            canvasRef.current.removeEventListener('mousedown', start);
            canvasRef.current.removeEventListener('touchstart', start);

            canvasRef.current.removeEventListener('mouseup', stop);
            canvasRef.current.removeEventListener('touchend', stop);

            canvasRef.current.removeEventListener('mouseleave', stop);

            canvasRef.current.removeEventListener('mousemove', mouseMove);
            canvasRef.current.removeEventListener('touchmove', touchMove);
        };
    }, [canvasRef, canvasRef.current]);

    return canvasRef;
};

const draw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D, 
    isDrawing: boolean, 
    cursorLocation: Point,
    previousX: MutableRefObject<number>, 
    previousY: MutableRefObject<number>
) => {
    const currentX = cursorLocation.x - canvas.offsetLeft;
    const currentY = cursorLocation.y - canvas.offsetTop;
    
    if (isDrawing)
        drawline(ctx, currentX, currentY, previousX.current, previousY.current);

    previousX.current = currentX;
    previousY.current = currentY;
};

const drawline = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    ctx.strokeStyle = DRAW_COLOR;
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH_SIZE_PX;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
};

export default DrawingCanvas;