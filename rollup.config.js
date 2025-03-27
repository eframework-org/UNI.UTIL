import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import dts from 'rollup-plugin-dts';

export default [
    {
        input: "src/index.ts",
        output: [{
            file: "dist/index.mjs",
            format: "es",
            sourcemap: process.argv.indexOf("--mode=production") === -1
        },
        {
            file: "dist/index.cjs",
            format: "cjs",
            sourcemap: process.argv.indexOf("--mode=production") === -1
        }],
        plugins: [
            typescript({ tsconfig: "tsconfig.json" }),
            (process.argv[3] == "production" && terser()) || sourceMaps(),
        ],
    },
    {
        input: "dist/src/index.d.ts",
        output: {
            file: "dist/index.d.ts",
            format: "es",
        },
        plugins: [dts(), {
            name: "udts",
            writeBundle() {
                cleanup("dist/src")
                cleanup("dist/test")
            }
        }],
    },
    {
        input: "test/index.ts",
        output: [{
            file: "test/dist/index.mjs",
            format: "es",
            sourcemap: process.argv.indexOf("--mode=production") === -1
        },
        {
            file: "test/dist/index.cjs",
            format: "cjs",
            sourcemap: process.argv.indexOf("--mode=production") === -1
        }],
        plugins: [
            typescript({ tsconfig: "tsconfig.json" }),
            (process.argv[3] == "production" && terser()) || sourceMaps(),
        ],
    },
    {
        input: "test/dist/test/index.d.ts",
        output: {
            file: "test/dist/index.d.ts",
            format: "es",
        },
        plugins: [dts(), {
            name: "udts",
            writeBundle() {
                cleanup("test/dist/src")
                cleanup("test/dist/test")
            }
        }],
    }
];

function cleanup(dir) {
    const fs = require("fs")
    const path = require("path")
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            file = path.join(dir, file)
            if (fs.lstatSync(file).isDirectory()) {
                cleanup(file)
            } else {
                fs.unlinkSync(file)
            }
        })
        fs.rmdirSync(dir)
        console.log(`Directory ${dir} has been cleanup.`)
    } else {
        console.warn(`Directory does not exist: ${dir}`)
    }
}
