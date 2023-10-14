import React from "react";
import { router } from '@inertiajs/react'
import { styles } from "../styles";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import swal from "sweetalert";

const Login = ({ errors, message }) => {
    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [error] = useState({

        email: "",
        password: "",

    });
    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        switch (key) {

            case "email":
                error.email =
                    value === ""
                        ? "email tidak boleh kosong"
                        : regExp.test(value)
                        ? ""
                        : "Format email invalid";
                break;
            case "password":
                error.password =
                    value === ""
                        ? "Nama tidak boleh kosong"
                        : value.length < 8
                        ? "Password minimal 8 karakter"
                        : "";
                break;

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        // console.log(values)
        router.post("/login",formData, {
            onSuccess: () => {
                console.log("Login Sukses");
                swal(
                    "Login Sukses",
                    "Data pengguna berhasil ditambahkan",
                    "success"
                );
            },
            onError: () => {
                console.log("Data error dimasukkan");
            },
        });
    };

    const buttonDisabled = () => {

        if (
            values.name === "" ||
            regExp.test(values.email) === false ||


            values.password === "" ||
            values.password.length < 8

        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <React.Fragment>
            <div className="flex h-screen border ">
                <div id="page1" className={`w-4/5 flex items-center order-1 px-20`}>
                    <div className="w-full ">
                        <h1 className="mb-3 text-4xl font-bold">Log In.</h1>
                        <p className="mb-10 text-gray-500 font-lg">Log in with your data that entered during <br/>your registration</p>
                        <div>{errors?.message}</div>
                        <form onSubmit={handleSubmit}>
                        <div>
                        <label className={styles.classNameLabel} htmlFor="email">
                            email
                        </label>
                        <input
                            type="text"
                            className={styles.classNameInput}
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="example@example.com"
                        />
                        {errors.email && (
                            <div className={styles.classNameAlert}>
                                {errors.email}
                            </div>
                        )}
                        <div className={styles.classNameAlert}>
                            {error.email}
                        </div>
                    </div>
                    <div>
                        <label
                            className={styles.classNameLabel}
                            htmlFor="password"
                        >
                            password
                        </label>
                        <input
                            type="text"
                            className={styles.classNameInput}
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="At Lease 8 Characters ...."
                        />
                        {errors.password && (
                            <div className={styles.classNameAlert}>
                                {errors.password}
                            </div>
                        )}
                        <div className={styles.classNameAlert}>
                            {error.password}
                        </div>
                    </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={buttonDisabled()}
                                    className={styles.classNameButton(
                                        `${
                                            buttonDisabled()
                                                ? "bg-purple-300"
                                                : "bg-purple-700"
                                        }`
                                    )}

                                >
                                    Login
                                </button>
                            </div>
                            <div className="mt-3 text-center">
                            <p className="mb-2 font-semibold">  Dont't have an account?<Link href={route('register')}  className="text-purple-700"> Sign Up</Link></p>
                            <Link><p className="mb-2 font-semibold text-purple-700">Forgot Password?</p></Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="page2" className={`h-full w-full bg-purple-700 order-2`}>


                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
