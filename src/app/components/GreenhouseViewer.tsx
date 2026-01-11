import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Button } from "./ui/button";

export function GreenhouseViewer({ onBack }: { onBack?: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [modelUrl, setModelUrl] = useState<string>("/greenhouse.glb");

  useEffect(() => {
    let mounted = true;
    fetch("/greenhouse.glb", { method: "HEAD" })
      .then((res) => {
        if (!res.ok && mounted) setModelUrl("/alu.glb");
      })
      .catch(() => {
        if (mounted) setModelUrl("/alu.glb");
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // @ts-ignore
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemi.position.set(0, 20, 0);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 10, 5);
    scene.add(dir);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;

    const loader = new GLTFLoader();
    const placeModel = (root: THREE.Object3D) => {
      scene.add(root);
      const box = new THREE.Box3().setFromObject(root);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      root.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const target = 8;
      const scale = maxDim > 0 ? target / maxDim : 1;
      root.scale.setScalar(scale);
      const sphere = new THREE.Sphere();
      box.getBoundingSphere(sphere);
      controls.target.set(0, 0, 0);
      controls.update();
      const fov = (camera.fov * Math.PI) / 180;
      const dist = sphere.radius / Math.sin(fov / 2);
      camera.position.set(0, sphere.radius * 0.5, dist * 1.2);
      camera.near = Math.max(0.1, dist / 10);
      camera.far = dist * 10;
      camera.updateProjectionMatrix();
      controls.minDistance = sphere.radius * 0.2;
      controls.maxDistance = dist * 4;
    };

    loader.load(
      modelUrl,
      (gltf) => {
        placeModel(gltf.scene);
      },
      undefined,
      () => {
        loader.load("/alu.glb", (fallback) => {
          placeModel(fallback.scene);
        });
      }
    );

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    controlsRef.current = controls;

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return (
    <div className="w-full h-full relative" onClick={() => setModelUrl("/alu.glb")}> 
      {onBack ? (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          className="absolute top-4 left-4 z-10"
        >
          Back to Dashboard
        </Button>
      ) : null}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
