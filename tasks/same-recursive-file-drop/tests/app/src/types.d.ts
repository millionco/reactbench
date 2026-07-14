interface FileSystemEntryLike {
  fullPath: string;
  isDirectory: boolean;
  isFile: boolean;
}

interface FileSystemFileEntryLike extends FileSystemEntryLike {
  file: (
    successCallback: (file: File) => void,
    errorCallback: (error: DOMException) => void,
  ) => void;
}

interface FileSystemDirectoryReaderLike {
  readEntries: (
    successCallback: (entries: Array<FileSystemEntryLike>) => void,
    errorCallback: (error: DOMException) => void,
  ) => void;
}

interface FileSystemDirectoryEntryLike extends FileSystemEntryLike {
  createReader: () => FileSystemDirectoryReaderLike;
}

interface DataTransferItemLike {
  getAsFile: () => File | null;
  kind: string;
  webkitGetAsEntry: () => FileSystemEntryLike | null;
}

interface DataTransferLike {
  files: ArrayLike<File>;
  items: ArrayLike<DataTransferItemLike>;
}

interface UploadRecord {
  destination: string;
  files: Array<File>;
  paths: Array<string>;
}

interface DropWorkspaceProps {
  defaultDestination?: string;
  isOwner?: boolean;
  onUpload: (record: UploadRecord) => Promise<void>;
}
