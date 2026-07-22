import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.melodystream.app",
  appName: "Melody Stream",
  webDir: ".output/public",
  server: {
    url: "https://ais-pre-svrapgn4qectj7u2h3qwzl-592222052603.asia-east1.run.app",
    cleartext: true,
  },
};

export default config;
