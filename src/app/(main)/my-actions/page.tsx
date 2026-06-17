"use client";
import {
  useState,
  useEffect,
  useRouter,
  useFormikContext,
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
  MY_ACTIONS_ITEMS_PER_PAGE,
  fetchFilters,
  fetchAllFavoriteActions,
} from "./import";
import type { FiltersData, CardRow } from "./import";

type FilterValues = typeof MY_ACTIONS_INITIAL_VALUES;

function FilterObserver({ onFilterChange }: { onFilterChange: (v: FilterValues) => void }) {
  const { values } = useFormikContext<FilterValues>();
  useEffect(() => {
    onFilterChange(values);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.areas, values.authors, values.frequencies]);
  return null;
}

const MyActions = () => {
  const router = useRouter();
  const [filtersData, setFiltersData] = useState<FiltersData>({
    areas: [],
    authors: [],
    frequencies: [],
  });
  const [filters, setFilters] = useState<FilterValues>(MY_ACTIONS_INITIAL_VALUES);
  const [allCards, setAllCards] = useState<CardRow[]>([]);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const aIds = filters.areas ? [filters.areas] : undefined;
    const auIds = filters.authors ? [filters.authors] : undefined;
    const fIds = filters.frequencies ? [filters.frequencies] : undefined;
    fetchFilters(aIds, auIds, fIds).then(setFiltersData);
  }, [filters]);

  useEffect(() => {
    setCardsLoading(true);
    fetchAllFavoriteActions().then((data) => {
      setAllCards(data);
      setCardsLoading(false);
    });
  }, [refreshKey]);

  const filteredCards = allCards.filter((card) => {
    if (filters.areas && !card.areas.some((a) => a.id === filters.areas)) return false;
    if (filters.authors && !card.authors.some((a) => a.id === filters.authors)) return false;
    if (filters.frequencies && !card.frequencies.some((f) => f.id === filters.frequencies)) return false;
    return true;
  });

  const totalItems = filteredCards.length;
  const pageStart = (currentPage - 1) * MY_ACTIONS_ITEMS_PER_PAGE;
  const currentPageCards = filteredCards.slice(pageStart, pageStart + MY_ACTIONS_ITEMS_PER_PAGE);

  return (
    <>
      <BannerSection heading={MY_ACTIONS_BANNER_HEADING} image={BannerImage} />

      <section className="sticky top-(--header-height) z-10 bg-white px-5 py-10 md:px-10 lg:px-15">
        <Formik initialValues={MY_ACTIONS_INITIAL_VALUES} onSubmit={() => {}}>
          <>
            <FilterObserver onFilterChange={(v) => {
              setFilters(v);
              setCurrentPage(1);
            }} />
            <Form>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                {MY_ACTIONS_SELECTOR_FIELDS.map((field) => (
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

      <div className="px-5 pb-10 md:px-10 lg:px-15">
        {cardsLoading ? (
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
        ) : currentPageCards.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8.5 mt-7.5">
            {currentPageCards.map((card) => (
              <ActionListCard
                key={card.id}
                actionId={card.id}
                slug={card.slug}
                initialLiked={true}
                onNext={() => router.push(`/actionlist-detail/${card.slug}`)}
                onUnfavorite={() => { setCurrentPage(1); setRefreshKey((k) => k + 1); }}
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
        {totalItems > MY_ACTIONS_ITEMS_PER_PAGE && (
          <div className="mt-10">
            <Pagination
              totalItems={totalItems}
              itemsPerPage={MY_ACTIONS_ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyActions;
