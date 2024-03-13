import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";

const isAdmin = true;

const AdminLogin = () => {
    const secretKey = useInputValidation("");

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Submit");
    };

    if (isAdmin) return <Navigate to={"/admin/dashboard"} />;

    return (
        <div className="max-w-sm mx-auto flex flex-col items-center justify-center min-h-screen p-2">
            <div className="shadow-xl w-full p-8 rounded-lg">
                <h2 className="text-center text-3xl font-bold mb-6">
                    Admin Login
                </h2>
                <form className="space-y-4" onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="password">Secret Key</label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Enter your secret key"
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        LOGIN
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
