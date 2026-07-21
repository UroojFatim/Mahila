import React from "react";

const posts = [
  {
    date: "14 Nov 2026",
    title: "How to build a considered autumn capsule",
    excerpt:
      "Fewer pieces, worn more often — our edit on dressing with intention this season.",
    tint: "bg-tint-1",
  },
  {
    date: "8 Nov 2026",
    title: "The story behind our linen",
    excerpt:
      "From flax field to finished garment — a look at where our fabric comes from.",
    tint: "bg-tint-2",
  },
  {
    date: "2 Nov 2026",
    title: "Styling the wrap dress, four ways",
    excerpt: "One silhouette, four occasions. Notes from our design studio.",
    tint: "bg-tint-3",
  },
];

const Journal = () => {
  return (
    <section
      id="journal"
      className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-16 lg:py-[90px] scroll-mt-24"
    >
      <div className="text-center mb-12">
        <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-2.5">
          From the Journal
        </div>
        <h2 className="font-serif text-2xl lg:text-[32px] text-ink">
          Notes on Style &amp; Craft
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {posts.map((post) => (
          <a href="#journal" key={post.title} className="block group">
            <div
              className={`aspect-[4/3] ${post.tint} mb-4.5 flex items-center justify-center`}
            >
              <span className="font-script text-2xl text-black/25">
                Mahila
              </span>
            </div>
            <div className="text-[11px] tracking-[0.06em] uppercase text-ink/50 mb-2">
              {post.date}
            </div>
            <div className="font-serif text-lg text-ink mb-2 leading-snug">
              {post.title}
            </div>
            <div className="text-[13px] text-ink/60 leading-relaxed">
              {post.excerpt}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Journal;
