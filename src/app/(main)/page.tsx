"use client";

import {
  useState,
  useEffect,
  useRouter,
  useFormikContext,
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
  HOME_ITEMS_PER_PAGE,
  fetchCards,
  fetchFilters,
} from "./import";
import type { CardRow, FiltersData } from "./import";

type FilterValues = typeof HOME_INITIAL_VALUES;

function FilterObserver({ onFilterChange }: { onFilterChange: (v: FilterValues) => void }) {
  const { values } = useFormikContext<FilterValues>();
  useEffect(() => {
    onFilterChange(values);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.areas, values.authors, values.frequencies]);
  return null;
}

export default function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState<CardRow[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtersData, setFiltersData] = useState<FiltersData>({
    areas: [],
    authors: [],
    frequencies: [],
  });
  const [filters, setFilters] = useState<FilterValues>(HOME_INITIAL_VALUES);

  useEffect(() => {
    const aIds = filters.areas ? [filters.areas] : undefined;
    const auIds = filters.authors ? [filters.authors] : undefined;
    const fIds = filters.frequencies ? [filters.frequencies] : undefined;
    fetchFilters(aIds, auIds, fIds).then(setFiltersData);
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    const aIds = filters.areas ? [filters.areas] : undefined;
    const auIds = filters.authors ? [filters.authors] : undefined;
    const fIds = filters.frequencies ? [filters.frequencies] : undefined;
    fetchCards(currentPage, aIds, auIds, fIds).then(({ data, error }) => {
      if (!error && data) {
        setCards(data as CardRow[]);
        if (data.length > 0) setTotalItems((data[0] as CardRow).total_count);
        else setTotalItems(0);
      }
      setLoading(false);
    });
  }, [currentPage, filters]);

  return (
    <>
      <BannerSection heading={HOME_BANNER_HEADING} image={BannerImage} strikethroughWord={HOME_BANNER_STRIKETHROUGH_WORD} />
      <section className="sticky top-(--header-height) z-10 bg-white px-5 py-10 md:px-10 lg:px-15">
        <Formik initialValues={HOME_INITIAL_VALUES} onSubmit={() => {}}>
          <>
          <FilterObserver onFilterChange={(v) => {
            setFilters(v);
            setCurrentPage(1);
          }} />
          <Form>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              {HOME_SELECTOR_FIELDS.map((field) => (
                <div key={field.name} className="flex-1">
                  <FormikControl
                    control="select"
                    name={field.name}
                    options={filtersData[field.name as keyof FiltersData]}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          </Form>
          </>
        </Formik>
      </section>
      <div className="px-5 py-10 md:px-10 lg:px-15">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <svg
              className="animate-spin w-10 h-10 text-[#D89593]"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Loading"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8.5 mt-7.5">
            {cards.map((card) => (
              <ActionListCard
                key={card.id}
                actionId={card.id}
                initialLiked={card.is_selected}
                onNext={() => router.push(`/actionlist-detail/${card.slug}`)}
                text={card.title}
                avatarColor={card.hex_colour_code}
                frequency={card.frequencies[0]?.name}
                frequencyCount={card.frequencies.length}
                authorName={card.authors[0]?.name}
                category={card.areas[0]?.name}
                categories={card.areas.map((a) => a.name)}
              />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Pagination
            totalItems={totalItems}
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
