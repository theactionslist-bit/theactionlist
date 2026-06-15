"use client";

import {
  Formik,
  Form,
  useRouter,
  useSearchParams,
  loginCover,
  logoPng,
  Button,
  FormikControl,
  OnboardingLayout,
  Suspense,
  CREATE_PASSWORD_HEADING,
  CREATE_PASSWORD_DESCRIPTION,
  CREATE_PASSWORD_BUTTON_TEXT,
  CREATE_PASSWORD_SUBMITTING_TEXT,
  CREATE_PASSWORD_INITIAL_VALUES,
  CREATE_PASSWORD_FIELDS,
  CREATE_PASSWORD_VALIDATION_SCHEMA,
  CREATE_PASSWORD_ERROR_CLASS,
  handleCreatePasswordSubmit,
} from "./import";
import type { FormikHelpers } from "./import";

interface CreatePasswordValues {
  password: string;
  confirmPassword: string;
}

function CreatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const name = searchParams.get("name") ?? "";

  function handleSubmit(
    values: CreatePasswordValues,
    helpers: FormikHelpers<CreatePasswordValues>
  ) {
    handleCreatePasswordSubmit(values, helpers, email, name, router);
  }

  return (
    <OnboardingLayout
      heading={CREATE_PASSWORD_HEADING}
      description={CREATE_PASSWORD_DESCRIPTION}
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={false}
      showBackButton={false}
    >
      <Formik
        initialValues={CREATE_PASSWORD_INITIAL_VALUES}
        validationSchema={CREATE_PASSWORD_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form noValidate className="flex flex-col gap-6">
            {CREATE_PASSWORD_FIELDS.map((field) => (
              <FormikControl
                key={field.name}
                control={field.control}
                type={field.type}
                label={field.label}
                name={field.name}
                autoComplete={field.autoComplete}
              />
            ))}

            {status && <p className={CREATE_PASSWORD_ERROR_CLASS}>{status}</p>}

            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="w-full h-15 text-lg!"
            >
              {isSubmitting ? CREATE_PASSWORD_SUBMITTING_TEXT : CREATE_PASSWORD_BUTTON_TEXT}
            </Button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

export default function CreatePasswordPage() {
  return (
    <Suspense>
      <CreatePasswordForm />
    </Suspense>
  );
}
