import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, Camera } from "lucide-react";
import React, { useState, useRef } from "react";
import { useInputValidation, useStrongPassword, useFileHandler } from "6pp";
import { usernameValidator } from "@/utils/validators";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const clickImage = useRef(null);

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useStrongPassword();

    const avatar = useFileHandler("single");

    const handleSignup = (e) => {
        e.preventDefault();
    };
    const handleLogin = (e) => {
        e.preventDefault();
    };

    const toggleLogin = () => setIsLogin((prev) => !prev);
    return (
        <div className="max-w-sm mx-auto flex flex-col items-center justify-center min-h-screen p-2">
            {isLogin ? (
                <div className="shadow-xl w-full p-4 rounded-lg">
                    <h2 className="text-center text-3xl font-semibold mb-8">
                        Login
                    </h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                id="username"
                                placeholder="Enter your name"
                                value={username.value}
                                onChange={username.changeHandler}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password.value}
                                onChange={password.changeHandler}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            LOGIN
                        </Button>
                        <p className="text-center">OR</p>
                        <Button
                            variant="outline"
                            onClick={toggleLogin}
                            className="w-full"
                        >
                            Sign Up Instead
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="shadow-xl w-full p-4 rounded-lg">
                    <h2 className="text-center text-3xl font-semibold mb-8">
                        Sign Up
                    </h2>
                    <form className="space-y-4" onSubmit={handleSignup}>
                        <div className="relative w-32 mx-auto">
                            <Avatar className="w-32 h-32">
                                <AvatarImage
                                    src={avatar.preview}
                                    alt="profile image"
                                    className=" object-cover"
                                />
                                <AvatarFallback>
                                    <UserRound className="size-24 text-gray-300" />
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className="size-9 absolute bottom-0 right-0 rounded-full bg-gray-400 hover:bg-gray-600 flex items-center justify-center"
                                onClick={() => clickImage.current.click()}
                            >
                                <Camera
                                    className="text-white"
                                    htmlFor="profile"
                                />
                                <Input
                                    type="file"
                                    className="hidden"
                                    id="profile"
                                    accept="image/*"
                                    ref={clickImage}
                                    onChange={avatar.changeHandler}
                                    required
                                />
                            </div>
                        </div>
                        {avatar.error && (
                            <p className="text-red-400 text-sm mt-1 text-center">
                                {avatar.error}
                            </p>
                        )}
                        <div>
                            <label htmlFor="name">Name</label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={name.value}
                                onChange={name.changeHandler}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="bio">Bio</label>
                            <Input
                                type="text"
                                id="bio"
                                placeholder="Enter your bio"
                                value={bio.value}
                                onChange={bio.changeHandler}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username.value}
                                onChange={username.changeHandler}
                                required
                            />
                            {username.error && (
                                <p className="text-red-400 text-sm mt-1">
                                    {username.error}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password.value}
                                onChange={password.changeHandler}
                                required
                            />
                            {password.error && (
                                <p className="text-red-400 text-sm mt-1">
                                    {password.error}
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            SIGN UP
                        </Button>
                        <p className="text-center">OR</p>
                        <Button
                            variant="outline"
                            onClick={toggleLogin}
                            className="w-full"
                        >
                            Login Instead
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
