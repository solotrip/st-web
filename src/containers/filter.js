import React from "react";
import { Accordion } from "../components";

import faqsData from "../fixtures/faqs.json";
import OptForm from "../components/opt-form";

import "./filter.css";

export function FilterContainer() {
  return (
    <div className="filtersection">
      <Accordion className="accordionsection">
        {faqsData.map((item) => (
          <Accordion.Item key={item.id}>
            <Accordion.Header>{item.header}</Accordion.Header>

            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Item>
        ))}
        <Accordion.Item></Accordion.Item>
      </Accordion>
    </div>
  );
}
