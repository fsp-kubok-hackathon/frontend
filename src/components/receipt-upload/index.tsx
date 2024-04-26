import { forwardRef, useEffect, useId, useState } from 'react';
import { PlusCircle, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ReceiptUploadProps {
  value: FileWithPreview[];
  onChange: (files: FileWithPreview[]) => void;
}

// Тип для объекта файла
interface FileWithPreview extends File {}

const ReceiptUpload = forwardRef(
  ({ value, onChange }: ReceiptUploadProps, ref) => {
    const [files, setFiles] = useState<FileWithPreview[]>(value || []);

    // Обновляем форму при изменении файлов
    useEffect(() => {
      onChange(files);
    }, [files, onChange]);

    const handleAddFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const fileList = Array.from(event.target.files).map((file) => file);
        setFiles([...files, ...fileList]);
      }
    };

    const handleDeleteFile = (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
    };

    const fileUploadId = useId();

    return (
      <Card className="min-w-[400px]">
        <CardHeader>
          <CardTitle>Фотографии чеков</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Фото</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteFile(index)}>
                      <TrashIcon className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <label htmlFor={fileUploadId}>
            <Button asChild size="sm" variant="ghost" className="gap-1">
              <span>
                <PlusCircle className="h-3.5 w-3.5" />
                Добавить фото
              </span>
            </Button>
          </label>
          <Input
            id={fileUploadId}
            type="file"
            multiple
            onChange={handleAddFiles}
            style={{ display: 'none' }}
          />
        </CardFooter>
      </Card>
    );
  },
);

ReceiptUpload.displayName = 'ReceiptUpload';

export default ReceiptUpload;
