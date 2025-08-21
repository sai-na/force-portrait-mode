import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'

const isProduction = process.env.NODE_ENV === 'production'

// Base configuration
const baseConfig = {
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
      rootDir: './src'
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
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'ForcePortraitMode',
      exports: 'named',
      sourcemap: true
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
      sourcemap: true
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

// TypeScript declaration files
const dtsConfig = {
  input: 'dist/index.d.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es'
  },
  plugins: [dts()]
}

// Export configurations based on environment
const configs = [mainConfig]

if (isProduction) {
  configs.push(minifiedConfig)
}

// Always include TypeScript declarations
configs.push(dtsConfig)

export default configs