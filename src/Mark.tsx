interface Position {
  x: number;
  y: number;
}

export default function Mark({position}:{ position:Position }) {
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        border: '5px solid green',
        borderRadius:'50rem',
        position: 'absolute',
        top: `${position.y -3}%`,
        left: `${position.x -2}%`,
      }}
      onClick={() => {
        console.log(position);
      }}
    ></div>
  );
}
