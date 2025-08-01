import { useVideoTexture } from "@react-three/drei";

const LuisVid = () => {
  const texture = useVideoTexture("/videos/luisvid.mp4", {
    muted: true,
    loop: true,
    autoplay: true,
    crossOrigin: "anonymous",
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[4, 2.25]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

export default LuisVid;
