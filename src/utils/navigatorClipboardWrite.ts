export const navigatorClipboardWrite = (text: string) => {
  /**
   * alert 관련해선 추후에 수정하기로
   * navigator.clipboard.writeText VDI 안 edge 에선 안됨...
   */
  const copyToClipboard = (val: string) => {
    try {
      const t = document.createElement("textarea");
      const copyArea = document.getElementById("copyArea");
      if (copyArea) {
        copyArea.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand("copy");
        copyArea.removeChild(t);
      }

      alert("복사 되었습니다. old");
    } catch (e) {
      console.error("copyToClipboard", e);
    }
  };

  try {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("복사 되었습니다.");
        console.log("Content copied to clipboard");
      })
      .catch((error) => {
        copyToClipboard(text);
        console.error("Failed to copy: ", error);
      });
  } catch {
    copyToClipboard(text);
  }
};
