export type EnvironmentQuality = "standard" | "low";
export type EnvironmentVector3 = [number, number, number];

export type EnvironmentCameraStage = {
  at: number;
  position: EnvironmentVector3;
  lookAt: EnvironmentVector3;
};

export type EnvironmentGlassPanelConfig = {
  depthDrift: EnvironmentVector3;
  opacity: number;
  position: EnvironmentVector3;
  rotation: EnvironmentVector3;
  scale: EnvironmentVector3;
  speed: number;
};

export type EnvironmentEnergyLineConfig = {
  color: string;
  curve: number;
  length: number;
  opacity: number;
  radius: number;
  rotation: EnvironmentVector3;
  scrollDrift: EnvironmentVector3;
  speed: number;
  width: number;
};

export type EnvironmentLightStreakConfig = {
  color: string;
  length: number;
  opacity: number;
  position: EnvironmentVector3;
  rotation: EnvironmentVector3;
  scrollDrift: EnvironmentVector3;
  speed: number;
  width: number;
};

export const environmentConfig = {
  capability: {
    breakpoint: 760,
  },
  renderer: {
    dpr: {
      low: [1, 1.12] as [number, number],
      standard: [1, 1.45] as [number, number],
    },
  },
  camera: {
    fov: 42,
    near: 0.1,
    far: 54,
    pointerOffset: {
      x: 0.1,
      y: 0.07,
    },
    stages: [
      {
        at: 0,
        position: [0, 0.24, 8.2] as EnvironmentVector3,
        lookAt: [0, 0.08, 0] as EnvironmentVector3,
      },
      {
        at: 0.22,
        position: [0.26, 0.4, 7.15] as EnvironmentVector3,
        lookAt: [0.06, 0.02, -0.6] as EnvironmentVector3,
      },
      {
        at: 0.45,
        position: [-0.42, 0.32, 6.35] as EnvironmentVector3,
        lookAt: [-0.16, 0, -1.2] as EnvironmentVector3,
      },
      {
        at: 0.7,
        position: [0.38, 0.24, 6.85] as EnvironmentVector3,
        lookAt: [0.18, -0.04, -0.45] as EnvironmentVector3,
      },
      {
        at: 1,
        position: [0.04, 0.22, 7.55] as EnvironmentVector3,
        lookAt: [0, 0.02, 0] as EnvironmentVector3,
      },
    ] satisfies EnvironmentCameraStage[],
  },
  lighting: {
    ambient: {
      color: "#879096",
      intensity: 0.18,
    },
    hemisphere: {
      color: "#fff7e8",
      groundColor: "#020303",
      intensity: 0.38,
    },
    key: {
      color: "#fff2d9",
      intensity: 3.2,
      position: [3.2, 4.4, 5.2] as EnvironmentVector3,
    },
    rim: {
      color: "#9fb0b8",
      intensity: 1.55,
      position: [-3.8, 1.4, -2.2] as EnvironmentVector3,
    },
    gold: {
      color: "#c79b48",
      intensity: 4.4,
      position: [-2.4, 0.7, 3.6] as EnvironmentVector3,
    },
    cursor: {
      color: "#d7ad63",
      intensity: 2.1,
      position: [0, 0.25, 2.8] as EnvironmentVector3,
      range: {
        x: 1.35,
        y: 0.82,
      },
    },
    glowFields: [
      {
        color: "#fff0d5",
        intensity: 2.7,
        position: [-2.1, 1.6, -1.2] as EnvironmentVector3,
      },
      {
        color: "#c79b48",
        intensity: 2.1,
        position: [2.1, 0.55, -0.7] as EnvironmentVector3,
      },
      {
        color: "#dce7ea",
        intensity: 1.5,
        position: [0.2, -0.35, -2.4] as EnvironmentVector3,
      },
    ],
  },
  fog: {
    color: "#050607",
    density: {
      low: 0.055,
      standard: 0.043,
    },
    scrollDensityBoost: 0.014,
  },
  environment: {
    scrollDepth: -1.35,
    scrollLift: 0.28,
    scrollShift: 0.36,
  },
  glass: {
    mobileCount: 5,
    panels: [
      {
        depthDrift: [0.36, 0.1, -1.08] as EnvironmentVector3,
        opacity: 0.2,
        position: [-1.85, 0.55, -1.2] as EnvironmentVector3,
        rotation: [0.16, -0.66, 0.1] as EnvironmentVector3,
        scale: [1.15, 0.02, 2.7] as EnvironmentVector3,
        speed: 0.12,
      },
      {
        depthDrift: [-0.28, -0.04, -0.74] as EnvironmentVector3,
        opacity: 0.16,
        position: [1.72, -0.18, -0.48] as EnvironmentVector3,
        rotation: [-0.12, 0.54, -0.11] as EnvironmentVector3,
        scale: [0.94, 0.018, 2.05] as EnvironmentVector3,
        speed: 0.16,
      },
      {
        depthDrift: [-0.16, 0.18, -1.35] as EnvironmentVector3,
        opacity: 0.13,
        position: [0.22, 1.05, -2.1] as EnvironmentVector3,
        rotation: [0.24, 0.1, 0.64] as EnvironmentVector3,
        scale: [0.82, 0.016, 1.92] as EnvironmentVector3,
        speed: 0.09,
      },
      {
        depthDrift: [0.14, -0.18, -1.42] as EnvironmentVector3,
        opacity: 0.12,
        position: [-0.2, -1.08, -1.8] as EnvironmentVector3,
        rotation: [-0.2, -0.18, -0.48] as EnvironmentVector3,
        scale: [0.76, 0.016, 1.72] as EnvironmentVector3,
        speed: 0.11,
      },
      {
        depthDrift: [-0.54, 0.06, -1.82] as EnvironmentVector3,
        opacity: 0.12,
        position: [2.62, 0.46, -3.25] as EnvironmentVector3,
        rotation: [0.08, 0.74, 0.18] as EnvironmentVector3,
        scale: [1.05, 0.018, 2.52] as EnvironmentVector3,
        speed: 0.07,
      },
      {
        depthDrift: [0.46, -0.04, -1.66] as EnvironmentVector3,
        opacity: 0.1,
        position: [-2.72, -0.22, -3.05] as EnvironmentVector3,
        rotation: [-0.1, -0.76, -0.18] as EnvironmentVector3,
        scale: [0.92, 0.016, 2.18] as EnvironmentVector3,
        speed: 0.08,
      },
      {
        depthDrift: [0.08, 0.24, -2.05] as EnvironmentVector3,
        opacity: 0.09,
        position: [0.16, 0.2, -4.2] as EnvironmentVector3,
        rotation: [0.18, -0.12, 0.9] as EnvironmentVector3,
        scale: [1.34, 0.012, 2.72] as EnvironmentVector3,
        speed: 0.05,
      },
    ] satisfies EnvironmentGlassPanelConfig[],
  },
  energy: {
    mobileFieldCount: 4,
    mobileStreakCount: 4,
    fieldSegments: {
      low: 34,
      standard: 54,
    },
    fields: [
      {
        color: "#d2a85c",
        curve: 0.58,
        length: 4.1,
        opacity: 0.52,
        radius: 1.18,
        rotation: [0.18, 0.12, -0.16] as EnvironmentVector3,
        scrollDrift: [0.22, 0.03, -0.72] as EnvironmentVector3,
        speed: 0.065,
        width: 1.05,
      },
      {
        color: "#f4efe5",
        curve: -0.46,
        length: 3.2,
        opacity: 0.36,
        radius: 0.86,
        rotation: [-0.12, 0.48, 0.18] as EnvironmentVector3,
        scrollDrift: [-0.18, 0.08, -0.46] as EnvironmentVector3,
        speed: -0.052,
        width: 0.9,
      },
      {
        color: "#8d989d",
        curve: 0.34,
        length: 5.2,
        opacity: 0.3,
        radius: 1.52,
        rotation: [0.06, -0.52, 0.08] as EnvironmentVector3,
        scrollDrift: [0.08, -0.08, -1.08] as EnvironmentVector3,
        speed: 0.035,
        width: 0.72,
      },
      {
        color: "#b8c3c7",
        curve: -0.26,
        length: 5.8,
        opacity: 0.22,
        radius: 1.9,
        rotation: [-0.18, 0.34, -0.22] as EnvironmentVector3,
        scrollDrift: [-0.28, 0.02, -1.6] as EnvironmentVector3,
        speed: -0.022,
        width: 0.62,
      },
      {
        color: "#d9b36a",
        curve: 0.4,
        length: 4.7,
        opacity: 0.28,
        radius: 1.34,
        rotation: [0.24, -0.18, 0.38] as EnvironmentVector3,
        scrollDrift: [0.42, -0.02, -1.26] as EnvironmentVector3,
        speed: 0.028,
        width: 0.7,
      },
      {
        color: "#fff7e8",
        curve: -0.34,
        length: 4.4,
        opacity: 0.2,
        radius: 1.05,
        rotation: [-0.22, 0.18, -0.42] as EnvironmentVector3,
        scrollDrift: [-0.36, 0.04, -1.34] as EnvironmentVector3,
        speed: -0.026,
        width: 0.56,
      },
    ] satisfies EnvironmentEnergyLineConfig[],
    streaks: [
      {
        color: "#fff6e7",
        length: 2.4,
        opacity: 0.44,
        position: [-1.95, 0.92, -0.4] as EnvironmentVector3,
        rotation: [0.05, 0.18, -0.22] as EnvironmentVector3,
        scrollDrift: [0.5, -0.05, -0.9] as EnvironmentVector3,
        speed: 0.08,
        width: 1.4,
      },
      {
        color: "#c79b48",
        length: 2.1,
        opacity: 0.38,
        position: [1.9, -0.16, -1.1] as EnvironmentVector3,
        rotation: [-0.08, -0.22, 0.3] as EnvironmentVector3,
        scrollDrift: [-0.42, 0.06, -0.74] as EnvironmentVector3,
        speed: 0.064,
        width: 1.2,
      },
      {
        color: "#f3ead9",
        length: 3,
        opacity: 0.26,
        position: [0.1, 1.2, -2.2] as EnvironmentVector3,
        rotation: [0.16, 0.05, 0.1] as EnvironmentVector3,
        scrollDrift: [0.14, -0.18, -1.05] as EnvironmentVector3,
        speed: 0.045,
        width: 0.86,
      },
      {
        color: "#9aa7ad",
        length: 3.6,
        opacity: 0.2,
        position: [-2.4, -0.72, -2.85] as EnvironmentVector3,
        rotation: [-0.14, 0.36, -0.08] as EnvironmentVector3,
        scrollDrift: [0.34, 0.16, -1.36] as EnvironmentVector3,
        speed: 0.034,
        width: 0.78,
      },
      {
        color: "#d5ad62",
        length: 2.8,
        opacity: 0.28,
        position: [2.55, 0.52, -3.1] as EnvironmentVector3,
        rotation: [0.1, -0.4, 0.24] as EnvironmentVector3,
        scrollDrift: [-0.32, -0.08, -1.48] as EnvironmentVector3,
        speed: 0.036,
        width: 0.86,
      },
    ] satisfies EnvironmentLightStreakConfig[],
  },
  particles: {
    count: {
      low: 80,
      standard: 180,
    },
    field: {
      x: 5.8,
      y: 3.1,
      z: 8.6,
    },
    opacity: {
      low: 0.18,
      standard: 0.26,
    },
    radius: {
      low: 0.012,
      standard: 0.016,
    },
  },
  motion: {
    cursorInfluence: 0.7,
    idleSpeed: 0.14,
    parallaxStrength: 0.16,
    scrollSpeed: 0.62,
  },
} as const;
