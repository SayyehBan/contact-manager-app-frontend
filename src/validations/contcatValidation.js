import * as Yup from "yup";

export const imageSchema = Yup.mixed()
    .test("fileType", "فایل انتخاب شده باید تصویر باشد", (value) =>
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
    )
    .test("fileSize", "حجم تصویر نباید بیشتر از 1 مگابایت باشد", (value) =>
        value && value.size <= 1024 * 1024
    );

export const contactSchema = Yup.object().shape({
    firstName: Yup.string().required("لطفاً نام را وارد فرمئاید"),
    lastName: Yup.string().required("لطفاً نام خانوادگی را وارد کنید."),
    mobile: Yup.string()
        .matches(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد")
        .required("لطفاً شماره موبایل را وارد کنید"),
    email: Yup.string()
        .email("آدرس ایمیل معتبر نیست.")
        .required("لطفا ایمیل رو وارد کنید."),
    job: Yup.string().required("انتخاب شغل الزامی میباشد."),
    group: Yup.string().required("انتخاب گروه الزامی میباشد."),
});

export const contactInsertSchema = contactSchema.shape({
    image: imageSchema.required("لطفا یک تصویر انتخاب کنید")
});

export const contactUpdateSchema = contactSchema.shape({
    image: imageSchema.nullable()
});