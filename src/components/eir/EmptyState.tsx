import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  titleAs?: "p" | "h1" | "h2";
  children?: ReactNode;
};

export default function EmptyState({ title, description, titleAs = "p", children }: EmptyStateProps) {
  const Title = titleAs;
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white/70 px-6 py-12 text-center">
      <Title className="text-lg font-semibold text-ink">{title}</Title>
      {description ? <p className="mx-auto mt-2 max-w-md text-[15px] text-muted">{description}</p> : null}
      {children ? <div className="mt-6 flex justify-center">{children}</div> : null}
    </div>
  );
}
