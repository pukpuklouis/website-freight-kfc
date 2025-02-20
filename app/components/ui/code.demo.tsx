import { Tilt } from "~/components/ui/tilt";
import { Spotlight } from "~/components/ui/spotlight";

function BasicTiltCard() {
  return (
    <Tilt rotationFactor={8} isRevese data-oid="0xw794u">
      <div
        style={{
          borderRadius: "12px",
        }}
        className="flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
        data-oid="86rkm:4"
      >
        <img
          src="https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg"
          alt="Ghost in the shell - Kôkaku kidôtai"
          className="h-48 w-full object-cover"
          data-oid="bs_hk.8"
        />

        <div className="p-2" data-oid="kx-o3h6">
          <h1
            className="font-mono leading-snug text-zinc-950 dark:text-zinc-50"
            data-oid="akdt5q5"
          >
            Ghost in the Shell
          </h1>
          <p className="text-zinc-700 dark:text-zinc-400" data-oid="x4aiwv_">
            Kôkaku kidôtai
          </p>
        </div>
      </div>
    </Tilt>
  );
}

function TiltSpotlight() {
  return (
    <div className="aspect-video max-w-sm" data-oid="k8_6fqg">
      <Tilt
        rotationFactor={6}
        isRevese
        style={{
          transformOrigin: "center center",
        }}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
        className="group relative rounded-lg"
        data-oid="470s1sg"
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
          data-oid="8ahkny5"
        />

        <img
          src="https://images.beta.cosmos.so/40fbc749-6796-485b-9588-20204dd7c8f0?format=jpeg"
          alt="Ghost in the shell - Kôkaku kidôtai"
          className="h-32 w-full rounded-lg object-cover grayscale duration-700 group-hover:grayscale-0"
          data-oid="3zrtw87"
        />
      </Tilt>
      <div className="flex flex-col space-y-0.5 pb-0 pt-3" data-oid="-oaw295">
        <h3
          className="font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400"
          data-oid="-d:a_:w"
        >
          2001: A Space Odyssey
        </h3>
        <p className="text-sm text-black dark:text-white" data-oid="cae1h9g">
          Stanley Kubrick
        </p>
      </div>
    </div>
  );
}

export { BasicTiltCard, TiltSpotlight };
