"use client";

import {
  useState,
  Formik,
  Form,
  BannerImage,
  BannerSection,
  FormikControl,
  ActionListCard,
  Pagination,
  HOME_BANNER_HEADING,
  HOME_BANNER_STRIKETHROUGH_WORD,
  HOME_SELECTOR_FIELDS,
  HOME_INITIAL_VALUES,
  HOME_SAMPLE_CARDS,
  HOME_ITEMS_PER_PAGE,
} from "./import";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * HOME_ITEMS_PER_PAGE;
  const visibleCards = HOME_SAMPLE_CARDS.slice(startIndex, startIndex + HOME_ITEMS_PER_PAGE);

  return (
    <>
      <BannerSection heading={HOME_BANNER_HEADING} image={BannerImage} strikethroughWord={HOME_BANNER_STRIKETHROUGH_WORD} />
      <section className="sticky top-(--header-height) z-10 bg-white px-5 py-10 md:px-10 lg:px-15">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[34px] mt-7.5">
          {visibleCards.map((card) => (
            <ActionListCard key={card.id} {...card} />
          ))}
        </div>

        <div className="mt-10">
          <Pagination
            totalItems={HOME_SAMPLE_CARDS.length}
            itemsPerPage={HOME_ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </>
  );
}
