import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "@/lib/react-query/queries-and-mutations";

type PostFormProps = {
  post?: Models.Document;
};

const PostForm = ({ post }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.location : "",
      file: [],
      location: post ? post?.caption : "",
      tags: post ? post.tag.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newPost = await createPost({ ...values, userId: user.id });

    if (!newPost) {
      toast({
        title: "Please try again",
      });
    }

    navigate("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-full max-w-fxl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar rounded-3xl"
                  {...field}
                />
              </FormControl>

              {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
              <FormMessage className="shad-form_messsage" />
            </FormItem>
          )}
        />

        {/*//////////////////// file form field 2 /////////////////////////////////////////*/}

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_messsage" />
            </FormItem>
          )}
        />

        {/*//////////////////// Location form field 3 /////////////////////////////////////////*/}

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input rounded-[5px]"
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_messsage" />
            </FormItem>
          )}
        />

        {/*//////////////////// Tags form field 3 /////////////////////////////////////////*/}

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (seperated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input rounded-[5px]"
                  placeholder=" Art, Expression,  Learn "
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_messsage" />
            </FormItem>
          )}
        />

        {/* /////////////////////// Button/////////////////////////////////// */}

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            // disabled={isLoadingCreate || isLoadingUpdate}
          >
            {/* {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post */}
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
