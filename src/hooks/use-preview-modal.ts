import { create } from 'zustand'

type Product = {
  id: string,
  category: Category,
  name: string,
  price: string,
  isFeatured: boolean,
  size: Size,
  color: Color,
  Image: Image[],
}

type PreviewModalStore = {
  isOpen: boolean,
  data?: Product,
  onOpen: (data: Product) => void,
  onClose: () => void
}

export const usePreviewModal = create<PreviewModalStore>(set => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Product) => set({ data: data, isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
