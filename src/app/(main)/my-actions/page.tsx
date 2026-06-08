"use client";
import {
  Image,
  Formik,
  Form,
  FormikControl,
  NosavedImage,
  BannerImage,
  BannerSection,
  ActionListCard,
  MY_ACTIONS_BANNER_HEADING,
  MY_ACTIONS_INITIAL_VALUES,
  MY_ACTIONS_SELECTOR_FIELDS,
  MY_ACTIONS_SAMPLE_CARDS,
} from "./import";
const MyActions = () => {
  return (
    <>
      <BannerSection heading={MY_ACTIONS_BANNER_HEADING} image={BannerImage} />

      <section className="px-5 py-10 md:px-10 lg:px-15">
        <Formik initialValues={MY_ACTIONS_INITIAL_VALUES} onSubmit={() => {}}>
          <Form>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              {MY_ACTIONS_SELECTOR_FIELDS.map((field) => (
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
          {MY_ACTIONS_SAMPLE_CARDS.map((card) => (
            <ActionListCard key={card.id} {...card} />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center my-[120px]">
        <Image
          src={NosavedImage}
          alt="The Action List — get things done"
          width={342}
          height={342}
        />
        <h3 className="font-display text-[40px] font-norml text-[#101010]  mt-[14px] mb-[30px]">
          No saved actions yet
        </h3>
        <p className="text-2xl leading-8 text-[#707070]">
          Collect what resonates with you.
        </p>
      </div>
    </>
  );
};

export default MyActions;
