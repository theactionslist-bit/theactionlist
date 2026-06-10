"use client";

import {
  useState,
  Link,
  Image,
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
  passwordEye,
  passwordHideEye,
  FormikHelpers,
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
  PROFILE_MOCK_NAME,
  PROFILE_MOCK_EMAIL,
  PROFILE_MOCK_PASSWORD_DISPLAY,
  PROFILE_NEW_PASSWORD_PLACEHOLDER,
  PROFILE_CONFIRM_PASSWORD_PLACEHOLDER,
  PROFILE_SHOW_PASSWORD_ARIA,
  PROFILE_HIDE_PASSWORD_ARIA,
  PROFILE_EYE_SIZE,
  PROFILE_INITIAL_VALUES,
  PROFILE_VALIDATION_SCHEMA,
} from "./import";

const BACK_BUTTON_CLASS =
  "inline-flex items-center px-4 py-2 border-2 border-[#999999] rounded-full font-sans text-lg font-medium text-[#999999] hover:bg-gray-50 transition-colors";

// Label column: fixed width only from sm breakpoint upward
const LABEL_COL_CLASS = "flex items-center gap-3 sm:w-52 sm:shrink-0";

interface ProfileValues {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(
    _values: ProfileValues,
    { setSubmitting }: FormikHelpers<ProfileValues>,
  ) {
    setSubmitting(false);
    setIsEditing(false);
  }

  return (
    <div className="px-4 py-6 md:px-8 lg:px-15">
      {/* Back — only visible in edit mode */}
      {isEditing && (
        <Link href="/" className={BACK_BUTTON_CLASS}>
          {PROFILE_BACK_TEXT}
        </Link>
      )}

      {/* Header */}
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

      {/* Card — view mode */}
      {!isEditing && (
        <>
          <div className="border border-[#DBDBDB] rounded-2xl">
            <div className="p-4 sm:p-7 lg:p-10">
              {/* Name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pb-7.5">
                <div className={LABEL_COL_CLASS}>
                  <ProfileNameIcon />
                  <span className="font-sans text-lg text-[#101010]">
                    {PROFILE_NAME_LABEL}
                  </span>
                </div>
                <span className="font-sans text-lg font-semibold text-[#101010] break-all">
                  {PROFILE_MOCK_NAME}
                </span>
              </div>

              <hr className="border-[#DBDBDB]" />

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-7.5">
                <div className={LABEL_COL_CLASS}>
                  <ProfileEmailIcon />
                  <span className="font-sans text-lg text-[#101010]">
                    {PROFILE_EMAIL_LABEL}
                  </span>
                </div>
                <span className="font-sans text-lg font-semibold text-[#101010] break-all min-w-0">
                  {PROFILE_MOCK_EMAIL}
                </span>
              </div>

              <hr className="border-[#DBDBDB]" />

              {/* Password */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-7.5">
                <div className={LABEL_COL_CLASS}>
                  <ProfilePasswordIcon />
                  <span className="font-sans text-lg text-[#101010]">
                    {PROFILE_PASSWORD_LABEL}
                  </span>
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-sans text-lg font-semibold text-[#101010] tracking-widest overflow-hidden">
                    {showPassword
                      ? "MyPassword123"
                      : PROFILE_MOCK_PASSWORD_DISPLAY}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword
                        ? PROFILE_HIDE_PASSWORD_ARIA
                        : PROFILE_SHOW_PASSWORD_ARIA
                    }
                    className="shrink-0 flex items-center justify-center hover:opacity-75 transition-opacity"
                  >
                    <Image
                      src={showPassword ? passwordHideEye : passwordEye}
                      alt={
                        showPassword
                          ? PROFILE_HIDE_PASSWORD_ARIA
                          : PROFILE_SHOW_PASSWORD_ARIA
                      }
                      width={PROFILE_EYE_SIZE}
                      height={PROFILE_EYE_SIZE}
                      className="pointer-events-none"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-8 sm:mt-12">
            <Button
              variant="secondary"
              className="py-3.5"
              leftIcon={<LogoutIcon />}
            >
              {PROFILE_LOGOUT_TEXT}
            </Button>
          </div>
        </>
      )}

      {/* Card — edit mode */}
      {isEditing && (
        <Formik
          initialValues={PROFILE_INITIAL_VALUES}
          validationSchema={PROFILE_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <div className="border border-[#DBDBDB] rounded-2xl">
                <div className="p-4 sm:p-7 lg:p-10">
                  {/* Name */}
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
                        placeholder={PROFILE_MOCK_NAME}
                        className="text-xl! font-semibold! bg-[#F3F1EF]! placeholder:text-[#747474]!"
                      />
                    </div>
                  </div>

                  <hr className="border-[#DBDBDB]" />

                  {/* Email */}
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
                        placeholder={PROFILE_MOCK_EMAIL}
                        className="text-xl! font-semibold! bg-[#F3F1EF]! placeholder:text-[#747474]!"
                      />
                    </div>
                  </div>

                  <hr className="border-[#DBDBDB]" />

                  {/* Password */}
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

              {/* Action buttons */}
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
