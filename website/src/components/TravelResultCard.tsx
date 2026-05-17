type TravelResultCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  price: string;
};

export default function TravelResultCard({
  eyebrow,
  title,
  description,
  meta,
  price,
}: TravelResultCardProps) {
  return (
    <article className="card p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 dark:bg-sky-950 dark:text-sky-200">
            {eyebrow}
          </p>
          <h3 className="mt-3 text-sm font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-xs text-muted">{description}</p>
          <p className="mt-3 text-xs font-medium text-muted">{meta}</p>
        </div>
        <p className="shrink-0 text-lg font-bold text-blue-700 dark:text-blue-300">
          {price}
        </p>
      </div>
    </article>
  );
}
