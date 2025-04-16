
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  value
}) => {
  return (
    <AccordionItem value={value} className="border-b border-zinc-800">
      <AccordionTrigger className="text-lg font-medium text-left py-6 text-zinc-100">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-zinc-400 pb-6">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
