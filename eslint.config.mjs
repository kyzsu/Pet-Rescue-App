import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

// UDAH DITAMBAHKAN BELOM?
// SEBELUMNYA JUGA PUNYAKU BELOM ADA.
// kita break dulu, sampai 10.30 yak. mau ngopi duls.

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  reactPlugin.configs.flat["jsx-runtime"],
  ...pluginQuery.configs["flat/recommended"],
  // kalo pluginQuery ini supaya dapat mendeteksi kalo ada kesalahan dalam menggunakan fungsi tanstack query.
  // sebenarnya kan dijalaninnya top-bottom. jadi urutannya penting. Takutnya ada config eslint yang ke-skip karena tidak sesuai urutan. Nah untuk pahami urutannya juga aku belum begitu kuasai.
  // iya jalan-jalan aja.
  // OKEE. lanjut kita.

  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
  },
  prettier,
];
