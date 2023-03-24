import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const MarkdownPreview = () => {
  const [inText, setInText] = useState('');
  // const [outText, setOutText] = useState('');

  // const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   const text_ = e.target.value;
  //   setInText(text_);

  //   const hashRegex = /^\s{0,3}(#{1,6}) /;

  //   const out = text_
  //     .split('\n')
  //     .map((line) => {
  //       // # header
  //       if (hashRegex.test(line)) {
  //         const level = hashRegex.exec(line)?.[1].length || 0;
  //         line = `<h${level} class="font-bold text-${
  //           7 - level
  //         }xl"> ${line.replace(hashRegex, '')} </h${level}>`;
  //       }

  //       // **italic** & *bold*
  //       line = line.replace(/\*\*(.*?)\*\*|\*(.*?)\*/g, (match, p1, p2) =>
  //         p1 !== undefined ? `<strong>${p1}</strong>` : `<em>${p2}</em>`
  //       );

  //       // --- hr
  //       const hrRegex = /^\s{0,3}(-{3,})/;
  //       line = line.replace(hrRegex, '<hr />');

  //       // > blockquote
  //       // const quoteRegex = /^>+\s{0,3}/;
  //       // const quoteRegex = /^>+[\s]*/;
  //       // const quoteRegex = /^>+(?=\s{0,3}\S)/;
  //       // const quoteRegex = /^>+(\s*>+)*/;
  //       // const quoteRegex = /^>+ *(?=[^\s>])/;
  //       const quoteRegex = /^(>+\s*)+/;

  //       if (quoteRegex.test(line)) {
  //         const qTags = line.match(quoteRegex)?.[0].length || 0;
  //         line = `${"<blockquote class='pl-8 mb-6 text-3xl italic leading-6 border-l-4 border-l-gray-500 text-[#324d67]'>".repeat(
  //           qTags
  //         )}<p class='py-3'>${line.replace(
  //           quoteRegex,
  //           ''
  //         )}</p>${'</blockquote>'.repeat(qTags)}`;
  //       }

  //       // ![alt text](path/image.jpg)

  //       // [link](google.com)

  //       // 3 space: code & pre

  //       return line;
  //     })
  //     .join('\n');

  //   setOutText(out);
  // };

  return (
    <main className="min-h-screen p-16 grid md:grid-rows-2 lg:grid-rows-none lg:grid-cols-2 gap-20">
      <textarea
        className="bg-cocktailsMain rounded-md shadow-lg px-8 py-4 text-xl"
        value={inText}
        onChange={(e) => setInText(e.target.value)}
        autoFocus
      ></textarea>
      <article className="px-8 py-4">
        <ReactMarkdown>{inText}</ReactMarkdown>
      </article>
    </main>
  );
};

export default MarkdownPreview;
