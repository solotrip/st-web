export default function selectionFilter({ series, films } = []) {
  return {
    series: [
      {
        title: "🚓 Safety First",
        data: series?.filter((item) => item.genre === "safety-first"),
      },
      {
        title: "🏛️ Cultural",
        data: series?.filter((item) => item.genre === "cultural"),
      },
      {
        title: "🎒 Backpacker",
        data: series?.filter((item) => item.genre === "backpacker"),
      },
      {
        title: "💸 Budget Friendly",
        data: series?.filter((item) => item.genre === "budget-friendly"),
      },
      {
        title: "🏖️ Stress Free",
        data: series?.filter((item) => item.genre === "stress-free"),
      },
    ],
    films: [
      { title: "Drama", data: films?.filter((item) => item.genre === "drama") },
      {
        title: "Thriller",
        data: films?.filter((item) => item.genre === "thriller"),
      },
      {
        title: "Children",
        data: films?.filter((item) => item.genre === "children"),
      },
      {
        title: "Suspense",
        data: films?.filter((item) => item.genre === "suspense"),
      },
      {
        title: "Romance",
        data: films?.filter((item) => item.genre === "romance"),
      },
    ],
  };
}
