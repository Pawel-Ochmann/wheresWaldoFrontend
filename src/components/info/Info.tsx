export default function Info({ wasFound }: { wasFound: boolean }) {
  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        border: '5px solid green',
        position: 'absolute',
      }}
    >
      <p> {wasFound ? `You found a Waldo!` : `No, it is not Waldo!`} </p>
    </div>
  );
}
