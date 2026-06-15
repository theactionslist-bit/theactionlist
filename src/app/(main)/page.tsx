"use client";

import {
  useState,
  useEffect,
  useRef,
  useRouter,
  useSearchParams,
  Suspense,
  useFormikContext,
  Formik,
  Form,
  Button,
  BannerImage,
  ShuffleVector,
  BannerSection,
  FormikControl,
  ActionListCard,
  Pagination,
  HOME_BANNER_HEADING,
  HOME_BANNER_STRIKETHROUGH_WORD,
  HOME_SELECTOR_FIELDS,
  HOME_INITIAL_VALUES,
  HOME_ITEMS_PER_PAGE,
  fetchAllCards,
  fetchFilters,
  shuffleArray,
} from "./import";
import type { CardRow, FiltersData } from "./import";

type FilterValues = typeof HOME_INITIAL_VALUES;

function FilterObserver({
  onFilterChange,
  initAuthorId,
  initAreaId,
  initFrequencyId,
}: {
  onFilterChange: (v: FilterValues) => void;
  initAuthorId?: string;
  initAreaId?: string;
  initFrequencyId?: string;
}) {
  const { values, setFieldValue } = useFormikContext<FilterValues>();
  const initAuthorAppliedRef = useRef(false);
  const initAreaAppliedRef = useRef(false);
  const initFrequencyAppliedRef = useRef(false);

  useEffect(() => {
    if (initAuthorId && !initAuthorAppliedRef.current) {
      initAuthorAppliedRef.current = true;
      setFieldValue("authors", initAuthorId);
    }
  }, [initAuthorId, setFieldValue]);

  useEffect(() => {
    if (initAreaId && !initAreaAppliedRef.current) {
      initAreaAppliedRef.current = true;
      setFieldValue("areas", initAreaId);
    }
  }, [initAreaId, setFieldValue]);

  useEffect(() => {
    if (initFrequencyId && !initFrequencyAppliedRef.current) {
      initFrequencyAppliedRef.current = true;
      setFieldValue("frequencies", initFrequencyId);
    }
  }, [initFrequencyId, setFieldValue]);

  useEffect(() => {
    onFilterChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.areas, values.authors, values.frequencies]);
  return null;
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authorNameParam = searchParams.get("author_name");
  const areaNameParam = searchParams.get("area_of_inspiration");
  const frequencyNameParam = searchParams.get("best_time_to_try");
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState<CardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersData, setFiltersData] = useState<FiltersData>({
    areas: [],
    authors: [],
    frequencies: [],
  });
  const [filters, setFilters] = useState<FilterValues>(HOME_INITIAL_VALUES);
  const [initAuthorId, setInitAuthorId] = useState<string | undefined>(undefined);
  const [urlAuthorApplied, setUrlAuthorApplied] = useState(false);
  const initResolvedRef = useRef(false);
  const [initAreaId, setInitAreaId] = useState<string | undefined>(undefined);
  const [urlAreaApplied, setUrlAreaApplied] = useState(false);
  const areaInitResolvedRef = useRef(false);
  const [initFrequencyId, setInitFrequencyId] = useState<string | undefined>(undefined);
  const [urlFrequencyApplied, setUrlFrequencyApplied] = useState(false);
  const frequencyInitResolvedRef = useRef(false);

  useEffect(() => {
    const aIds = filters.areas ? [filters.areas] : undefined;
    const auIds = filters.authors ? [filters.authors] : undefined;
    const fIds = filters.frequencies ? [filters.frequencies] : undefined;
    fetchFilters(aIds, auIds, fIds).then(setFiltersData);
  }, [filters]);

  useEffect(() => {
    if (!authorNameParam || initResolvedRef.current || !filtersData.authors.length) return;
    initResolvedRef.current = true;
    const match = filtersData.authors.find(
      (opt) => opt.label.toLowerCase() === authorNameParam.toLowerCase(),
    );
    if (match) setInitAuthorId(match.value);
  }, [filtersData.authors, authorNameParam]);

  // Mark URL param as applied only after filters.authors is actually set to the resolved ID
  useEffect(() => {
    if (initAuthorId && filters.authors === initAuthorId && !urlAuthorApplied) {
      setUrlAuthorApplied(true);
    }
  }, [filters.authors, initAuthorId, urlAuthorApplied]);

  // Once applied, clear URL param when the user removes the author filter
  useEffect(() => {
    if (!urlAuthorApplied || filters.authors !== "") return;
    setUrlAuthorApplied(false);
    router.replace("/", { scroll: false });
  }, [filters.authors, urlAuthorApplied, router]);

  useEffect(() => {
    if (!areaNameParam || areaInitResolvedRef.current || !filtersData.areas.length) return;
    areaInitResolvedRef.current = true;
    const match = filtersData.areas.find(
      (opt) => opt.label.toLowerCase() === areaNameParam.toLowerCase(),
    );
    if (match) setInitAreaId(match.value);
  }, [filtersData.areas, areaNameParam]);

  useEffect(() => {
    if (initAreaId && filters.areas === initAreaId && !urlAreaApplied) {
      setUrlAreaApplied(true);
    }
  }, [filters.areas, initAreaId, urlAreaApplied]);

  useEffect(() => {
    if (!urlAreaApplied || filters.areas !== "") return;
    setUrlAreaApplied(false);
    router.replace("/", { scroll: false });
  }, [filters.areas, urlAreaApplied, router]);

  useEffect(() => {
    if (!frequencyNameParam || frequencyInitResolvedRef.current || !filtersData.frequencies.length) return;
    frequencyInitResolvedRef.current = true;
    const match = filtersData.frequencies.find(
      (opt) => opt.label.toLowerCase() === frequencyNameParam.toLowerCase(),
    );
    if (match) setInitFrequencyId(match.value);
  }, [filtersData.frequencies, frequencyNameParam]);

  useEffect(() => {
    if (initFrequencyId && filters.frequencies === initFrequencyId && !urlFrequencyApplied) {
      setUrlFrequencyApplied(true);
    }
  }, [filters.frequencies, initFrequencyId, urlFrequencyApplied]);

  useEffect(() => {
    if (!urlFrequencyApplied || filters.frequencies !== "") return;
    setUrlFrequencyApplied(false);
    router.replace("/", { scroll: false });
  }, [filters.frequencies, urlFrequencyApplied, router]);

  useEffect(() => {
    let ignored = false;
    setLoading(true);
    const aIds = filters.areas ? [filters.areas] : undefined;
    const auIds = filters.authors ? [filters.authors] : undefined;
    const fIds = filters.frequencies ? [filters.frequencies] : undefined;
    fetchAllCards(aIds, auIds, fIds).then(({ data, error }) => {
      if (!ignored) {
        if (!error && data) setAllCards(data as CardRow[]);
        setLoading(false);
      }
    });
    return () => { ignored = true; };
  }, [filters]);

  const displayedCards = allCards.slice(
    (currentPage - 1) * HOME_ITEMS_PER_PAGE,
    currentPage * HOME_ITEMS_PER_PAGE,
  );

  function handleShuffle() {
    setAllCards(shuffleArray(allCards));
  }

  return (
    <>
      <BannerSection
        heading={HOME_BANNER_HEADING}
        image={BannerImage}
        strikethroughWord={HOME_BANNER_STRIKETHROUGH_WORD}
      />
      <section className="sticky top-(--header-height) z-10 bg-white px-5 pt-10 pb-3.75 md:px-10 lg:px-15">
        <Formik initialValues={HOME_INITIAL_VALUES} onSubmit={() => {}}>
          <>
            <FilterObserver
              onFilterChange={(v) => {
                setFilters(v);
                setCurrentPage(1);
              }}
              initAuthorId={initAuthorId}
              initAreaId={initAreaId}
              initFrequencyId={initFrequencyId}
            />
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

      <div className="flex justify-end items-center px-5 md:px-10 lg:px-15">
        <Button
          variant="primary"
          className="py-1.5"
          leftIcon={<ShuffleVector />}
          onClick={handleShuffle}
        >
          Shuffle
        </Button>
      </div>
      <div className="px-5 pb-10 md:px-10 lg:px-15">
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
            {displayedCards.map((card) => (
              <ActionListCard
                key={card.id}
                actionId={card.id}
                slug={card.slug}
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
            totalItems={allCards.length}
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

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
