'use client'

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
      <section className="bg-white">
        <div className="container max-w-6xl space-y-6 border-x-2 border-dashed mx-auto py-[50px] flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold">سوالات متداول</h2>
          <Accordion type="single" className="w-full md:w-3/4 mx-auto">
            {siteConfig.faq.map((question) => (
              <AccordionItem dir="rtl" value={question.question}>
                <AccordionTrigger className="text-lg font-semibold">{question.question}</AccordionTrigger>
                <AccordionContent className="text-lg">{question.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}

export default FAQSection
