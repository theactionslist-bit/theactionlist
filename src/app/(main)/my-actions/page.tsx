"use client";
import {
  useState,
  Image,
  Formik,
  Form,
  FormikControl,
  NosavedImage,
  BannerImage,
  BannerSection,
  ActionListCard,
  Pagination,
  MY_ACTIONS_BANNER_HEADING,
  MY_ACTIONS_INITIAL_VALUES,
  MY_ACTIONS_SELECTOR_FIELDS,
  MY_ACTIONS_SAMPLE_CARDS,
  MY_ACTIONS_ITEMS_PER_PAGE,
} from "./import";

const MyActions = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * MY_ACTIONS_ITEMS_PER_PAGE;
  const visibleCards = MY_ACTIONS_SAMPLE_CARDS.slice(
    startIndex,
    startIndex + MY_ACTIONS_ITEMS_PER_PAGE
  );

  return (
    <>
      <BannerSection heading={MY_ACTIONS_BANNER_HEADING} image={BannerImage} />

      <section className="sticky top-(--header-height) z-10 bg-white px-5 py-10 md:px-10 lg:px-15">
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

      <div className="px-5 pb-10 md:px-10 lg:px-15">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8.5 mt-7.5">
          {visibleCards.map((card) => (
            <ActionListCard key={card.id} {...card} />
          ))}
        </div>

        <div className="mt-10">
          <Pagination
            totalItems={MY_ACTIONS_SAMPLE_CARDS.length}
            itemsPerPage={MY_ACTIONS_ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {MY_ACTIONS_SAMPLE_CARDS.length === 0 && (
        <div className="flex flex-col justify-center items-center my-30">
          <Image
            src={NosavedImage}
            alt="The Action List — get things done"
            width={342}
            height={342}
          />
          <h3 className="font-display text-2xl md:text-3xl lg:text-[40px] font-normal text-[#101010] mt-3.5 mb-7.5">
            No saved actions yet
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl leading-8 text-[#707070]">
            Collect what resonates with you.
          </p>
        </div>
      )}
    </>
  );
};

export default MyActions;
