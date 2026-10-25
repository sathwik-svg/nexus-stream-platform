import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Layers,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  Zap,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Activity,
  Shield,
  Eye,
} from 'lucide-react';
import { ThreeDButton } from './ThreeDButton';

interface Interactive3DSceneProps {
  onClose?: () => void;
}

// Pre-allocate reusable math vectors at module scope to eliminate GC in render loop
const _vec3 = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export const Interactive3DScene: React.FC<Interactive3DSceneProps> = ({ onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [explodedFactor, setExplodedFactor] = useState(0.4);
  const [isRotating, setIsRotating] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedLayer, setSelectedLayer] = useState<'all' | 'gateway' | 'kafka' | 'storage'>('all');
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [viewPreset, setViewPreset] = useState<'iso' | 'exploded' | 'kafka' | 'storage'>('iso');

  // Mutable refs to pass state to Three.js loop without re-triggering useEffect
  const explodedRef = useRef(0.4);
  const rotatingRef = useRef(true);
  const speedRef = useRef(1);
  const targetCamPos = useRef(new THREE.Vector3(12, 10, 14));
  const targetCamLook = useRef(new THREE.Vector3(0, 1.5, 0));

  useEffect(() => {
    explodedRef.current = explodedFactor;
  }, [explodedFactor]);

  useEffect(() => {
    rotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL Detection Guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene & Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617); // Slate-950
    scene.fog = new THREE.FogExp2(0x020617, 0.025);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(12, 10, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Reflections (PMREMGenerator + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const ambientLight = new THREE.HemisphereLight(0x38bdf8, 0x020617, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(10, 18, 12);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 3, 25);
    rimLight.position.set(-8, 6, -8);
    scene.add(rimLight);

    const cyanAccent = new THREE.PointLight(0x06b6d4, 2, 20);
    cyanAccent.position.set(8, -2, -6);
    scene.add(cyanAccent);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Don't go below floor
    controls.minDistance = 4;
    controls.maxDistance = 30;

    // Stop auto-rotation if user manually touches controls
    controls.addEventListener('start', () => {
      rotatingRef.current = false;
      setIsRotating(false);
    });

    // 6. Ground Platform & Contact Shadow
    const floorGeo = new THREE.CylinderGeometry(8, 8.5, 0.4, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.6,
      metalness: 0.4,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.2;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // Floor Glowing Grid Ring
    const ringGeo = new THREE.RingGeometry(7.2, 7.5, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.02;
    scene.add(ringMesh);

    // 7. COMPOSITE PROCEDURAL 3D TIERS
    const rootCluster = new THREE.Group();
    scene.add(rootCluster);

    // Materials
    const metalDarkMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.2,
    });
    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.15,
    });
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const emeraldGlowMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const violetGlowMat = new THREE.MeshBasicMaterial({ color: 0x818cf8 });

    // --- TIER 1: TimescaleDB Hypertables & Storage Array (Base) ---
    const tier1Group = new THREE.Group();
    tier1Group.name = 'tier-storage';

    const t1BaseGeo = new THREE.BoxGeometry(4.2, 0.8, 4.2);
    const t1Base = new THREE.Mesh(t1BaseGeo, metalDarkMat);
    t1Base.castShadow = !isSoftwareGl;
    tier1Group.add(t1Base);

    // 4 Solid State Storage Drive Modules
    for (let x = -1; x <= 1; x += 2) {
      for (let z = -1; z <= 1; z += 2) {
        const ssdGeo = new THREE.BoxGeometry(1.5, 0.4, 1.5);
        const ssdMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          metalness: 0.7,
          roughness: 0.3,
        });
        const ssd = new THREE.Mesh(ssdGeo, ssdMat);
        ssd.position.set(x * 1.1, 0.5, z * 1.1);
        tier1Group.add(ssd);

        // LED strip
        const ledGeo = new THREE.BoxGeometry(1.2, 0.05, 0.1);
        const led = new THREE.Mesh(ledGeo, violetGlowMat);
        led.position.set(x * 1.1, 0.72, z * 1.1 + 0.65);
        tier1Group.add(led);
      }
    }
    tier1Group.position.y = 0.8;
    rootCluster.add(tier1Group);

    // --- TIER 2: Kafka Streaming Broker & Partition Bus (Middle) ---
    const tier2Group = new THREE.Group();
    tier2Group.name = 'tier-kafka';

    const t2CoreGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.6, 24);
    const t2Core = new THREE.Mesh(t2CoreGeo, metalDarkMat);
    t2Core.castShadow = !isSoftwareGl;
    tier2Group.add(t2Core);

    // Revolving stream ring around Kafka core
    const streamRingGeo = new THREE.TorusGeometry(2.6, 0.08, 12, 32);
    const streamRing = new THREE.Mesh(streamRingGeo, cyanGlowMat);
    streamRing.rotation.x = Math.PI / 2;
    tier2Group.add(streamRing);

    // 8 Partition Pylons / Cores
    const pylonGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const pylonGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.9, 12);
      const pylon = new THREE.Mesh(pylonGeo, goldAccentMat);
      pylon.position.set(Math.cos(angle) * 1.7, 0.3, Math.sin(angle) * 1.7);
      pylonGroup.add(pylon);
    }
    tier2Group.add(pylonGroup);

    tier2Group.position.y = 2.4;
    rootCluster.add(tier2Group);

    // --- TIER 3: Edge Ingestion & Anomaly Detection Gateway (Top) ---
    const tier3Group = new THREE.Group();
    tier3Group.name = 'tier-gateway';

    const t3HeadGeo = new THREE.BoxGeometry(3.6, 0.6, 3.6);
    const t3Head = new THREE.Mesh(t3HeadGeo, metalDarkMat);
    t3Head.castShadow = !isSoftwareGl;
    tier3Group.add(t3Head);

    // Ingestion Antennas & Telemetry Sensor Head
    const sensorGeo = new THREE.OctahedronGeometry(0.7, 0);
    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const sensorHead = new THREE.Mesh(sensorGeo, sensorMat);
    sensorHead.position.y = 0.8;
    tier3Group.add(sensorHead);

    // Orbiting Anomaly Scanner Rings
    const scannerRingGeo = new THREE.TorusGeometry(1.2, 0.04, 8, 24);
    const scannerRing1 = new THREE.Mesh(scannerRingGeo, emeraldGlowMat);
    scannerRing1.rotation.x = Math.PI / 3;
    scannerRing1.position.y = 0.8;
    tier3Group.add(scannerRing1);

    const scannerRing2 = new THREE.Mesh(scannerRingGeo, cyanGlowMat);
    scannerRing2.rotation.y = Math.PI / 4;
    scannerRing2.position.y = 0.8;
    tier3Group.add(scannerRing2);

    tier3Group.position.y = 4.0;
    rootCluster.add(tier3Group);

    // 8. 3D MOVING DATA PACKETS (Real particle objects flying along pipeline)
    const packetCount = 28;
    const packetGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const packetMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < packetCount; i++) {
      const p = new THREE.Mesh(packetGeo, packetMat);
      scene.add(p);
      packetMeshes.push(p);
    }

    // 9. ANIMATION LOOP WITH ULTRA-MODE SOFTWARE WEBGL PACING
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * speedRef.current;

      // Smooth Exploded View Layer Separation (Exponential Damping)
      const currentExplode = explodedRef.current;
      tier1Group.position.y = THREE.MathUtils.damp(tier1Group.position.y, 0.8, 4, delta);
      tier2Group.position.y = THREE.MathUtils.damp(tier2Group.position.y, 0.8 + 1.6 + currentExplode * 2.2, 4, delta);
      tier3Group.position.y = THREE.MathUtils.damp(tier3Group.position.y, 0.8 + 3.2 + currentExplode * 4.5, 4, delta);

      // Rotating Objects
      if (rotatingRef.current) {
        rootCluster.rotation.y += 0.35 * delta * speedRef.current;
      }

      // Internal sub-component animations
      streamRing.rotation.z += 1.2 * delta * speedRef.current;
      pylonGroup.rotation.y -= 0.6 * delta * speedRef.current;
      sensorHead.rotation.y += 1.5 * delta * speedRef.current;
      scannerRing1.rotation.z += 1.8 * delta * speedRef.current;
      scannerRing2.rotation.x += 1.4 * delta * speedRef.current;

      // Move 3D Data Packets along vertical & orbital pipeline
      packetMeshes.forEach((packet, idx) => {
        const offset = (idx / packetCount) * Math.PI * 2;
        const cycle = (time * 1.2 + offset) % (Math.PI * 2);

        // Path: from top gateway down through Kafka to storage and looping back
        const radius = 2.0 + Math.sin(time + idx) * 0.4;
        const px = Math.cos(cycle) * radius;
        const pz = Math.sin(cycle) * radius;
        const py = THREE.MathUtils.lerp(
          tier1Group.position.y - 0.2,
          tier3Group.position.y + 0.8,
          (Math.sin(cycle) + 1) / 2
        );

        packet.position.set(px, py, pz);
      });

      // Smooth Camera Transition to target view preset
      camera.position.lerp(targetCamPos.current, 0.05);
      controls.target.lerp(targetCamLook.current, 0.05);
      controls.update();

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // 10. Responsive Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleCameraPreset = (preset: 'iso' | 'exploded' | 'kafka' | 'storage') => {
    setViewPreset(preset);
    switch (preset) {
      case 'iso':
        targetCamPos.current.set(12, 10, 14);
        targetCamLook.current.set(0, 2.5, 0);
        setExplodedFactor(0.3);
        setSelectedLayer('all');
        break;
      case 'exploded':
        targetCamPos.current.set(15, 12, 15);
        targetCamLook.current.set(0, 3.5, 0);
        setExplodedFactor(1.0);
        setSelectedLayer('all');
        break;
      case 'kafka':
        targetCamPos.current.set(6, 4.5, 6);
        targetCamLook.current.set(0, 2.4, 0);
        setExplodedFactor(0.8);
        setSelectedLayer('kafka');
        break;
      case 'storage':
        targetCamPos.current.set(7, 3, 7);
        targetCamLook.current.set(0, 1.0, 0);
        setExplodedFactor(0.8);
        setSelectedLayer('storage');
        break;
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
      {/* Top Header Badge Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-auto">
        <span className="bg-slate-900/90 backdrop-blur-md border border-slate-800 text-sky-400 text-xs font-mono px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>3D Real-Time Hardware Architecture Explorer</span>
        </span>
        <span className="hidden sm:inline-block bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[11px] font-mono px-2.5 py-1 rounded-lg">
          Live 3D Telemetry Simulation
        </span>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
        <ThreeDButton
          size="sm"
          variant="secondary"
          onClick={() => setIsRotating(!isRotating)}
          icon={isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        >
          {isRotating ? 'Pause Orbit' : 'Rotate'}
        </ThreeDButton>

        {onClose && (
          <ThreeDButton size="sm" variant="secondary" onClick={onClose}>
            Back
          </ThreeDButton>
        )}
      </div>

      {/* Central 3D Canvas Mount (100% Unobstructed) */}
      <div
        ref={mountRef}
        className="w-full h-[520px] md:h-[600px] cursor-grab active:cursor-grabbing outline-none"
        style={{ touchAction: 'none' }}
      />

      {/* Collapsible Bottom Control Dock (Consolidated Ergonomic Dock) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl pointer-events-auto transition-transform duration-300">
        {/* Collapse / Expand Tab Toggle */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white px-3 py-1 rounded-t-xl text-[11px] font-mono flex items-center gap-1 shadow-md"
          >
            {isDockCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            <span>{isDockCollapsed ? 'Show 3D Controls' : 'Hide Dock (Zen Mode)'}</span>
          </button>
        </div>

        {/* Dock Content */}
        {!isDockCollapsed && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Camera Presets (3D Buttons) */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-[11px] text-slate-400 font-mono mr-1 shrink-0">Views:</span>
              <ThreeDButton
                size="sm"
                variant={viewPreset === 'iso' ? 'primary' : 'secondary'}
                onClick={() => handleCameraPreset('iso')}
              >
                Isometric
              </ThreeDButton>
              <ThreeDButton
                size="sm"
                variant={viewPreset === 'exploded' ? 'primary' : 'secondary'}
                onClick={() => handleCameraPreset('exploded')}
              >
                Exploded 3D
              </ThreeDButton>
              <ThreeDButton
                size="sm"
                variant={viewPreset === 'kafka' ? 'primary' : 'secondary'}
                onClick={() => handleCameraPreset('kafka')}
              >
                Kafka Bus
              </ThreeDButton>
              <ThreeDButton
                size="sm"
                variant={viewPreset === 'storage' ? 'primary' : 'secondary'}
                onClick={() => handleCameraPreset('storage')}
              >
                Hypertables
              </ThreeDButton>
            </div>

            {/* Exploded Separation Slider */}
            <div className="flex items-center gap-3 w-full md:w-56 shrink-0">
              <span className="text-[11px] text-slate-400 font-mono shrink-0">Explode:</span>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={explodedFactor}
                onChange={e => setExplodedFactor(parseFloat(e.target.value))}
                className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] font-mono text-sky-400 w-8 text-right">
                {Math.round(explodedFactor * 100)}%
              </span>
            </div>

            {/* Speed Multiplier & Live Indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-slate-400 font-mono">Stream:</span>
              {[1, 2, 4].map(speed => (
                <button
                  key={speed}
                  onClick={() => setSpeedMultiplier(speed)}
                  className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                    speedMultiplier === speed
                      ? 'bg-sky-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
