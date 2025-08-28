"use client";

import React from "react";
import { Camera, GalleryVerticalEnd, Loader2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useStore from "@/lib/store";

export default function Home() {
  const { isLoading, setLoading } = useStore();

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const cameraInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      const formData = new FormData();
      files.forEach((f, idx) => {
        formData.append(`file_${idx}`, f);
      });

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            success();
          } else {
            error();
          }
        })
        .then(() => setLoading(false));
    }
  };

  const handlePhotoClick = () => {
    cameraInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files && e.target.files.length > 0) {
      const photos = Array.from(e.target.files);

      const formData = new FormData();
      photos.forEach((photo, idx) => {
        formData.append(`photo_${idx}`, photo);
      });

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            success();
          } else {
            error();
          }
        })
        .then(() => setLoading(false));
    }
  };

  const success = () => {
    toast.success("File/s caricato con successo!");
  };

  const error = () => {
    toast.error(
      "Errore nel caricamento. Se l'errore persiste è presente un problema con il server."
    );
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {isLoading && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
          <Loader2 className="animate-spin size-30 text-neutral-300" />
        </div>
      )}
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="#"
          className="flex items-center gap-2 self-center font-medium text-2xl"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Falco Srl.
        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Quick Send</CardTitle>
              <CardDescription>
                Manda file velocemente al server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full h-32 items-center justify-center-safe"
                    onClick={handleUploadClick}
                  >
                    <Plus className="size-8" /> UPLOAD
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUploadChange}
                    multiple
                    hidden
                  />
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Oppure
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-32 items-center justify-center-safe"
                  onClick={handlePhotoClick}
                >
                  <Camera className="size-8" /> PHOTO
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  multiple
                  hidden
                  ref={cameraInputRef}
                  onChange={handlePhotoChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                All rights reserved © 2025
              </p>
            </CardFooter>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4">
            I file verranno salvati nella cartella{" "}
            <strong>\\NAS\QUICKSEND</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
