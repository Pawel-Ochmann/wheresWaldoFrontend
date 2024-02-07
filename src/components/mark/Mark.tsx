interface Position {
  x: number;
  y: number;
}

export default function Mark({ position }: { position: Position }) {
  return (
    <div
      className='mark'
      style={{
        width: '6%',
        height: '6%',
        border: '5px solid green',
        borderRadius: '50rem',
        position: 'absolute',
        top: `${position.y - 3}%`,
        left: `${position.x - 3}%`,
      }}
    ></div>
  );
}
