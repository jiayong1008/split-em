import React from 'react';

const AnswerQuestion = () => {
  const faqs = [
    { q: 'How do I get started?', a: 'Click Get Started and follow the steps.' },
    { q: 'Is there a free trial?', a: 'Yes, you can try it free for 30 days.' },
  ];
  return (
    <div className="space-y-4">
      {faqs.map((item, idx) => (
        <div key={idx} className="p-4 rounded-md border">
          <div className="font-medium">{item.q}</div>
          <div className="text-sm opacity-80">{item.a}</div>
        </div>
      ))}
    </div>
  );
};

export default AnswerQuestion;


