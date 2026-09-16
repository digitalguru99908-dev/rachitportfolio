import { Grid } from '@react-three/drei'

export default function GridFloor() {
  return (
    <Grid
      position={[0, -2.4, 0]}
      args={[200, 200]}
      cellSize={0.6}
      cellThickness={0.6}
      cellColor="#1f2836"
      sectionSize={3}
      sectionThickness={1}
      sectionColor="#2e3a4a"
      fadeDistance={70}
      fadeStrength={2}
      infiniteGrid
    />
  )
}