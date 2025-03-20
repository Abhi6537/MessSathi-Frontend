
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  maxImages?: number;
  onChange: (files: File[]) => void;
}

export default function ImageUpload({ maxImages = 5, onChange }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (!selectedFiles) return;

      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      if (files.length + selectedFiles.length > maxImages) {
        toast.error(`You can upload a maximum of ${maxImages} images.`);
        return;
      }

      Array.from(selectedFiles).forEach((file) => {
        // Only process image files
        if (!file.type.match("image.*")) {
          toast.error("Please select only image files.");
          return;
        }

        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      });

      setFiles([...files, ...newFiles]);
      setPreviews([...previews, ...newPreviews]);
      onChange([...files, ...newFiles]);

      // Reset the input value to allow selecting the same file again
      e.target.value = "";
    },
    [files, previews, maxImages, onChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      // Remove the preview URL and revoke the object URL to free memory
      URL.revokeObjectURL(previews[index]);
      
      const newPreviews = [...previews];
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);
      
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      onChange(newFiles);
    },
    [files, previews, onChange]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
            <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 rounded-full"
              onClick={() => removeImage(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        
        {previews.length < maxImages && (
          <div className="flex items-center justify-center aspect-square border border-dashed rounded-md bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload Image
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          {files.length} of {maxImages} images
        </p>
        
        <label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            disabled={files.length >= maxImages}
          >
            <Upload className="h-4 w-4" />
            Browse Files
          </Button>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={files.length >= maxImages}
          />
        </label>
      </div>
    </div>
  );
}
