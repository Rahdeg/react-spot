"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn, fileToBase64, generateId } from "@/lib/utils";

import { postSchema } from "@/lib/schemas";
import useAppStore from "@/store/use-store";
import useModalStore from "@/hooks/use-modals";
import { DottedSeparator } from "../dotted-seperator";
import { toast } from "sonner";

export const CreatePostForm = ({ onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { closeModal } = useModalStore();

  const { addGalleryItem } = useAppStore();

  const inputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      image: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    let image;

    if (values.image instanceof File) {
      const base64Image = await fileToBase64(values.image);
      image = base64Image;
    }

    const finalValues = {
      ...values,
      image: image ?? "",
      id: generateId(),
      liked: false,
    };

    if (finalValues.image === "") {
      setIsLoading(false);
      return toast.error("Please upload an image.");
    }

    addGalleryItem(finalValues);
    setIsLoading(false);
    closeModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <Card className=" w-full h-full border-none shadow-none">
      <CardHeader className=" flex p-7">
        <CardTitle className=" text-xl font-bold">Create a new Post</CardTitle>
      </CardHeader>
      <div className=" px-7">
        <DottedSeparator />
      </div>
      <CardContent className=" p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="text"
                        placeholder="Enter title of the post"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DottedSeparator className="py-4" />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className=" flex flex-col gap-y-2">
                    <div className=" flex items-center gap-x-5">
                      {field.value ? (
                        <div className=" size-[72px] relative rouded-md overflow-hidden">
                          <Image
                            fill
                            className=" object-cover"
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="logo"
                          />
                        </div>
                      ) : (
                        <Avatar className=" size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className=" size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className=" flex flex-col">
                        <p className=" text-sm">Image</p>
                        <p className=" text-sm text-muted-foreground">
                          JPG,PNG,SVG or JPEG, max 1mb
                        </p>
                        <input
                          className="hidden"
                          accept=".jpeg, .png, .jpg, .svg"
                          type="file"
                          ref={inputRef}
                          title="image"
                          disabled={isLoading}
                          onChange={handleImageChange}
                        />
                        {field.value ? (
                          <Button
                            type="button"
                            disabled={isLoading}
                            variant="destructive"
                            size="sm"
                            className="w-fit mt-2"
                            onClick={() => {
                              field.onChange("");
                              if (inputRef.current) {
                                inputRef.current.value = "";
                              }
                            }}
                          >
                            Remove Image
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            disabled={isLoading}
                            variant="default"
                            size="sm"
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
                        )}
                        <FormMessage />
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>

            <DottedSeparator className="py-7" />
            <div className=" flex items-center justify-between">
              <Button
                className={cn(!onCancel && "invisible")}
                onClick={onCancel}
                disabled={isLoading}
                size="lg"
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button disabled={isLoading} size="lg" type="submit">
                Add Post
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
