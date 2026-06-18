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
  fetchCards,
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
  const [authorProcessed, setAuthorProcessed] = useState(false);
  const [initAreaId, setInitAreaId] = useState<string | undefined>(undefined);
  const [urlAreaApplied, setUrlAreaApplied] = useState(false);
  const [areaProcessed, setAreaProcessed] = useState(false);
  const [initFrequencyId, setInitFrequencyId] = useState<string | undefined>(undefined);
  const [urlFrequencyApplied, setUrlFrequencyApplied] = useState(false);
  const [freqProcessed, setFreqProcessed] = useState(false);

  // True once all URL params have been applied to `filters` (or confirmed no match).
  // Prevents fetchAllCards from firing before filters are in their final initial state.
  const hasUrlParams = !!(authorNameParam || areaNameParam || frequencyNameParam);
  const [filtersSettled, setFiltersSettled] = useState(!hasUrlParams);

  useEffect(() => {
    const aIds = filters.areas ? [filters.areas] : undefined;
    const auIds = filters.authors ? [filters.authors] : undefined;
    const fIds = filters.frequencies ? [filters.frequencies] : undefined;
    const timer = setTimeout(() => {
      fetchFilters(aIds, auIds, fIds).then(setFiltersData);
    }, 150);
    return () => clearTimeout(timer);
  }, [filters]);

  useEffect(() => {
    if (!authorNameParam || authorProcessed || !filtersData.authors.length) return;
    setAuthorProcessed(true);
    const match = filtersData.authors.find(
      (opt) => opt.label.toLowerCase() === authorNameParam.toLowerCase(),
    );
    if (match) setInitAuthorId(match.value);
  }, [filtersData.authors, authorNameParam, authorProcessed]);

  useEffect(() => {
    if (initAuthorId && filters.authors === initAuthorId && !urlAuthorApplied) {
      setUrlAuthorApplied(true);
    }
  }, [filters.authors, initAuthorId, urlAuthorApplied]);

  useEffect(() => {
    if (!urlAuthorApplied || filters.authors !== "") return;
    setUrlAuthorApplied(false);
    router.replace("/", { scroll: false });
  }, [filters.authors, urlAuthorApplied, router]);

  useEffect(() => {
    if (!areaNameParam || areaProcessed || !filtersData.areas.length) return;
    setAreaProcessed(true);
    const match = filtersData.areas.find(
      (opt) => opt.label.toLowerCase() === areaNameParam.toLowerCase(),
    );
    if (match) setInitAreaId(match.value);
  }, [filtersData.areas, areaNameParam, areaProcessed]);

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
    if (!frequencyNameParam || freqProcessed || !filtersData.frequencies.length) return;
    setFreqProcessed(true);
    const match = filtersData.frequencies.find(
      (opt) => opt.label.toLowerCase() === frequencyNameParam.toLowerCase(),
    );
    if (match) setInitFrequencyId(match.value);
  }, [filtersData.frequencies, frequencyNameParam, freqProcessed]);

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

  // Latch filtersSettled to true once each URL param is either applied or confirmed no match.
  // Once true it never reverts, so user-driven filter changes after init work normally.
  useEffect(() => {
    if (filtersSettled) return;
    const authorOk = !authorNameParam || (authorProcessed && (!initAuthorId || urlAuthorApplied));
    const areaOk = !areaNameParam || (areaProcessed && (!initAreaId || urlAreaApplied));
    const freqOk = !frequencyNameParam || (freqProcessed && (!initFrequencyId || urlFrequencyApplied));
    if (authorOk && areaOk && freqOk) setFiltersSettled(true);
  }, [
    filtersSettled, authorNameParam, areaNameParam, frequencyNameParam,
    authorProcessed, areaProcessed, freqProcessed,
    initAuthorId, initAreaId, initFrequencyId,
    urlAuthorApplied, urlAreaApplied, urlFrequencyApplied,
  ]);

  useEffect(() => {
    if (!filtersSettled) return;
    let ignored = false;
    setLoading(true);
    const aIds = filters.areas ? [filters.areas] : undefined;
    const auIds = filters.authors ? [filters.authors] : undefined;
    const fIds = filters.frequencies ? [filters.frequencies] : undefined;
    const timer = setTimeout(() => {
      fetchCards(currentPage, aIds, auIds, fIds).then(({ data, error }) => {
        if (!ignored) {
          if (!error && data) setAllCards(data as CardRow[]);
          setLoading(false);
        }
      });
    }, 150);
    return () => {
      ignored = true;
      clearTimeout(timer);
    };
  }, [filters, filtersSettled, currentPage]);

  const displayedCards = allCards;

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
          className="py-1.5 cursor-pointer"
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
            totalItems={allCards[0]?.total_count || 0}
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
