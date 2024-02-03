interface Coordinates {
  x: number;
  y: number;
}

const position: Coordinates = { x: 100, y: 100 };
const radius: number = 20;

export default function imageClickingHandler(click: MouseEvent): void {
  const image = click.target as HTMLElement;
  const rect: DOMRect = image.getBoundingClientRect();

  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;

  const pageX = click.pageX;
  const pageY = click.pageY;

  const imageX = pageX - offsetX;
  const imageY = pageY - offsetY;

  console.log('Clicked on image at:', imageX, imageY);

  const distance: number = Math.sqrt(
    Math.pow(imageX - position.x, 2) + Math.pow(imageY - position.y, 2)
  );
  console.log('distance: ', distance);
  if (distance <= radius) {
    console.log('Click is within radius of position');
    // Perform further actions, such as tagging the object
  } else {
    console.log('Click is outside the radius of position');
    // Handle click outside the radius if needed
  }
}
