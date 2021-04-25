export const drawImage = path => {
    return getDrawingCanvas(canvas => {
        cy.fixture(path).then(dataUrl => {
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.onload = () => ctx.drawImage(image, 0, 0);
            image.src = `data:image/png;base64,${dataUrl}`;
        });
    });
}
const getDrawingCanvas = callback => cy.get('canvas').then(([c]) => callback(c));