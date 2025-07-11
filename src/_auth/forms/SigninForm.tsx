import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
// import { createUserAccount } from "@/lib/appwrite/api";
import { useSignInAccount } from "@/lib/react-query/queries-and-mutations";
import { useUserContext } from "@/context/AuthContext";

// const SignInForm = () => {
//   const [inputype, setInputType] = useState("password");
//   const { toast } = useToast();
//   const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
//   const navigate = useNavigate();

//   // const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
//   //   useCreateUserAccount();

//   const { mutateAsync: signInAccount } = useSignInAccount();

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof SignInValidation>>({
//     resolver: zodResolver(SignInValidation),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof SignInValidation>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.

//     const session = await signInAccount({
//       email: values.email,
//       password: values.password,
//     });

//     if (!session) {
//       return toast({ title: "Sign in Failed.Please try again" });
//     }

//     const isLoggedIn = await checkAuthUser();
//     if (isLoggedIn) {
//       form.reset();
//       navigate("/");
//     } else {
//       return toast({ title: "signup failed.Please try again" });
//     }
//   }

//   return (
//     <Form {...form}>
//       <div className="sm:w-420 flex-center flex-col">
//         <img src="/assets/images/logo.svg" alt="logo" />

//         <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
//           Log in to your account.
//         </h2>

//         <p className="text-light-3 small-medium md:base-regular mt-12">
//           Welcome back, Please Enter your details.
//         </p>

//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="flex flex-col gap-5 w-full mt-4"
//         >
//           {/* email secction */}

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" className="shad-input" {...field} />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* password sectioin  */}

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>password</FormLabel>
//                 <FormControl>
//                   <Input type={inputype} className="shad-input" {...field} />
//                 </FormControl>
//                 <span onClick={() => setInputType("text")}>show</span>
//                 {/* <FormDescription>
//                   This is your public display name.
//                 </FormDescription> */}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="shad-button_primary">
//             {isUserLoading ? (
//               <div className="flex-center gap-2">
//                 {" "}
//                 <Loader />
//                 loading...
//               </div>
//             ) : (
//               "Sign in"
//             )}
//           </Button>

//           <p className="text-small-regular text-light-2 text-center mt-2 ">
//             Don't have an account? <span>.</span>
//             <Link
//               to="/sign-up"
//               className="text-primary-500 text-small-semibold ml-1 underline"
//             >
//               Sign up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </Form>
//   );
// };
////////////////////////////////////////////////////////////////////

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SignInValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
      toast({ title: "Login failed. Please try again." });

      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Login failed. Please try again." });

      return;
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Button type="submit" className="shad-button_primary">
            {isLoading || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button> */}

          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                {" "}
                <Loader />
                loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
