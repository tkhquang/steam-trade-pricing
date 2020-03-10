const tailwindcss = require("tailwindcss");
const glob = require("glob-all");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["src/index.html", "src/**/*.js"],
  css: ["src/styles/*.css"],
  extractors: [
    {
      extractor: class TailwindExtractor {
        static extract(content) {
          return content.match(/[\w-/:]+(?<!:)/g) || [];
        }
      },
      extensions: ["css", "html", "js"]
    }
  ],
  whitelist: ["html", "body"]
});

module.exports = ctx => {
  return {
    // Specify the locations of any files you want to scan for class names.
    paths: glob.sync(["src/**/*.js"]),
    syntax: "postcss-scss",
    parser: "postcss-scss",
    plugins: [
      postcssImport,
      tailwindcss("./tailwind.config.js"),
      autoprefixer,
      ...(ctx.webpack.mode === "production" ? [purgecss] : [])
    ]
  };
};
