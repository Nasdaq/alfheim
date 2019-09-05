<%_ if (typescript) { -%>
import typescript from "rollup-plugin-typescript";
<%_ } -%>
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import minify from "rollup-plugin-babel-minify";
import postcss from "rollup-plugin-postcss";
import url from "rollup-plugin-url";
import json from "rollup-plugin-json";
import postCssUrl from "postcss-url";

// import package.json as an object
import pkg from "./package.json";

const ensureArray = maybeArr =>
  Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const external = Object.keys(pkg.peerDependencies || {});
const allExternal = external.concat(Object.keys(pkg.dependencies || {}));

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
};

const createConfig = ({ output, browser = false, umd = false, env } = {}) => {
  const min = env === "production";

  return {
    <%_ if (typescript) { -%>
    input: "src/index.ts",
    <%_ } else { -%>
    input: "src/index.js",
    <%_ } -%>
    output: ensureArray(output).map(format =>
      Object.assign({}, format, {
        name: "<%= name %>",
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled"
        }
      })
    ),
    plugins: [
      <%_ if (typescript) { -%>
      typescript({ jsx: "react", rootDir: "./src/", rootDirs: null }),
      <%_ } -%>
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
        plugins: [
          [
            "@babel/transform-runtime",
            { useESModules: output.format !== "cjs" }
          ]
        ]
      }),
      commonjs(),
      json({
        include: "src/**",
        exclude: "node/modules/**",
        preferConst: true
      }),
      postcss({
        inject: { insertAt: "top" },
        minimize: true,
        plugins: [postCssUrl({ url: "inline" })]
      }),
      url({
        include: [
          "**/*.gif",
          "**/*.jpg",
          "**/*.png",
          "**/*.ttf",
          "**/*.woff",
          "**/*.woff2",
          "**/*.eot"
        ],
        limit: 1024000,
        emitFiles: false
      }),
      replace(
        Object.assign(
          env ? { "process.env.NODE_ENV": JSON.stringify(env) } : {},
          {
            "process.env.BROWSER": JSON.stringify(browser)
          }
        )
      ),
      min && minify()
    ].filter(Boolean),
    external: makeExternalPredicate(umd ? external : allExternal)
  };
};

const configs = {
  regular_cjs: {
    output: { file: pkg.cjs, format: "cjs" }
  },
  regular_es: {
    output: { file: pkg.module, format: "es" }
  },
  umd_prod: {
    output: { file: pkg.unpkg.replace(/\.min\.js$/, ".js"), format: "umd" },
    umd: true,
    env: "development"
  },
  umd: {
    output: { file: pkg.unpkg, format: "umd" },
    umd: true,
    env: "production"
  }
};

const buildTypes = Object.keys(configs);
const { ROLLUP_BUILDS = buildTypes.join(",") } = process.env;
const builds = ROLLUP_BUILDS.split(",");

export default buildTypes
  .filter(type => builds.includes(type))
  .map(type => createConfig(configs[type]));
