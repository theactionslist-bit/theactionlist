export const SUBMIT_ACTIONS_BANNER_HEADING = "Submit an Action";

export const SUBMIT_FORM_SECTION_1 = "What does your action help with?";
export const SUBMIT_FORM_SECTION_2 = "How does it work?";
export const SUBMIT_FORM_SECTION_3 = "Anything else we should know?";

export const SUBMIT_FORM_BUTTON_TEXT = "Submit";
export const SUBMIT_FORM_SUBMITTING_TEXT = "Submitting…";

export const SUBMIT_FORM_INITIAL_VALUES = {
  fullName: "",
  email: "",
  helpsWith: "",
  howItWorks: "",
  anythingElse: "",
};

export const SUBMIT_FORM_TOP_FIELDS = [
  {
    control: "input" as const,
    type: "text",
    name: "fullName",
    label: "",
    placeholder: "Full Name",
    autoComplete: "name",
  },
  {
    control: "input" as const,
    type: "email",
    name: "email",
    label: "",
    placeholder: "Email Address",
    autoComplete: "email",
  },
];

export const SUBMIT_FORM_HELPS_WITH_FIELD = {
  control: "input" as const,
  type: "text",
  name: "helpsWith",
  label: "",
  placeholder: 'eg, "Public speaking nerves"',
  autoComplete: "off",
};

export const SUBMIT_FORM_HOW_IT_WORKS_PLACEHOLDER =
  "Describe the specific behaviour, technique, or method to use. Explain the science/art behind it. Include comparisons or examples.Where did you come across this?";

export const SUBMIT_FORM_ANYTHING_ELSE_PLACEHOLDER =
  "Who should we credit/source? Leave us your social media details, caveats or context.";

export const SUBMIT_AN_ACTION_SEO_TITLE = "Submit an Action";
export const SUBMIT_AN_ACTION_SEO_DESCRIPTION =
  "Know an action that works? Share it with the community.";

export const SUCCESS_MODAL_TITLE = "Thank you for sharing your suggestion!";
export const SUCCESS_MODAL_DESCRIPTION =
  "Your solution might help someone facing the same challenge.";
