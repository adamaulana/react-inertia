import React from "react";
import { router } from '@inertiajs/react'
import { useState } from "react";
import { styles } from "../styles";
import { Link } from "@inertiajs/react";
import swal from "sweetalert";
const Register = ({ errors, message }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [error] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));

        switch (key) {
            case "name":
                error.name = value === "" ? "Nama tidak boleh kosong" : "";
                break;
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
            case "password_confirmation":
                error.password_confirmation =
                    value === ""
                        ? "Nama tidak boleh kosong"
                        : value.length < 8
                        ? "Password Confrimation minimal 8 karakter"
                        : "";
                break;
        }
    };
    const buttonDisabled = () => {
        if (
            values.name === "" ||
            values.email === "" ||
            values.password === "" ||
            values.password_confirmation === ""
        ) {
            return true;
        } else if (values.password !== values.password_confirmation) {
            return true;
        } else {
            return false;
        }
    };

    // Post Register
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        // console.log(values)
        router.post("/register",formData, {
            onSuccess: () => {
                console.log("upload dan add data sukses");
                swal(
                    "Input Sukses",
                    "Data pengguna berhasil ditambahkan",
                    "success"
                );
            },
            onError: () => {
                console.log("Data error dimasukkan");
            },
        });
    };

    return (
        <React.Fragment>
            <div className="flex h-screen border ">
                <div
                    id="page1"
                    className={`w-4/5 flex items-center order-2 px-20`}
                >
                    <div className="w-full ">
                        <h1 className="mb-3 text-4xl font-bold">Register.</h1>
                        <p className="mb-10 text-gray-500 font-lg">
                            Please Register here
                        </p>
                        <div>{errors?.message}</div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label
                                    className={styles.classNameLabel}
                                    htmlFor="name"
                                >
                                    name
                                </label>
                                <input
                                    type="text"
                                    className={styles.classNameInput}
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Name ...."
                                />
                                {errors.name && (
                                    <div className={styles.classNameAlert}>
                                        {errors.name}
                                    </div>
                                )}
                                <div className={styles.classNameAlert}>
                                    {error.name}
                                </div>
                            </div>
                            <div>
                                <label
                                    className={styles.classNameLabel}
                                    htmlFor="email"
                                >
                                    email
                                </label>
                                <input
                                    type="text"
                                    className={styles.classNameInput}
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Email ...."
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
                                    placeholder="Password ...."
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
                                <label
                                    className={styles.classNameLabel}
                                    htmlFor="password_confirmation"
                                >
                                    password confirmation
                                </label>
                                <input
                                    type="text"
                                    className={styles.classNameInput}
                                    id="password_confirmation"
                                    value={values.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Password Confirmation ...."
                                />
                                {errors.password_confirmation && (
                                    <div className={styles.classNameAlert}>
                                        {errors.password_confirmation}
                                    </div>
                                )}
                                <div className={styles.classNameAlert}>
                                    {error.password_confirmation}
                                </div>
                                <div className={styles.classNameAlert}>
                                    {values.password !==
                                    values.password_confirmation
                                        ? "Password dan Password Confirmation tidak sama"
                                        : ""}
                                </div>
                            </div>
                            <div>
                                <button
                                    disabled={buttonDisabled()}
                                    className={styles.classNameButton(
                                        `${
                                            buttonDisabled()
                                                ? "bg-purple-300"
                                                : "bg-purple-700"
                                        }`
                                    )}
                                    type="submit"
                                >
                                    Register
                                </button>
                            </div>
                            <div className="mt-3 text-center">
                                <Link
                                    href={route("login")}
                                    className="mb-2 font-semibold text-purple-700"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    id="page2"
                    className={`h-full w-full bg-purple-700 order-1`}
                ></div>
            </div>
        </React.Fragment>
    );
};

export default Register;
