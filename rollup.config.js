import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'

const isProduction = process.env.NODE_ENV === 'production'
const generateSourceMaps = !isProduction

// Base configuration
const baseConfig = {
  external: ['react', 'vue'],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      rootDir: './src',
      declarationMap: generateSourceMaps
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

// TypeScript declaration files
const dtsConfig = {
  input: 'dist/index.d.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es'
  },
  plugins: [dts()]
}

// React TypeScript declarations
const reactDtsConfig = {
  input: 'dist/react/index.d.ts',
  output: {
    file: 'dist/react/index.d.ts',
    format: 'es'
  },
  plugins: [dts()]
}

// Vue TypeScript declarations
const vueDtsConfig = {
  input: 'dist/vue/index.d.ts',
  output: {
    file: 'dist/vue/index.d.ts',
    format: 'es'
  },
  plugins: [dts()]
}

// Export configurations based on environment  
const configs = [mainConfig, reactConfig, vueConfig]

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
          pure_funcs: ['console.log', 'console.warn'],
          dead_code: true,
          keep_infinity: true
        },
        mangle: {
          reserved: ['ForcePortraitMode', 'enablePortraitMode', 'disablePortraitMode']
        },
        format: {
          comments: false
        }
      }))
    }
  })
}

// Always include TypeScript declarations (but only essential ones)
configs.push(dtsConfig, reactDtsConfig, vueDtsConfig)

export default configs