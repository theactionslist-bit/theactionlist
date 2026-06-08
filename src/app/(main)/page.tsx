"use client";

import {
  Formik,
  Form,
  BannerImage,
  BannerSection,
  FormikControl,
  ActionListCard,
  HOME_BANNER_HEADING,
  HOME_BANNER_STRIKETHROUGH_WORD,
  HOME_SELECTOR_FIELDS,
  HOME_INITIAL_VALUES,
  HOME_SAMPLE_CARDS,
} from "./import";

export default function Home() {
  return (
    <>
      <BannerSection heading={HOME_BANNER_HEADING} image={BannerImage} strikethroughWord={HOME_BANNER_STRIKETHROUGH_WORD} />
      <section className="px-5 py-10 md:px-10 lg:px-15">
        <Formik initialValues={HOME_INITIAL_VALUES} onSubmit={() => {}}>
          <Form>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              {HOME_SELECTOR_FIELDS.map((field) => (
                <div key={field.name} className="flex-1">
                  <FormikControl
                    control="select"
                    name={field.name}
                    options={field.options}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          </Form>
        </Formik>
      </section>
      <div className="px-5 py-10 md:px-10 lg:px-15">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[34px]">
          {HOME_SAMPLE_CARDS.map((card) => (
            <ActionListCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </>
  );
}
