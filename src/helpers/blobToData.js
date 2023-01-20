//https://stackoverflow.com/questions/25046301/convert-url-to-file-or-blob-for-filereader-readasdataurl

export const blobToData = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
}