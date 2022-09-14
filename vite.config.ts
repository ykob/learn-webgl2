import basicSsl from "@vitejs/plugin-basic-ssl";

export default {
  build: {
    outDir: "../dist",
  },
  plugins: [basicSsl()],
  public: "public",
  root: "src",
  server: {
    https: true,
  },
};
