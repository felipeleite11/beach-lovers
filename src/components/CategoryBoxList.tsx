import { cn } from "@/lib/utils"

interface CategoryBoxList {
    categories: Category[]
    highlighted_categories: Category[]
}

export function CategoryBoxList({ categories, highlighted_categories }: CategoryBoxList) {
    return (
        <div className="flex flex-col lg:flex-row text-sm">
            {categories.map((category, idx) => {
                const isFirst = idx === 0
                const isLast = idx === categories.length - 1
                const isHighlighted = highlighted_categories.some(categ => categ.id === category.id)

                return (
                    <div
                        key={category.id}
                        className={cn('border border-slate-400 py-2 px-3',
                            `animate__animated animate__zoomIn animate__fast delay-${idx * 200}`, {
                            'rounded-t-md lg:rounded-r-none lg:rounded-l-md': isFirst,
                            'rounded-b-md lg:rounded-l-none lg:rounded-r-md': isLast,
                            'opacity-100 dark:opacity-100 ring-2 border-0 ring-emerald-500': isHighlighted,
                            'cursor-not-allowed opacity-30 dark:opacity-40': !isHighlighted
                        })}
                    >
                        {category.name}
                    </div>
                )
            })}
        </div>
    )
}