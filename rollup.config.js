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
                cleanup("dist/tests")
            }
        }],
    },
    {
        input: "tests/index.ts",
        output: [{
            file: "tests/dist/index.mjs",
            format: "es",
            sourcemap: process.argv.indexOf("--mode=production") === -1
        },
        {
            file: "tests/dist/index.cjs",
            format: "cjs",
            sourcemap: process.argv.indexOf("--mode=production") === -1
        }],
        plugins: [
            typescript({ tsconfig: "tsconfig.json" }),
            (process.argv[3] == "production" && terser()) || sourceMaps(),
        ],
    },
    {
        input: "tests/dist/tests/index.d.ts",
        output: {
            file: "tests/dist/index.d.ts",
            format: "es",
        },
        plugins: [dts(), {
            name: "udts",
            writeBundle() {
                cleanup("tests/dist/src")
                cleanup("tests/dist/tests")
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
