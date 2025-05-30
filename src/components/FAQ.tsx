
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQ = () => {
  const faqs = [
    {
      question: "How fast can AccessibilityHub transform my content?",
      answer: "Lightning fast! Most content is transformed in under 3 seconds. Our AI-powered engine processes websites, documents, and videos instantly, so you never have to wait."
    },
    {
      question: "What types of content does it support?",
      answer: "We support virtually everything: websites (any URL), PDFs, Word documents, PowerPoint presentations, videos (YouTube, Vimeo, MP4), and more. If it exists online, we can make it accessible."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely! We follow zero-storage policy - your content is processed in real-time and never stored on our servers. All transformations happen client-side when possible, ensuring maximum privacy."
    },
    {
      question: "What accessibility features are included?",
      answer: "Everything you need: automatic captions, sign language interpretation, high contrast mode, text-to-speech, plain language conversion, keyboard navigation optimization, and WCAG AA/AAA compliance checks."
    },
    {
      question: "Can I integrate this into my existing workflow?",
      answer: "Yes! We offer APIs, browser extensions, and integrations with popular CMS platforms. You can also embed our tools directly into your development pipeline."
    },
    {
      question: "How accurate are the AI-powered features?",
      answer: "Our AI achieves 99.2% accuracy on accessibility transformations, trained on millions of real-world accessibility scenarios. We continuously improve based on user feedback and the latest accessibility standards."
    },
    {
      question: "Is this suitable for enterprise use?",
      answer: "Definitely! We serve Fortune 500 companies with dedicated support, custom integrations, and enterprise-grade security. Contact us for volume pricing and custom solutions."
    },
    {
      question: "How much does it cost?",
      answer: "We offer a generous free tier for individuals and small teams. Pro plans start at $29/month with unlimited transformations. Enterprise solutions are custom-priced based on your needs."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about AccessibilityHub
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-b-0">
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
