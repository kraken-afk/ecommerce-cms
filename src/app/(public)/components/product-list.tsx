import { NoResult } from '@/app/(public)/components/ui/no-result'
import { ProductCard } from '@/app/(public)/components/ui/product-card'

type ProductListProps = {
  title: string,
  items: Product[]
}

export function ProductList(props: ProductListProps) {
  return (
    <div className="space-y-4">
      <h3 className='font-bold text-3xl'>{props.title}</h3>
      {props.items.length === 0 && <NoResult />}
      <div className="grid grid-cols-1 sm:grid-color md:grid-cols-3 lg:grid-cols-4 gap-4">
        {props.items.map(item => (
          <ProductCard
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  )
}