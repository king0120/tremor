// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable no-undef */
// import commonjs from "@rollup/plugin-commonjs";
// import resolve from "@rollup/plugin-node-resolve";
// import typescript from "@rollup/plugin-typescript";
//
// import dts from "rollup-plugin-dts";
// import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import { typescriptPaths } from "rollup-plugin-typescript-paths";
// import { terser } from "rollup-plugin-terser";
// import preserveDirectives from "rollup-plugin-preserve-directives";
//
// const outputOptions = {
//   sourcemap: false,
//   preserveModules: true,
//   preserveModulesRoot: "src",
// };
//
// export default [
//   {
//     input: {
//       // "src/index.ts",
//       // "src/chart-elements",
//       AreaChart: "src/components/chart-elements/AreaChart/index.ts",
//       BarChart: "src/components/chart-elements/BarChart/index.ts",
//       LineChart: "src/components/chart-elements/LineChart/index.ts",
//       DonutChart: "src/components/chart-elements/DonutChart/index.ts",
//       // "src/icon-elements",
//       // "src/layout-elements",
//       // "src/list-elements",
//       // "src/input-elements",
//       // "src/text-elements",
//       // "src/vis-elements",
//     },
//     output: [
//       {
//         dir: "dist",
//         format: "esm",
//         entryFileNames: "[name].js",
//       },
//       // {
//       //   dir: "dist",
//       //   format: "cjs",
//       //   entryFileNames: "[name].cjs",
//       //   exports: "auto",
//       //   ...outputOptions,
//       // },
//       // {
//       //   dir: "dist",
//       //   format: "esm",
//       //   ...outputOptions,
//       // },
//     ],
//     external: [/node_modules/],
//     plugins: [
//       peerDepsExternal(),
//       resolve(),
//       commonjs(),
//       preserveDirectives(),
//       terser(),
//       typescript({
//         tsconfig: "./tsconfig.json",
//         exclude: ["**/stories/**", "**/tests/**", "./styles.css"],
//       }),
//       typescriptPaths(),
//     ],
//   },
//   {
//     input: "dist/index.d.ts",
//     output: [{ file: "dist/index.d.ts", format: "esm" }],
//     plugins: [dts()],
//     external: [/\.css$/],
//   },
// ];

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.ts",
    output: {
      name: "tremor",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })]
  }
];