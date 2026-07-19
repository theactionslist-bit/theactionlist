"use client";

import {
  Formik,
  Form,
  Image,
  useRouter,
  Button,
  FormikControl,
  AdminHeader,
  ADMIN_LOGIN_HEADING,
  ADMIN_LOGIN_DESCRIPTION,
  ADMIN_LOGIN_BUTTON_TEXT,
  ADMIN_LOGIN_SUBMITTING_TEXT,
  ADMIN_LOGIN_INITIAL_VALUES,
  ADMIN_LOGIN_FIELDS,
  ADMIN_LOGIN_VALIDATION_SCHEMA,
  ADMIN_LOGIN_ERROR_CLASS,
  handleAdminLoginSubmit,
} from "./import";
import type { FormikHelpers } from "./import";

interface AdminLoginValues {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();

  function handleSubmit(
    values: AdminLoginValues,
    helpers: FormikHelpers<AdminLoginValues>,
  ) {
    handleAdminLoginSubmit(values, helpers, router);
  }

  return (
    <div className="h-screen flex flex-col">
      <AdminHeader />
      <div
        className="flex-1 flex items-center justify-center bg-linear-to-b from-white via-white to-[#D89593]/20 px-4"
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        <div className="w-full max-w-md rounded-2xl border border-[#DBDBDB] bg-white p-8 shadow-sm sm:p-10">
          <h1 className="font-display text-3xl font-normal text-[#101010]">
            {ADMIN_LOGIN_HEADING}
          </h1>
          <p className="mt-2 font-sans text-sm text-[#10101099]">
            {ADMIN_LOGIN_DESCRIPTION}
          </p>

          <Formik
            initialValues={ADMIN_LOGIN_INITIAL_VALUES}
            validationSchema={ADMIN_LOGIN_VALIDATION_SCHEMA}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form noValidate className="mt-8 flex flex-col gap-5">
                {ADMIN_LOGIN_FIELDS.map((field) => (
                  <FormikControl
                    key={field.name}
                    control={field.control}
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    autoComplete={field.autoComplete}
                  />
                ))}

                {status && <p className={ADMIN_LOGIN_ERROR_CLASS}>{status}</p>}

                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  className="w-full mt-2"
                >
                  {isSubmitting
                    ? ADMIN_LOGIN_SUBMITTING_TEXT
                    : ADMIN_LOGIN_BUTTON_TEXT}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
