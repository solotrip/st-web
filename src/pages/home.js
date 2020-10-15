import React from "react";

import { Feature, OptForm } from "../components";

import { JumbotronContainer } from "../containers/jumbotron";
import { FooterContainer } from "../containers/footer";
import { FaqsContainer } from "../containers/faqs";
import { HeaderContainer } from "../containers/header";

import { BrowseContainer } from "../containers/browse2";
import { useContent } from "../hooks";
import { selectionFilter } from "../utils";

export default function Home() {
  const { series } = useContent("series");
  const { films } = useContent("films");
  const slides = selectionFilter({ series, films });

  return <BrowseContainer slides={slides} />;
}
