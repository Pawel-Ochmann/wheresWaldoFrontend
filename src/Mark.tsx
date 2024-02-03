export default function App({ position }) {
  return (
    <div
      style={{width:'100px',
      height:'100px'
    }}
      onClick={() => {
        console.log(position);
      }}
    ></div>
  );
}
