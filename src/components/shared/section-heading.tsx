import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-10 sm:mb-12", className)}>
      <h2 className="font-handwritten text-3xl sm:text-4xl lg:text-5xl text-walnut">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-walnut-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
