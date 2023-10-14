import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Helmet } from "react-helmet";
import { ReactLightbox } from "react-lightbox-js";
import "react-lightbox-js/dist/index.css";
import AvatarDef from "../../../public/avatar.webp";
import swal from "sweetalert";

export default function CreateUser({ editUser }) {
    const { errors } = usePage().props
    console.log(errors);
    console.log(editUser);
    const imageRef = React.useRef();
    const [values, setValues] = useState({
        name: editUser ? editUser.name : "",
        email: editUser ? editUser.email : "",
        password: "",
        password_confirmation: "",
    });

    const [image, setImage] = useState(base_url + "/images/" + editUser ?.image || "" );
    const handleUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

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
                error.email = value === "" ? "Email tidak boleh kosong" : "";
                break;

            case "password":
                error.password =
                    value === ""
                        ? "Password tidak boleh kosong"
                        : value.length < 8
                        ? "Password Minimal 8 Karakter"
                        : "";
                break;

            case "password_confirmation":
                error.password_confirmation =
                    value === ""
                        ? "Konfirmasi Password tidak boleh kosong"
                        : value.length < 8
                        ? "Konfirmasi Password Minimal 8 Karakter"
                        : "";
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        formData.append("image", imageRef.current.files[0]);
        // console.log(values)
        router.visit("/user/post", {
            method: "post",
            data: formData,
            onSuccess: () => {
                // console.log("upload dan add data sukses");
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

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        formData.append("id", editUser.id);
        formData.append("image", imageRef.current.files[0]);
        formData.append('_method' , 'PUT');
        // console.log(formData);
        router.visit(route('user.update' , editUser.id), {
            method: "POST",
            data: formData,
            onSuccess: () => {
                // console.log("upload dan add data sukses");
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

    const buttonDisabledUpdate = () => {
        if (values.name === "" || values.email === "") {
            return true;
        } else {
            return false;
        }
    };

    const [error] = React.useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const imgLight = [{ src: image }];
    const [isOpen, setIsOpen] = useState(false);
    const [isFull, setIsFull] = useState(false);

    const showHideModal = () => {
        setIsOpen((preState) => !preState);
    };

    const style = {
        classNameInput:
            "border py-2 w-full px-2 mb-1 bg-gray-200 focus:bg-grey-400",
        classNameLabel: "mb-3 uppercase font-semibold",
        styleError: "text-sm text-red-700 mb-3 font-bold ",
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Input User</title>
            </Helmet>
            <div className="p-10">
                <h1>{editUser ? "Update Data User" : "Create User"}</h1>
                <br />
                <div>
                    <img
                        src={image === "" ? AvatarDef : image}
                        // src={AvatarDef}
                        alt=""
                        className="w-32 h-32 mx-auto overflow-hidden border border-black rounded-full"
                        onClick={showHideModal}
                    />
                    <ReactLightbox
                        images={imgLight}
                        imageSrcKey={"src"}
                        imageAltKey={"src"}
                        onClose={showHideModal}
                        isOpen={isOpen}
                        defaultFullScreen={isFull}
                    />
                </div>
                <br />
                <form
                    method="post"
                    onSubmit={editUser ? handleUpdate : handleSubmit}
                    encType="multipart/form-data"
                >
                    <div>
                        <label htmlFor="name" className={style.classNameLabel}>
                            Nama
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={style.classNameInput}
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className={style.styleError}>{errors.name}</div>}
                        <div className={style.styleError}>{error.name}</div>

                        <label htmlFor="email" className={style.classNameLabel}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={style.classNameInput}
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className={style.styleError}>{errors.email}</div>}
                        <div className={style.styleError}>{error.email}</div>
                        {editUser ? (
                            ""
                        ) : (
                            <div>
                                <label
                                    htmlFor="email"
                                    className={style.classNameLabel}
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className={style.classNameInput}
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <div className={style.styleError}>{errors.password}</div>}
                                <div className={style.styleError}>
                                    {error.password}
                                </div>

                                <label
                                    htmlFor="password_confirmation"
                                    className={style.classNameLabel}
                                >
                                    Password Confirmation
                                </label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    className={style.classNameInput}
                                    value={values.password_confirmation}
                                    onChange={handleChange}
                                />
                                {errors.password_confirmation && <div className={style.styleError}>{errors.password_confirmation}</div>}
                                <div className={style.styleError}>
                                    {error.password_confirmation}
                                </div>
                                <div className={style.styleError}>
                                    {values.password ===
                                    values.password_confirmation
                                        ? ""
                                        : "Konfirmasi Password Harus Sama"}
                                </div>
                            </div>
                        )}
                        <label htmlFor="image" className={style.classNameLabel}>
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className={style.classNameInput}
                            ref={imageRef}
                            onChange={handleUpload}
                        />
                    </div>
                    <div>
                        <button
                            className={`w-full ${
                                (
                                    editUser
                                        ? buttonDisabledUpdate()
                                        : buttonDisabled()
                                )
                                    ? "bg-blue-400"
                                    : "bg-blue-500"
                            } py-3 mt-3 font-semibold text-white uppercase `}
                            type="submit"
                            disabled={
                                editUser
                                    ? buttonDisabledUpdate()
                                    : buttonDisabled()
                            }
                        >
                            {editUser ? 'UPDATE' : 'REGISTER'}
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

CreateUser.layout = (page) => <Layout children={page} />;
// export default CreateUser
