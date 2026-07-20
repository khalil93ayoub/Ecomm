import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "dist/**",
      "build/**",
      ".test-build/**",
      "next-env.d.ts",
      "assets/**",
      "breil/**",
      "cable/**",
      "css/**",
      "fossil-privateer/**",
      "js/**",
      "magnetic-charger/**",
      "scripts/**",
      "vacuum/**",
    ],
  },
];

export default eslintConfig;
