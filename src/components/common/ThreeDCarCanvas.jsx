import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeDCarCanvas = ({ className = '' }) => {
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060B18, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.8, 2.2, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0f2042, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0066ff, 4.0);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const underglowLight = new THREE.PointLight(0x00e5ff, 3.0, 8);
    underglowLight.position.set(0, 0.1, 0);
    scene.add(underglowLight);

    // Car Root Group
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    // Materials
    const bodyPaintMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0c2554,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const cabinGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111c38,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.7,
      transparent: true,
      opacity: 0.85,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
    });

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x11141a,
      roughness: 0.8,
    });

    const headlampGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    const taillampGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff2244,
    });

    // 1. Lower Body Chassis
    const lowerBodyGeom = new THREE.BoxGeometry(3.6, 0.55, 1.7, 4, 2, 2);
    // Bevel vertices slightly
    const pos = lowerBodyGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      // Front taper
      if (x > 1.2) {
        y *= 0.85;
        z *= 0.88;
      }
      // Rear taper
      if (x < -1.2) {
        z *= 0.92;
      }
      pos.setXYZ(i, x, y, z);
    }
    lowerBodyGeom.computeVertexNormals();

    const lowerBody = new THREE.Mesh(lowerBodyGeom, bodyPaintMaterial);
    lowerBody.position.y = 0.55;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // 2. Cabin / Greenhouse
    const cabinGeom = new THREE.BoxGeometry(1.85, 0.58, 1.38);
    const cabin = new THREE.Mesh(cabinGeom, cabinGlassMaterial);
    cabin.position.set(-0.15, 0.98, 0);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Cabin Roof Plate
    const roofGeom = new THREE.BoxGeometry(1.7, 0.06, 1.3);
    const roof = new THREE.Mesh(roofGeom, bodyPaintMaterial);
    roof.position.set(-0.15, 1.28, 0);
    carGroup.add(roof);

    // 3. Headlamps
    const lampGeom = new THREE.BoxGeometry(0.08, 0.12, 0.42);
    const lampL = new THREE.Mesh(lampGeom, headlampGlowMaterial);
    lampL.position.set(1.8, 0.62, 0.55);
    lampL.rotation.y = -0.2;
    carGroup.add(lampL);

    const lampR = new THREE.Mesh(lampGeom, headlampGlowMaterial);
    lampR.position.set(1.8, 0.62, -0.55);
    lampR.rotation.y = 0.2;
    carGroup.add(lampR);

    // Light beam glow
    const beamL = new THREE.PointLight(0x00e5ff, 1.2, 5);
    beamL.position.set(2.2, 0.6, 0.55);
    carGroup.add(beamL);

    const beamR = new THREE.PointLight(0x00e5ff, 1.2, 5);
    beamR.position.set(2.2, 0.6, -0.55);
    carGroup.add(beamR);

    // 4. Tail Lamps
    const tailLampL = new THREE.Mesh(lampGeom, taillampGlowMaterial);
    tailLampL.position.set(-1.8, 0.65, 0.5);
    carGroup.add(tailLampL);

    const tailLampR = new THREE.Mesh(lampGeom, taillampGlowMaterial);
    tailLampR.position.set(-1.8, 0.65, -0.5);
    carGroup.add(tailLampR);

    // 5. Wheels
    const wheels = [];
    const wheelGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 24);
    const rimGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.28, 6);

    const wheelPositions = [
      { x: 1.15, y: 0.36, z: 0.88 },
      { x: 1.15, y: 0.36, z: -0.88 },
      { x: -1.15, y: 0.36, z: 0.88 },
      { x: -1.15, y: 0.36, z: -0.88 },
    ];

    wheelPositions.forEach((p) => {
      const wheelHub = new THREE.Group();
      wheelHub.position.set(p.x, p.y, p.z);

      const tire = new THREE.Mesh(wheelGeom, tireMaterial);
      tire.rotation.x = Math.PI / 2;
      tire.castShadow = true;
      wheelHub.add(tire);

      const rim = new THREE.Mesh(rimGeom, chromeMaterial);
      rim.rotation.x = Math.PI / 2;
      wheelHub.add(rim);

      carGroup.add(wheelHub);
      wheels.push(wheelHub);
    });

    // 6. Ground Shadow / Platform Ring
    const groundGeom = new THREE.CylinderGeometry(3.2, 3.2, 0.05, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x09142b,
      metalness: 0.7,
      roughness: 0.3,
    });
    const platform = new THREE.Mesh(groundGeom, groundMat);
    platform.position.y = -0.02;
    platform.receiveShadow = true;
    scene.add(platform);

    // Glowing Neon Ring around platform
    const ringGeom = new THREE.RingGeometry(3.05, 3.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    // Floating particles around car
    const particleCount = 60;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = Math.random() * 3 + 0.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    camera.lookAt(0, 0.6, 0);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotationY = x * 0.45;
      targetRotationX = y * 0.2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation
      carGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

      // Base auto rotation + mouse interaction
      carGroup.rotation.y = elapsedTime * 0.22 + targetRotationY;
      carGroup.rotation.x = THREE.MathUtils.lerp(carGroup.rotation.x, targetRotationX, 0.05);

      // Rotate wheels slowly
      wheels.forEach((w) => {
        w.children.forEach((mesh) => {
          mesh.rotation.y += 0.01;
        });
      });

      // Subtle pulse on neon ring
      ringMat.opacity = 0.5 + Math.sin(elapsedTime * 2.5) * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[350px] md:min-h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
    >
      <div className="absolute top-4 right-4 pointer-events-none bg-navy-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-electric-500/30 text-xs font-medium text-electric-300 flex items-center gap-1.5 shadow-glow-sm">
        <span className="w-2 h-2 rounded-full bg-electric-glow animate-ping"></span>
        Interactive 3D Fleet Canvas
      </div>
    </div>
  );
};
