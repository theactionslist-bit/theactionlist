"use client";

import {
  useState,
  useEffect,
  useRouter,
  Formik,
  Form,
  Button,
  FormikControl,
  EditIcon,
  ProfileNameIcon,
  ProfileEmailIcon,
  ProfilePasswordIcon,
  CancelIcon,
  LogoutIcon,
  UpdateIcon,
  fetchUser,
  handleProfileUpdate,
  handleLogout,
  PROFILE_PAGE_HEADING,
  PROFILE_PAGE_SUBTITLE,
  EDIT_PAGE_HEADING,
  EDIT_PAGE_SUBTITLE,
  PROFILE_BACK_TEXT,
  PROFILE_EDIT_TEXT,
  PROFILE_LOGOUT_TEXT,
  PROFILE_CANCEL_TEXT,
  PROFILE_UPDATE_TEXT,
  PROFILE_UPDATING_TEXT,
  PROFILE_NAME_LABEL,
  PROFILE_EMAIL_LABEL,
  PROFILE_PASSWORD_LABEL,
  PROFILE_NEW_PASSWORD_PLACEHOLDER,
  PROFILE_CONFIRM_PASSWORD_PLACEHOLDER,
  PROFILE_ERROR_CLASS,
  PROFILE_VALIDATION_SCHEMA,
} from "./import";
import type { FormikHelpers, User } from "./import";

const BACK_BUTTON_CLASS =
  "inline-flex items-center px-4 py-2 border-2 border-[#999999] rounded-full font-sans text-lg font-medium text-[#999999] hover:bg-gray-50 transition-colors";

const LABEL_COL_CLASS = "flex items-center gap-3 sm:w-52 sm:shrink-0";

interface ProfileValues {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export default function MyProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  function handleSubmit(
    values: ProfileValues,
    helpers: FormikHelpers<ProfileValues>
  ) {
    handleProfileUpdate(values, helpers, setUser, () => setIsEditing(false));
  }

  if (loading) return null;

  return (
    <div className="px-4 py-6 md:px-8 lg:px-15">
      {isEditing && (
        <button
          type="button"
          className={BACK_BUTTON_CLASS}
          onClick={() => setIsEditing(false)}
        >
          {PROFILE_BACK_TEXT}
        </button>
      )}

      <div className="flex items-start justify-between mt-8 mb-8 gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl sm:text-4xl text-[#101010]">
            {isEditing ? EDIT_PAGE_HEADING : PROFILE_PAGE_HEADING}
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#10101099] mt-1">
            {isEditing ? EDIT_PAGE_SUBTITLE : PROFILE_PAGE_SUBTITLE}
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="secondary"
            leftIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            className="py-3.5 shrink-0"
          >
            {PROFILE_EDIT_TEXT}
          </Button>
        )}
      </div>

      {!isEditing && (
        <>
          <div className="border border-[#DBDBDB] rounded-2xl">
            <div className="p-4 sm:p-7 lg:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pb-7.5">
                <div className={LABEL_COL_CLASS}>
                  <ProfileNameIcon />
                  <span className="font-sans text-lg text-[#101010]">
                    {PROFILE_NAME_LABEL}
                  </span>
                </div>
                <span className="font-sans text-lg font-semibold text-[#101010] break-all">
                  {user?.user_metadata?.name ?? "—"}
                </span>
              </div>

              <hr className="border-[#DBDBDB]" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-7.5">
                <div className={LABEL_COL_CLASS}>
                  <ProfileEmailIcon />
                  <span className="font-sans text-lg text-[#101010]">
                    {PROFILE_EMAIL_LABEL}
                  </span>
                </div>
                <span className="font-sans text-lg font-semibold text-[#101010] break-all min-w-0">
                  {user?.email ?? "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <Button
              variant="secondary"
              className="py-3.5"
              leftIcon={<LogoutIcon />}
              onClick={() => handleLogout(router)}
            >
              {PROFILE_LOGOUT_TEXT}
            </Button>
          </div>
        </>
      )}

      {isEditing && (
        <Formik
          initialValues={{
            name: user?.user_metadata?.name ?? "",
            email: user?.email ?? "",
            newPassword: "",
            confirmPassword: "",
          }}
          enableReinitialize
          validationSchema={PROFILE_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form noValidate>
              <div className="border border-[#DBDBDB] rounded-2xl">
                <div className="p-4 sm:p-7 lg:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 pb-7.5">
                    <div className={`${LABEL_COL_CLASS} sm:pt-4`}>
                      <ProfileNameIcon />
                      <span className="font-sans text-lg text-[#101010]">
                        {PROFILE_NAME_LABEL}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <FormikControl
                        control="input"
                        name="name"
                        label=""
                        type="text"
                        placeholder={PROFILE_NAME_LABEL}
                        className="text-xl! font-semibold! bg-[#F3F1EF]! placeholder:text-[#747474]!"
                      />
                    </div>
                  </div>

                  <hr className="border-[#DBDBDB]" />

                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 py-7.5">
                    <div className={`${LABEL_COL_CLASS} sm:pt-4`}>
                      <ProfileEmailIcon />
                      <span className="font-sans text-lg text-[#101010]">
                        {PROFILE_EMAIL_LABEL}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <FormikControl
                        control="input"
                        name="email"
                        label=""
                        type="email"
                        placeholder={PROFILE_EMAIL_LABEL}
                        disabled
                        className="text-xl! font-semibold! bg-[#F3F1EF]! placeholder:text-[#747474]! cursor-not-allowed! opacity-60!"
                      />
                    </div>
                  </div>

                  <hr className="border-[#DBDBDB]" />

                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 pt-7.5">
                    <div className={`${LABEL_COL_CLASS} sm:pt-4`}>
                      <ProfilePasswordIcon />
                      <span className="font-sans text-lg text-[#101010]">
                        {PROFILE_PASSWORD_LABEL}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
                      <FormikControl
                        control="input"
                        name="newPassword"
                        label=""
                        type="password"
                        placeholder={PROFILE_NEW_PASSWORD_PLACEHOLDER}
                        className="text-xl! font-semibold! bg-[#F3F1EF]! placeholder:text-[#747474]!"
                      />
                      <FormikControl
                        control="input"
                        name="confirmPassword"
                        label=""
                        type="password"
                        placeholder={PROFILE_CONFIRM_PASSWORD_PLACEHOLDER}
                        className="text-xl! font-semibold! bg-[#F3F1EF]! placeholder:text-[#747474]!"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {status && <p className={PROFILE_ERROR_CLASS}>{status}</p>}

              <div className="flex justify-end gap-3 sm:gap-4 mt-8">
                <Button
                  variant="secondary"
                  type="button"
                  leftIcon={<CancelIcon />}
                  onClick={() => setIsEditing(false)}
                  className="py-3.5"
                >
                  {PROFILE_CANCEL_TEXT}
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  loading={isSubmitting}
                  leftIcon={!isSubmitting ? <UpdateIcon /> : undefined}
                  className="py-3.5"
                >
                  {isSubmitting ? PROFILE_UPDATING_TEXT : PROFILE_UPDATE_TEXT}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
