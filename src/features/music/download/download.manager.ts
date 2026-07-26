export class DownloadManager {
  static async downloadTrack(audioUrl: string, filename: string): Promise<boolean> {
    if (!audioUrl) return false;
    try {
      const res = await fetch(audioUrl);
      if (!res.ok) throw new Error("Stream download fetch failed");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename.endsWith(".mp3") ? filename : `${filename}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      return true;
    } catch (error) {
      console.warn("Direct Blob download failed, attempting fallback window.open:", error);
      try {
        window.open(audioUrl, "_blank");
        return true;
      } catch {
        return false;
      }
    }
  }
}
