import { useVideoTexture } from "@react-three/drei";

const  LuisVid= () => {
  const texture = useVideoTexture("/videos/luisvid.mp4", {
	muted: true,
	loop: true,
	autoplay: true,
	crossOrigin: "anonymous",
  });
  return (
	<mesh>
	  <planeGeometry args={[4, 2]} /> 
	  <meshBasicMaterial map={texture} toneMapped={false} />
	</mesh>
  );
};

export default LuisVid;