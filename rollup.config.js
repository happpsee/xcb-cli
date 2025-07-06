import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";


export default {
  input: {
    'xcb':'src/index.ts'
},
    output: {   
    dir: 'dist',
    format: 'es',
    entryFileNames: 'entry-[name].js',
    },
    plugins:[
        nodeResolve(),
        externals({
            devDeps:true
        }),
        json(),
        typescript(),
        commonjs(),
        terser()
    ],
}