import { useEffect, useState } from "react";
import Error from "./error";
import Success from "./success";
import { Input } from "./ui/input";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup, loginWithOAuth } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (error === null && data) {
      setShowSuccess(true);
      fetchUser();
      setTimeout(() => {
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      }, 2000);
    }
  }, [error, data]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <Card className="glass-card border-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold gradient-text">Create Account</CardTitle>
        <CardDescription className="text-gray-400">
          Join Shortify to start managing your links with ease.
        </CardDescription>
        {error && <Error message={error?.message} />}
        {showSuccess && <Success message="Signup Successful! Redirecting..." />}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            name="name"
            type="text"
            placeholder="Full Name"
            className="bg-zinc-900/50 border-zinc-800 focus:ring-zinc-500 text-zinc-100"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            className="bg-zinc-900/50 border-zinc-800 focus:ring-zinc-500 text-zinc-100"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-2">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="bg-zinc-900/50 border-zinc-800 focus:ring-zinc-500 text-zinc-100"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Profile Picture</label>
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            className="bg-zinc-900/50 border-zinc-800 cursor-pointer text-zinc-100 file:bg-zinc-100 file:border-none file:text-zinc-900 file:rounded-md file:px-2 file:py-1 file:mr-4 file:hover:bg-zinc-200"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button
          onClick={handleSignup}
          className="w-full bg-zinc-100 text-zinc-900 hover:bg-white font-bold py-6 rounded-xl transition-all"
        >
          {loading ? (
            <BeatLoader size={10} color="#18181b" />
          ) : (
            "Create Shortify Account"
          )}
        </Button>

        <div className="flex w-full items-center gap-2">
            <span className="h-[1px] flex-1 bg-zinc-800"></span>
            <span className="text-sm text-zinc-500">or</span>
            <span className="h-[1px] flex-1 bg-zinc-800"></span>
        </div>

        <Button
          onClick={() => loginWithOAuth("google")}
          className="w-full bg-zinc-800 border-zinc-700 border text-zinc-100 hover:bg-zinc-700 font-bold py-6 rounded-xl transition-all"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
