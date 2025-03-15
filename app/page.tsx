import Balatro from "@/components/balatrobg";
import Navbar from "@heroui/navbar";

export default function Home() {
  return (
      <div className="absolute top-0 left-0 w-full h-full z-0 filter blur-lg opacity-90">
        <Balatro
          isRotate={false}
          mouseInteraction={false}
          pixelFilter={2000}
          color1="#3BB5DE"
        />
      </div>
  );
}
