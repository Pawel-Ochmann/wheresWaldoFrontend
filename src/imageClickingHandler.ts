interface Coordinates {
  x: number;
  y: number;
}
const radius: number = 10;

function calculateRelativePosition(
  imageX: number,
  imageY: number,
  imageWidth: number,
  imageHeight: number
): Coordinates {
  const relativeX = (imageX / imageWidth) * 100;
  const relativeY = (imageY / imageHeight) * 100;
  return { x: relativeX, y: relativeY };
}

type ClickResult = boolean | Coordinates;

export default function imageClickingHandler(
  click: React.MouseEvent<HTMLImageElement, MouseEvent>,
  coordinates: Coordinates
): ClickResult {
  interface Image {
    width: number;
    height: number;
    getBoundingClientRect(): DOMRect;
  }

  const image = click.target as unknown as Image;
  const rect: DOMRect = image.getBoundingClientRect();

  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;

  const pageX = click.pageX;
  const pageY = click.pageY;

  const imageX = pageX - offsetX;
  const imageY = pageY - offsetY;

  const imageWidth = image.width; // Get actual width of the image
  const imageHeight = image.height; // Get actual height of the image

  // Calculate relative position
  const relativePosition = calculateRelativePosition(
    imageX,
    imageY,
    imageWidth,
    imageHeight
  );

  const distance: number = Math.sqrt(
    Math.pow(relativePosition.x - coordinates.x, 2) +
      Math.pow(relativePosition.y - coordinates.y, 2)
  );

  if (distance <= radius) {
    return coordinates;
  } else {
    return false;
  }
}
