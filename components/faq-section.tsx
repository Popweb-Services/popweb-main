"use client"

import { siteConfig } from "@/config/site"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

interface FAQSectionProps {}

const FAQSection: React.FC<FAQSectionProps> = ({}) => {
  return (
    <>
      <section className="bg-white border-b-2 border-dashed">
        <div className="container max-w-6xl space-y-6 border-x-2 border-dashed mx-auto py-[50px] flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-primarySlate">
            سوالات متداول
          </h2>
          <Accordion type="single" className="w-full md:w-3/4 mx-auto">
            {siteConfig.faq.map((question) => (
              <AccordionItem
                key={question.answer}
                dir="rtl"
                value={question.question}
              >
                <AccordionTrigger className="text-lg text-primarySlate max-md:text-md font-semibold">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg max-md:text-md text-text">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}

export default FAQSection
