import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'

const isProduction = process.env.NODE_ENV === 'production'
const generateSourceMaps = false

// Base configuration
const baseConfig = {
  external: ['react', 'vue'],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
      exportConditions: ['import', 'module', 'default']
    }),
    commonjs({
      include: /node_modules/
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      exclude: ['**/*.test.ts', '**/*.spec.ts']
    })
  ]
}

// Main build configurations
const mainConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: generateSourceMaps
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: generateSourceMaps
    }
  ],
  ...baseConfig
}

// Minified versions
const minifiedConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'ForcePortraitMode',
      exports: 'named',
      sourcemap: false
    }
  ],
  plugins: [
    ...baseConfig.plugins,
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: {
        reserved: ['enablePortraitMode', 'disablePortraitMode', 'updatePortraitMode']
      }
    })
  ]
}

// React integration build
const reactConfig = {
  input: 'src/react/index.ts',
  output: [
    {
      file: 'dist/react/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: generateSourceMaps
    },
    {
      file: 'dist/react/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: generateSourceMaps
    }
  ],
  ...baseConfig
}

// Vue integration build
const vueConfig = {
  input: 'src/vue/index.ts',
  output: [
    {
      file: 'dist/vue/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: generateSourceMaps
    },
    {
      file: 'dist/vue/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: generateSourceMaps
    }
  ],
  ...baseConfig
}

// Consolidated TypeScript declaration file
const dtsConfig = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es'
  },
  plugins: [dts()],
  external: ['react', 'vue']
}

// Export configurations based on environment  
const configs = [mainConfig]

// Only include framework integrations if they're actually used
if (process.env.BUILD_REACT !== 'false') {
  configs.push(reactConfig)
}
if (process.env.BUILD_VUE !== 'false') {
  configs.push(vueConfig)
}

if (isProduction) {
  // Add minified version for production
  configs.push(minifiedConfig)
  
  // Add tree-shaking optimizations
  configs.forEach(config => {
    if (config.plugins) {
      config.plugins.push(terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.warn', 'console.info'],
          dead_code: true,
          unused: true,
          side_effects: false,
          keep_infinity: true,
          passes: 2
        },
        mangle: {
          reserved: ['ForcePortraitMode', 'enablePortraitMode', 'disablePortraitMode'],
          toplevel: true
        },
        format: {
          comments: false,
          ecma: 2020
        }
      }))
    }
  })
}

// Include consolidated TypeScript declarations
configs.push(dtsConfig)

export default configs